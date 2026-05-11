# User Email Notifications Design

**Date:** 2026-05-11  
**Status:** Design Approved  
**Scope:** Extend Kafka email notification system to send user confirmations

## Problem Statement

Current system sends emergency alerts to hospitals only. Need to send confirmation emails to patients with:
- Emergency confirmation + timestamp
- Hospital details (name, phone, address, directions)
- Patient instructions + first-aid guidance
- Next steps

## Architecture

**Two Parallel Flows:**

1. **Hospital Alerts** (existing)
   - Topic: `healthcare.notification.email`
   - Consumer: `EmailNotificationConsumer`
   - Recipient: Hospital contact email

2. **User Confirmations** (new)
   - Topic: `healthcare.notification.user-email`
   - Consumer: `UserEmailNotificationConsumer`
   - Recipient: Patient email

Both flows:
- Share `EmailService` for business logic
- Share `SmtpEmailProvider` for sending
- Use same retry mechanism (3 retries max)
- Triggered from `EmergencyService.createEmergency()`
- Independent topic allows separate scaling/monitoring

## Event Models

### Hospital Event (Existing)
```json
{
  "eventId": "uuid",
  "recipientEmail": "hospital@example.com",
  "recipientName": "Apollo Hospital",
  "subject": "URGENT: Emergency Alert - CARDIAC_ARREST",
  "templateName": "emergency_alert",
  "body": "An emergency request has been received...",
  "timestamp": 1684171200000,
  "retryCount": 0,
  "status": "PENDING"
}
```

### User Event (New)
```json
{
  "eventId": "uuid",
  "recipientEmail": "user@example.com",
  "recipientName": "Patient Name",
  "emergencyId": 123,
  "emergencyType": "CARDIAC_ARREST",
  "hospitalName": "Apollo Hospital",
  "hospitalPhone": "+91-11-123456",
  "hospitalAddress": "Delhi, India",
  "subject": "Your Emergency Request Confirmed",
  "templateName": "user_confirmation",
  "body": "Your emergency request has been confirmed and sent to Apollo Hospital.\n\nHospital Contact: +91-11-123456\nAddress: Delhi, India\n\nFirst Aid Guidance:\n[instructions based on emergency type]\n\nNext Steps:\n1. An ambulance will be dispatched shortly\n2. Keep phone nearby for hospital contact\n3. Follow first aid instructions while waiting",
  "timestamp": 1684171200000,
  "retryCount": 0,
  "status": "PENDING"
}
```

**User event includes additional fields:**
- `emergencyId` - Reference to emergency request
- `emergencyType` - For content personalization
- `hospitalName`, `hospitalPhone`, `hospitalAddress` - Hospital details

## Publisher Flow

**NotificationPublisher (Enhanced)**

Existing method (unchanged):
```java
publishEmailNotification(String recipientEmail, String recipientName,
                        String subject, String templateName, String body)
```

New method:
```java
publishUserEmailNotification(String recipientEmail, String patientName,
                            Long emergencyId, String emergencyType,
                            String hospitalName, String hospitalPhone,
                            String hospitalAddress,
                            String subject, String templateName, String body)
```

Both methods:
- Generate UUID eventId
- Set timestamp = System.currentTimeMillis()
- Set status = "PENDING"
- Set retryCount = 0
- Send to respective Kafka topic with eventId as key
- Log publish success/failure

**Called from EmergencyService.createEmergency():**
```java
// After emergency persisted to DB

// 1. Hospital alert
notificationPublisher.publishEmailNotification(
  hospitalEmail, hospital.getName(),
  "URGENT: Emergency Alert - " + emergencyType,
  "emergency_alert",
  hospitalAlertBody
);

// 2. User confirmation
notificationPublisher.publishUserEmailNotification(
  userEmail, patientName,
  emergencyId, emergencyType,
  hospital.getName(), hospital.getPhone(), hospital.getAddress(),
  "Your Emergency Request Confirmed",
  "user_confirmation",
  userConfirmationBody
);
```

Both wrapped in try-catch. Failure does not fail emergency creation.

## Consumer Flows

### EmailNotificationConsumer (Existing)
- Topic: `healthcare.notification.email`
- Group: `healthcare-email-group`
- Listens for hospital alerts
- Parses `EmailNotificationEvent` JSON
- Calls `EmailService.sendNotification(event)`
- If status = RETRY_PENDING, republishes with incremented retryCount
- Manual acknowledgment on completion

### UserEmailNotificationConsumer (New)
- Topic: `healthcare.notification.user-email`
- Group: `healthcare-user-email-group`
- Listens for user confirmations
- Parses `UserEmailNotificationEvent` JSON
- Calls `EmailService.sendNotification(event)`
- If status = RETRY_PENDING, republishes with incremented retryCount
- Manual acknowledgment on completion

**Both consumers follow identical flow:**
1. Receive event from Kafka
2. Validate event fields
3. Call EmailService.sendNotification()
4. EmailService determines retry vs success vs final failure
5. If RETRY_PENDING (failure + retries remaining), republish to topic
6. If SENT or FAILED (success or max retries), acknowledge

## Service Layer

**EmailService (Shared)**

Existing implementation handles both event types:
```java
public void sendNotification(EmailNotificationEvent event) {
  try {
    // Validate event
    validateEventFields(event);
    
    // Call provider
    boolean success = emailProvider.sendEmail(
      event.getRecipientEmail(),
      event.getRecipientName(),
      event.getSubject(),
      event.getBody()
    );
    
    if (success) {
      event.setStatus("SENT");
    } else if (event.getRetryCount() < MAX_RETRIES) {
      event.setRetryCount(event.getRetryCount() + 1);
      event.setStatus("RETRY_PENDING");
    } else {
      event.setStatus("FAILED");
    }
  } catch (Exception e) {
    // Log error
    // Retry logic
  }
}
```

