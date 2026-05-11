# User Email Notifications - Implementation Guide

**Date:** 2026-05-11  
**Status:** Documentation (Pre-Implementation)  
**Feature:** Kafka-based user confirmation emails after emergency creation

## Overview

Extend existing Kafka email notification system to send confirmation emails to users (patients) after emergency creation. Separate topic from hospital alerts, parallel consumer flow, shared service layer.

---

## Architecture

### Data Flow

```
User submits emergency request
  ↓ (POST /api/v1/emergency with userEmail, patientName)
EmergencyService.createEmergency()
  ↓
Save to database
  ↓ (try-catch, non-blocking)
Publish hospital alert to: healthcare.notification.email
Publish user confirmation to: healthcare.notification.user-email
  ↓
Two parallel Kafka topics
  ├─ Topic A: healthcare.notification.email
  │  └─ Consumer: EmailNotificationConsumer (existing)
  │     └─ Sends to hospital.email
  │
  └─ Topic B: healthcare.notification.user-email (NEW)
     └─ Consumer: UserEmailNotificationConsumer (NEW)
        └─ Sends to user.email
```

### Components to Create/Modify

| Component | Action | Purpose |
|-----------|--------|---------|
| `CreateEmergencyRequest.java` | Modify | Add `userEmail`, `patientName` fields |
| `UserEmailNotificationEvent.java` | Create | Event model for user emails |
| `UserEmailNotificationConsumer.java` | Create | Consumer for user email topic |
| `NotificationPublisher.java` | Modify | Add `publishUserEmailNotification()` method |
| `EmergencyService.java` | Modify | Call publisher after emergency save |
| `application.properties` | Modify | Add user email consumer group |
| `API_INDEX.md` | Update | Document API request/response changes |
| `KAFKA_EMAIL_FLOW.md` | Update | Add user email flow section |

---

## DTO Changes

### CreateEmergencyRequest (Modify)

**Add two fields:**
```java
@Email(message = "User email must be valid")
@NotBlank(message = "User email is required")
private String userEmail;

@Size(max = 255, message = "Patient name must not exceed 255 characters")
private String patientName;
```

**Updated constructor/builder:** Include new fields.

**Example request:**
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

---

## Event Models

### UserEmailNotificationEvent (Create)

**Fields:**
- `eventId` (String, UUID) – Unique identifier
- `recipientEmail` (String) – Patient email
- `recipientName` (String) – Patient name
- `emergencyId` (Long) – Reference to emergency
- `emergencyType` (String) – Type of emergency (for content personalization)
- `hospitalName` (String) – Name of hospital
- `hospitalPhone` (String) – Hospital contact number
- `hospitalAddress` (String) – Hospital location
- `subject` (String) – Email subject
- `templateName` (String) – Template name (e.g., "user_confirmation")
- `body` (String) – Email body with first-aid guidance + hospital details
- `timestamp` (Long) – Event creation time (milliseconds)
- `retryCount` (int) – Retry attempt number (0-3)
- `status` (String) – Event status (PENDING, SENT, RETRY_PENDING, FAILED)

**Example payload:**
```json
{
  "eventId": "uuid-1234-5678",
  "recipientEmail": "patient@example.com",
  "recipientName": "John Doe",
  "emergencyId": 123,
  "emergencyType": "CARDIAC_ARREST",
  "hospitalName": "Apollo Hospital",
  "hospitalPhone": "+91-11-123456",
  "hospitalAddress": "Delhi, India",
  "subject": "Your Emergency Request Confirmed",
  "templateName": "user_confirmation",
  "body": "Your emergency request has been confirmed and sent to Apollo Hospital.\n\nHospital Contact: +91-11-123456\nAddress: Delhi, India\n\nFirst Aid Guidance:\n- For cardiac arrest: Call 911 or local ambulance\n- Perform CPR if trained\n- Keep patient warm and calm\n\nNext Steps:\n1. An ambulance will be dispatched shortly\n2. Keep your phone nearby for hospital contact\n3. Follow these first aid instructions while waiting",
  "timestamp": 1684171200000,
  "retryCount": 0,
  "status": "PENDING"
}
```

