# Kafka-Based Email Notification Flow

## Overview

Email notifications are published to a Kafka topic and consumed by a dedicated email service worker. This decouples email sending from the main request-response cycle.

## Architecture

```
┌─────────────────┐
│  Orchestrator   │ (NotificationPublisher)
│  - Emergency    │
│  - User Action  │
└────────┬────────┘
         │
         ▼
    ┌─────────────────────────────────────┐
    │ Kafka Topic: healthcare.notification.email
    │ (JSON serialized EmailNotificationEvent)
    └────────────────────┬────────────────┘
                         │
                         ▼
    ┌─────────────────────────────────────┐
    │ EmailNotificationConsumer            │
    │ - Listens on topic                  │
    │ - Calls EmailService                │
    │ - Handles retries                   │
    └────────────┬────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────┐
    │ EmailService                        │
    │ - Validates & enriches event       │
    │ - Calls EmailProvider              │
    │ - Tracks retry count               │
    └────────────┬────────────────────────┘
                 │
                 ▼
    ┌─────────────────────────────────────┐
    │ EmailProvider (SmtpEmailProvider)   │
    │ - Sends via SMTP (or mock in dev)   │
    │ - Returns success/failure           │
    └─────────────────────────────────────┘
```

## Topic Configuration

**Topic Name:** `healthcare.notification.email`
**Consumer Group:** `healthcare-email-group`
**Partitions:** 1 (configurable)
**Bootstrap Servers:** `localhost:9092`

## Event Model

```json
{
  "eventId": "uuid-string",
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

### Event Fields

| Field | Type | Description |
|-------|------|-------------|
| `eventId` | String (UUID) | Unique identifier for the notification |
| `recipientEmail` | String | Email address of recipient |
| `recipientName` | String | Display name of recipient |
| `subject` | String | Email subject line |
| `templateName` | String | Template used (e.g., "emergency_alert") |
| `body` | String | Email body content |
| `timestamp` | Long | Event creation time (ms) |
| `retryCount` | Integer | Current retry attempt |
| `status` | String | Event status (PENDING, SENT, RETRY_PENDING, FAILED) |

## Producer Flow

### NotificationPublisher

1. **Create event** with UUID and metadata
2. **Send to Kafka** topic with event ID as key
3. **Log** publish result

```java
notificationPublisher.publishEmailNotification(
  "hospital@example.com",
  "Hospital Name",
  "URGENT: Emergency Alert",
  "emergency_alert",
  "Detailed email body..."
);
```

## Consumer Flow

### EmailNotificationConsumer

1. **Receive** from Kafka topic
2. **Parse** JSON into EmailNotificationEvent
3. **Call** EmailService to process
4. **Handle retries** if needed
5. **Acknowledge** message (manual mode)

## Service Layer

### EmailService

- Validates event fields
- Calls email provider
- Increments retry count on failure
- Updates event status
- Max retries: 3

### EmailProvider (Interface)

Implementations:
- **SmtpEmailProvider** - Sends via SMTP or logs in dev mode

## Retry Mechanism

- **Max Retries:** 3
- **Backoff:** Simple requeue to Kafka
- **Republish:** Event sent back to topic with incremented retry count
- **Final Status:** FAILED after 3 retries

### Retry Flow

```
1st Attempt (retryCount=0)
    ├─ Success → Status: SENT, Acknowledge
    └─ Failure → Status: RETRY_PENDING, Republish (retryCount=1)

2nd Attempt (retryCount=1)
    ├─ Success → Status: SENT, Acknowledge
    └─ Failure → Status: RETRY_PENDING, Republish (retryCount=2)

3rd Attempt (retryCount=2)
    ├─ Success → Status: SENT, Acknowledge
    └─ Failure → Status: RETRY_PENDING, Republish (retryCount=3)

4th Attempt (retryCount=3)
    ├─ Success → Status: SENT, Acknowledge
    └─ Failure → Status: FAILED, Acknowledge (MAX RETRIES REACHED)
```

## Local Testing

### Prerequisites

1. **Kafka** running on `localhost:9092`
2. **Backend** running on `localhost:8080`
3. **Database** initialized (H2)

### Option 1: Using Docker Compose (Kafka)

```bash
docker-compose up kafka zookeeper
```

### Option 2: Start Kafka Locally (if installed)

```bash
# Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties &

# Start Kafka
bin/kafka-server-start.sh config/server.properties &
```

### Test Flow

1. **Start backend:**
   ```bash
   mvn spring-boot:run
   ```

2. **Create emergency (triggers email notification):**
   ```bash
   curl -X POST http://localhost:8080/api/v1/emergency \
     -H "Content-Type: application/json" \
     -d '{
       "hospitalId": 1,
       "latitude": 28.7041,
       "longitude": 77.1025,
       "emergencyType": "CARDIAC_ARREST",
       "userPhone": "+91-9876543210"
     }'
   ```

3. **Monitor logs:**
   - Look for "Publishing email notification to Kafka"
   - Look for "Received email notification" (consumer)
   - Look for "[MOCK] Email would be sent to..." (in dev mode)

4. **Kafka Consumer CLI (optional debug):**
   ```bash
   bin/kafka-console-consumer.sh \
     --bootstrap-server localhost:9092 \
     --topic healthcare.notification.email \
     --from-beginning
   ```

### Expected Log Output

```
[Producer] Publishing email notification to Kafka: eventId=xxx-yyy, recipient=hospital@example.com
[Producer] Email notification published successfully: eventId=xxx-yyy

[Consumer] Received email notification: eventId=xxx-yyy, recipient=hospital@example.com
[EmailService] Processing email notification: eventId=xxx-yyy, recipient=..., retryCount=0
[SmtpEmailProvider] [MOCK] Email would be sent to hospital@example.com | Name: Hospital Name | Subject: ...
[Consumer] Email notification processed and acknowledged: eventId=xxx-yyy, status=SENT
```

## Configuration

### application.properties

```properties
# Kafka
spring.kafka.bootstrap-servers=localhost:9092

# Email (mock mode)
app.email.enabled=false

# Spring Mail (optional, for real SMTP)
spring.mail.from=noreply@healthcare.com
spring.mail.host=smtp.example.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
```

## Integration Points

### Where Email Notifications Are Published

1. **EmergencyService.createEmergency()** - Sends alert to hospital
2. *Future:* User confirmations, appointment reminders, status updates

### How to Add to Other Services

```java
@Service
public class MyService {
  @Autowired private NotificationPublisher publisher;
  
  public void doSomething() {
    // ... business logic ...
    
    publisher.publishEmailNotification(
      recipientEmail,
      recipientName,
      subject,
      templateName,
      body
    );
  }
}
```

## Error Handling

| Scenario | Handling |
|----------|----------|
| Email provider failure | Retry up to 3 times |
| Kafka publish failure | Log error, event lost (should add DLQ in prod) |
| Consumer crash | Kafka rebalances, same message reprocessed |
| Invalid event data | Log error, mark as FAILED |

## Monitoring & Observability

### Key Metrics to Track

- Messages published per second
- Messages consumed per second
- Failed messages
- Retry count distribution
- End-to-end latency

### Log Patterns

- Producer: `"Publishing email notification to Kafka"`
- Consumer: `"Received email notification"`
- Success: `"Email notification processed and acknowledged"`
- Retry: `"Republishing notification for retry"`
- Failure: `"Email notification failed after 3 retries"`

## Future Enhancements

1. **Dead Letter Queue (DLQ)** for failed events
2. **Template Engine** for email body formatting
3. **Priority Queues** for urgent notifications
4. **Scheduled Notifications** (send at specific time)
5. **Email Tracking** (open rates, click tracking)
6. **Multi-provider** support (SendGrid, Mailgun, AWS SES)
7. **SMS Notifications** (parallel to email)
8. **Webhook Callbacks** for async processing

## Code References

- **Event:** `com.healthcare.event.EmailNotificationEvent`
- **Service:** `com.healthcare.service.email.EmailService`
- **Provider:** `com.healthcare.service.email.EmailProvider`
- **Consumer:** `com.healthcare.service.EmailNotificationConsumer`
- **Publisher:** `com.healthcare.service.NotificationPublisher`
- **Config:** `com.healthcare.config.KafkaConfig`