Works for both `EmailNotificationEvent` and `UserEmailNotificationEvent` (same base structure).

## Data Model Changes

### CreateEmergencyRequest (DTO)
Add two new fields:
```java
@Email(message = "User email must be valid")
@NotBlank(message = "User email is required")
private String userEmail;

@Size(max = 255)
private String patientName; // Optional, defaults to "Patient"
```

### No Entity Changes
- Emergency request entity unchanged
- User email not persisted (sent immediately via Kafka)
- Email delivery tracked in logs only (future: add email_audit table)

## Retry & Error Handling

**Identical to hospital flow:**

| Attempt | Status on Failure | Action |
|---------|------------------|--------|
| 1st (retryCount=0) | RETRY_PENDING | Republish with retryCount=1 |
| 2nd (retryCount=1) | RETRY_PENDING | Republish with retryCount=2 |
| 3rd (retryCount=2) | RETRY_PENDING | Republish with retryCount=3 |
| 4th (retryCount=3) | FAILED | Acknowledge, log final failure |

**Max retries:** 3  
**Backoff:** Simple requeue (no exponential backoff in MVP)  
**DLQ:** Not implemented in MVP (future enhancement)

## MVP Scope

**In Scope:**
- New Kafka topic `healthcare.notification.user-email`
- New consumer `UserEmailNotificationConsumer`
- Modify `CreateEmergencyRequest` to accept userEmail + patientName
- Integrate user email publishing into `EmergencyService.createEmergency()`
- Shared `EmailService` handles both flows
- Basic retry (3 attempts, simple requeue)
- Mock SMTP for dev, real SMTP for prod
- Manual acknowledgment

**Out of Scope (Future):**
- Dead Letter Queue (DLQ)
- Email template engine
- Priority queues
- Email status database tracking
- User email preferences
- SMS fallback
- Email analytics

## Integration Points

### 1. API Contract Change
**POST /api/v1/emergency**

Request body (modified):
```json
{
  "hospitalId": 1,
  "latitude": 28.7041,
  "longitude": 77.1025,
  "emergencyType": "CARDIAC_ARREST",
  "userPhone": "+91-9876543210",
  "userEmail": "patient@example.com",
  "patientName": "John Doe"
}
```

Response unchanged (existing format).

### 2. Kafka Topics

| Topic | Group | Purpose |
|-------|-------|---------|
| `healthcare.notification.email` | `healthcare-email-group` | Hospital alerts (existing) |
| `healthcare.notification.user-email` | `healthcare-user-email-group` | User confirmations (new) |

Bootstrap: `localhost:9092`

### 3. Configuration (application.properties)

```properties
# Existing
spring.kafka.bootstrap-servers=localhost:9092

# New consumer group
spring.kafka.consumer.group-id=healthcare-user-email-group

# Email
app.email.enabled=false
```

## Testing Strategy

### Local Testing
1. Start Kafka (topic auto-created on message publish)
2. Start backend
3. POST to `/api/v1/emergency` with userEmail
4. Monitor logs:
   - Hospital alert published to topic A
   - User confirmation published to topic B
   - Consumer receives user event
   - EmailService processes
   - "[MOCK] Email would be sent to patient@example.com"
5. Kafka CLI inspect both topics

### Integration Test
- Mock Kafka (use EmbeddedKafka)
- Verify both publishers called
- Verify both consumers process events
- Verify retry logic

## Implementation Notes

### Files to Create
- `UserEmailNotificationConsumer.java` - parallel to existing consumer
- `UserEmailNotificationEvent.java` - extends base event model

### Files to Modify
- `CreateEmergencyRequest.java` - add userEmail, patientName
- `EmergencyService.java` - add user email publishing
- `NotificationPublisher.java` - add publishUserEmailNotification() method
- `application.properties` - add user email consumer group
- `API_INDEX.md` - document new request fields

### No Changes Needed
- `EmailService.java` - handles both event types
- `SmtpEmailProvider.java` - reusable
- `KafkaConfig.java` - topics auto-created

## Future Enhancements

1. **Dead Letter Queue (DLQ)** - capture failed events for manual review
2. **Email Template Engine** - render body from Mustache/Velocity templates
3. **Priority Queues** - hospital alerts with higher priority
4. **Email Audit Table** - track all sent/failed/retried emails
5. **User Preferences** - opt-in/opt-out, frequency control
6. **SMS Fallback** - send SMS if email fails 3 times
7. **Email Analytics** - delivery rate, bounce rate, open rate
8. **Scheduled Notifications** - send at specific time (future appointments)

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| User email not validated | @Email annotation in DTO |
| Email publish fails | Wrapped in try-catch, doesn't fail emergency |
| Consumer crash/restart | Kafka rebalance, same message reprocessed |
| Max retries reached | Marked FAILED, logged, manual intervention (future DLQ) |
| Topic doesn't exist | Auto-created on first publish |

## Success Criteria

✅ User receives confirmation email with hospital details  
✅ Email contains first-aid guidance for emergency type  
✅ Retry mechanism works (3 attempts on failure)  
✅ Hospital email flow unaffected  
✅ Independent topics allow separate monitoring  
✅ No database changes (stateless event flow)  