---

## Kafka Topic Configuration

| Parameter | Value |
|-----------|-------|
| Topic Name | `healthcare.notification.user-email` |
| Consumer Group | `healthcare-user-email-group` |
| Bootstrap Server | `localhost:9092` |
| Partitions | 1 (same as hospital topic) |
| Auto-create | Yes (on first message) |
| Message Key | `eventId` (UUID) |

---

## Publisher Flow

### NotificationPublisher.publishUserEmailNotification() (NEW METHOD)

**Signature:**
```java
public void publishUserEmailNotification(
  String recipientEmail,
  String patientName,
  Long emergencyId,
  String emergencyType,
  String hospitalName,
  String hospitalPhone,
  String hospitalAddress,
  String subject,
  String templateName,
  String body
)
```

**Steps:**
1. Generate `eventId` = `UUID.randomUUID().toString()`
2. Set `timestamp` = `System.currentTimeMillis()`
3. Set `status` = `"PENDING"`
4. Set `retryCount` = `0`
5. Create `UserEmailNotificationEvent` with all fields
6. Publish to Kafka topic `healthcare.notification.user-email` with `eventId` as key
7. Log: `"Publishing user email notification: eventId={}, recipient={}, emergency={}"`
8. On success: Log success message
9. On failure: Log error (non-blocking, exception caught by caller)

---

## Consumer Flow

### UserEmailNotificationConsumer (CREATE)

**Configuration:**
```java
@Service
public class UserEmailNotificationConsumer {
  @KafkaListener(
    topics = "healthcare.notification.user-email",
    groupId = "healthcare-user-email-group",
    containerFactory = "kafkaListenerContainerFactory"
  )
  public void consumeUserEmailNotification(
    @Payload UserEmailNotificationEvent event,
    Acknowledgment acknowledgment
  )
}
```

**Steps:**
1. Receive `UserEmailNotificationEvent` from Kafka
2. Log: `"Received user email notification: eventId={}, recipient={}, emergency={}"`
3. Call `emailService.sendNotification(event)`
4. Check event status:
   - If `RETRY_PENDING`: Republish to same topic with incremented `retryCount`
   - If `SENT` or `FAILED`: Acknowledge and log
5. Manual acknowledgment via `acknowledgment.acknowledge()`

**Error handling:**
- Wrap in try-catch
- Log errors with eventId for debugging
- Don't fail consumer on individual message errors

---

## Service Layer

### EmailService (REUSE EXISTING)

No changes needed. `EmailService.sendNotification()` already handles both event types:
- Accepts `EmailNotificationEvent` base type
- Works with both hospital and user events
- Returns same status flow (SENT, RETRY_PENDING, FAILED)
- Max retries: 3
- Validation, provider call, retry logic unchanged

---

## Integration with EmergencyService

### createEmergency() modifications

**After emergency is persisted to database, add:**

```java
// User confirmation email (if userEmail provided)
if (request.getUserEmail() != null && !request.getUserEmail().isEmpty()) {
  try {
    String patientName = request.getPatientName() != null 
      ? request.getPatientName() 
      : "Patient";
    
    String userEmailBody = buildUserConfirmationEmail(
      patientName,
      request.getEmergencyType(),
      hospital,
      saved.getId()
    );
    
    notificationPublisher.publishUserEmailNotification(
      request.getUserEmail(),
      patientName,
      saved.getId(),
      request.getEmergencyType(),
      hospital.getName(),
      hospital.getPhone(),
      hospital.getAddress(),
      "Your Emergency Request Confirmed",
      "user_confirmation",
      userEmailBody
    );
    log.info("User email notification published: emergencyId={}, recipient={}", 
      saved.getId(), request.getUserEmail());
  } catch (Exception e) {
    log.error("Failed to publish user email notification: emergencyId={}", 
      saved.getId(), e);
    // Don't fail emergency creation
  }
}
```

**buildUserConfirmationEmail() helper:**
```java
private String buildUserConfirmationEmail(
  String patientName,
  String emergencyType,
  Hospital hospital,
  Long emergencyId
) {
  String firstAidGuidance = getFirstAidGuidance(emergencyType);
  
  return "Dear " + patientName + ",\n\n" +
    "Your emergency request has been confirmed and sent to " + hospital.getName() + ".\n\n" +
    "Emergency Details:\n" +
    "- Type: " + emergencyType + "\n" +
    "- Request ID: ER-" + emergencyId + "\n" +
    "- Timestamp: " + LocalDateTime.now() + "\n\n" +
    "Hospital Contact Information:\n" +
    "- Name: " + hospital.getName() + "\n" +
    "- Phone: " + hospital.getPhone() + "\n" +
    "- Address: " + hospital.getAddress() + "\n\n" +
    "First Aid Guidance:\n" + firstAidGuidance + "\n\n" +
    "Next Steps:\n" +
    "1. An ambulance will be dispatched shortly\n" +
    "2. Keep your phone nearby for hospital contact\n" +
    "3. Follow the first aid guidance while waiting\n" +
    "4. Stay calm and remember help is on the way";
}

private String getFirstAidGuidance(String emergencyType) {
  switch(emergencyType.toUpperCase()) {
    case "CARDIAC_ARREST":
      return "- Check for responsiveness\n" +
        "- Call emergency services immediately\n" +
        "- Perform CPR if trained (30 chest compressions, 2 rescue breaths)\n" +
        "- Use AED if available";
    case "SEVERE_BLEEDING":
      return "- Apply direct pressure with clean cloth\n" +
        "- Elevate the injured area above heart if possible\n" +
        "- Apply tourniquet above wound if bleeding won't stop\n" +
        "- Keep patient warm and calm";
    default:
      return "- Keep patient calm and comfortable\n" +
        "- Follow local emergency protocols\n" +
        "- Provide detailed information to ambulance crew";
  }
}
```

---

## API Changes

### POST /api/v1/emergency Request (Updated)

**New fields added:**
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

**Validation:**
- `userEmail`: @Email, @NotBlank (required)
- `patientName`: @Size(max=255) (optional, defaults to "Patient" if not provided)

**Backward compatibility:** Existing requests without email/name still work (userEmail required in new version)

### Response (Unchanged)

Hospital email flow is already working. Response format stays same.

---

## Configuration

### application.properties (Modify)

**Add:**
```properties
# User Email Notification Consumer Group
spring.kafka.consumer.group-id=healthcare-user-email-group
```

**Existing (already present):**
```properties
spring.kafka.bootstrap-servers=localhost:9092
app.email.enabled=false
```

---

## Retry & Failure Handling

### Status Transitions

| Attempt | Event Retry Count | Status on Failure | Action |
|---------|------------------|------------------|--------|
| 1st | 0 | RETRY_PENDING | Republish with retryCount=1 |
| 2nd | 1 | RETRY_PENDING | Republish with retryCount=2 |
| 3rd | 2 | RETRY_PENDING | Republish with retryCount=3 |
| 4th | 3 | FAILED | Acknowledge, log final failure |

**Max retries:** 3 (same as hospital flow)  
**Backoff:** Simple requeue (no exponential backoff in MVP)  
**DLQ:** Not implemented (future enhancement)

---

## Testing Strategy

### Local Testing Flow

**Prerequisites:**
- Kafka running on `localhost:9092`
- Backend running on `localhost:8080`
- H2 database initialized

**Manual test:**
```bash
# 1. Start backend
mvn spring-boot:run

# 2. Create emergency with user email
curl -X POST http://localhost:8080/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "hospitalId": 1,
    "latitude": 28.7041,
    "longitude": 77.1025,
    "emergencyType": "CARDIAC_ARREST",
    "userPhone": "+91-9876543210",
    "userEmail": "test@example.com",
    "patientName": "Test Patient"
  }'

# 3. Monitor logs for:
# - "Publishing user email notification to Kafka"
# - "Received user email notification"
# - "[MOCK] Email would be sent to test@example.com" (in dev mode)
```

### Integration Tests

**Test cases:**
1. Emergency with userEmail triggers user notification publish
2. UserEmailNotificationConsumer receives event from Kafka
3. EmailService processes event and sends email (mock provider)
4. Retry logic: 3 failures → republish with incremented retryCount
5. Max retries reached (4th failure) → mark FAILED, acknowledge
6. Emergency without userEmail: hospital email sent, user email skipped
7. Email publish failure (Kafka error): logged, doesn't fail emergency creation

**Mock Kafka:** Use `EmbeddedKafka` in test configuration

---

## Log Patterns

**Expected log output for successful flow:**

```
[EmergencyService] Creating emergency request for hospital ID: 1
[EmergencyService] Emergency request created: 123 for hospital: 1
[NotificationPublisher] Publishing hospital email notification to Kafka: eventId=xxx-yyy
[NotificationPublisher] Publishing user email notification to Kafka: eventId=aaa-bbb
[NotificationPublisher] Email notifications published successfully

[UserEmailNotificationConsumer] Received user email notification: eventId=aaa-bbb, recipient=test@example.com
[EmailService] Processing email notification: eventId=aaa-bbb, recipient=test@example.com, retryCount=0
[SmtpEmailProvider] [MOCK] Email would be sent to test@example.com | Name: Test Patient | Subject: Your Emergency Request Confirmed
[UserEmailNotificationConsumer] Email notification processed and acknowledged: eventId=aaa-bbb, status=SENT
```

---

## Files to Modify/Create

| File | Action | Changes |
|------|--------|---------|
| `CreateEmergencyRequest.java` | Modify | Add userEmail (@Email, @NotBlank), patientName (@Size) + builder/getters/setters |
| `UserEmailNotificationEvent.java` | Create | New event class with all fields (eventId, recipientEmail, emergencyId, hospitalName, etc.) |
| `UserEmailNotificationConsumer.java` | Create | @KafkaListener consumer class (parallel to EmailNotificationConsumer) |
| `NotificationPublisher.java` | Modify | Add publishUserEmailNotification() method |
| `EmergencyService.java` | Modify | Call publishUserEmailNotification() after emergency save |
| `application.properties` | Modify | Add spring.kafka.consumer.group-id=healthcare-user-email-group |
| `API_INDEX.md` | Update | Document new request/response fields and user email topic |

---

## Rollback Plan

If issues arise:
1. Remove userEmail/patientName from CreateEmergencyRequest DTO (API reverts)
2. Disable UserEmailNotificationConsumer (remove @Service or @KafkaListener)
3. Remove publishUserEmailNotification() call from EmergencyService
4. Hospital email flow unaffected (separate topic, existing consumer)

---

## Success Criteria

✅ User receives confirmation email with hospital details  
✅ Email contains first-aid guidance specific to emergency type  
✅ Retry mechanism works (3 attempts on failure)  
✅ Hospital email flow unaffected  
✅ New topic `healthcare.notification.user-email` receives events  
✅ Logs show complete flow: publish → consume → send  
✅ Mock provider shows email would be sent (dev mode)  
✅ Backward compatible (emergencies without email still work)

---

## Implementation Order

1. ✅ **Documentation** (This file)
2. **Code Phase:**
   - Create `UserEmailNotificationEvent.java`
   - Modify `CreateEmergencyRequest.java`
   - Create `UserEmailNotificationConsumer.java`
   - Modify `NotificationPublisher.java`
   - Modify `EmergencyService.java` (add publishUserEmailNotification call + buildUserConfirmationEmail)
   - Modify `application.properties`
   - Update `API_INDEX.md`
3. **Testing:**
   - Start Kafka + backend
   - Create emergency with userEmail
   - Verify logs show complete flow
   - Inspect both Kafka topics
   - Test retry logic (mock failure scenarios)

---

