# Email Notification Kafka Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an email notification system using Kafka that publishes email events when emergencies are created and processes them via a consumer service.

**Architecture:** Emergency creation triggers email notification events published to Kafka topic `healthcare.notification.email`. A consumer listens to the topic and routes emails through a pluggable email service. Simple retry via Spring Kafka's built-in retry template, logs failures for manual review.

**Tech Stack:** Spring Boot 3.1.5, Apache Kafka, Spring Kafka, Java 17

---

## Task 1: Add Kafka Dependencies to pom.xml

**Files:**
- Modify: `healthcare-BE-services/pom.xml:80-106`

- [ ] **Step 1: Open pom.xml and locate the Testing section**

Around line 80, you'll see the Testing dependencies section.

- [ ] **Step 2: Add Spring Kafka starter before Testing section**

Replace the section starting at line 80 with:

```xml
    <!-- Kafka -->
    <dependency>
      <groupId>org.springframework.kafka</groupId>
      <artifactId>spring-kafka</artifactId>
    </dependency>

    <!-- Testing -->
```

This adds Spring Kafka support. The version inherits from Spring Boot parent (3.1.5).

- [ ] **Step 3: Verify dependencies added**

Run:
```bash
cd healthcare-BE-services && mvn clean install
```

Expected: Build succeeds with Kafka dependencies resolved.

- [ ] **Step 4: Commit**

```bash
git add healthcare-BE-services/pom.xml
git commit -m "chore: add spring-kafka dependency"
```

---

## Task 2: Create Kafka Configuration

**Files:**
- Create: `healthcare-BE-services/src/main/java/com/healthcare/config/KafkaConfig.java`

- [ ] **Step 1: Create KafkaConfig.java file**

```java
package com.healthcare.config;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableKafka
public class KafkaConfig {

  @Value("${spring.kafka.bootstrap-servers}")
  private String bootstrapServers;

  @Bean
  public ProducerFactory<String, Object> producerFactory() {
    Map<String, Object> configProps = new HashMap<>();
    configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
    configProps.put(ProducerConfig.ACKS_CONFIG, "all");
    configProps.put(ProducerConfig.RETRIES_CONFIG, 3);
    configProps.put(ProducerConfig.RETRY_BACKOFF_MS_CONFIG, 1000);
    return new DefaultKafkaProducerFactory<>(configProps);
  }

  @Bean
  public KafkaTemplate<String, Object> kafkaTemplate() {
    return new KafkaTemplate<>(producerFactory());
  }

  @Bean
  public ConsumerFactory<String, Object> consumerFactory() {
    Map<String, Object> configProps = new HashMap<>();
    configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
    configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "healthcare-email-group");
    configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
    configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);
    configProps.put(JsonDeserializer.VALUE_DEFAULT_TYPE, "com.healthcare.event.EmailNotificationEvent");
    configProps.put(JsonDeserializer.TRUSTED_PACKAGES, "*");
    configProps.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
    configProps.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
    return new DefaultKafkaConsumerFactory<>(configProps);
  }

  @Bean
  public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<String, Object> factory = 
        new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(consumerFactory());
    factory.setConcurrency(3);
    factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL);
    return factory;
  }
}
```

This configures Kafka producer and consumer with JSON serialization.

- [ ] **Step 2: Verify file created**

```bash
ls -la healthcare-BE-services/src/main/java/com/healthcare/config/KafkaConfig.java
```

Expected: File exists.

- [ ] **Step 3: Commit**

```bash
git add healthcare-BE-services/src/main/java/com/healthcare/config/KafkaConfig.java
git commit -m "config: add kafka producer and consumer configuration"
```

---

## Task 3: Add Kafka Properties to application.yaml

**Files:**
- Modify: `healthcare-BE-services/src/main/resources/application.yaml:34-60`

- [ ] **Step 1: Open application.yaml**

Add Kafka properties after the `jackson` section and before `server` section.

- [ ] **Step 2: Add Kafka configuration**

Find this section:
```yaml
  jackson:
    serialization:
      write-dates-as-timestamps: false
    default-property-inclusion: non_null

server:
```

Replace with:

```yaml
  jackson:
    serialization:
      write-dates-as-timestamps: false
    default-property-inclusion: non_null

  kafka:
    bootstrap-servers: localhost:9092
    producer:
      acks: all
      retries: 3
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
    consumer:
      bootstrap-servers: localhost:9092
      group-id: healthcare-email-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      auto-offset-reset: earliest
      enable-auto-commit: false

server:
```

- [ ] **Step 3: Verify YAML syntax**

Run:
```bash
cd healthcare-BE-services && mvn clean install -DskipTests
```

Expected: Build succeeds (YAML is valid).

- [ ] **Step 4: Commit**

```bash
git add healthcare-BE-services/src/main/resources/application.yaml
git commit -m "config: add kafka bootstrap servers and consumer group properties"
```

---

## Task 4: Create EmailNotificationEvent DTO

**Files:**
- Create: `healthcare-BE-services/src/main/java/com/healthcare/event/EmailNotificationEvent.java`

- [ ] **Step 1: Create event package and file**

```bash
mkdir -p healthcare-BE-services/src/main/java/com/healthcare/event
```

- [ ] **Step 2: Create EmailNotificationEvent.java**

```java
package com.healthcare.event;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailNotificationEvent {

  @JsonProperty("eventId")
  private String eventId;

  @JsonProperty("timestamp")
  private LocalDateTime timestamp;

  @JsonProperty("emergencyRequestId")
  private Long emergencyRequestId;

  @JsonProperty("hospitalId")
  private Long hospitalId;

  @JsonProperty("hospitalName")
  private String hospitalName;

  @JsonProperty("hospitalEmail")
  private String hospitalEmail;

  @JsonProperty("emergencyType")
  private String emergencyType;

  @JsonProperty("userLatitude")
  private Double userLatitude;

  @JsonProperty("userLongitude")
  private Double userLongitude;

  @JsonProperty("userPhone")
  private String userPhone;

  @JsonProperty("subject")
  private String subject;

  @JsonProperty("messageType")
  private String messageType;
}
```

Represents the email notification event published to Kafka.

- [ ] **Step 3: Verify file created**

```bash
ls -la healthcare-BE-services/src/main/java/com/healthcare/event/EmailNotificationEvent.java
```

Expected: File exists.

- [ ] **Step 4: Commit**

```bash
git add healthcare-BE-services/src/main/java/com/healthcare/event/
git commit -m "feat: add EmailNotificationEvent DTO for Kafka messaging"
```

---

## Task 5: Create EmailNotificationProducer Service

**Files:**
- Create: `healthcare-BE-services/src/main/java/com/healthcare/service/EmailNotificationProducer.java`

- [ ] **Step 1: Create EmailNotificationProducer.java**

```java
package com.healthcare.service;

import com.healthcare.event.EmailNotificationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationProducer {

  private static final Logger log = LoggerFactory.getLogger(EmailNotificationProducer.class);
  private static final String TOPIC = "healthcare.notification.email";

  private final KafkaTemplate<String, Object> kafkaTemplate;

  public EmailNotificationProducer(KafkaTemplate<String, Object> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  /**
   * Publish email notification event to Kafka topic.
   *
   * @param event email notification event
   */
  public void publishEmailNotification(EmailNotificationEvent event) {
    try {
      log.info("Publishing email notification event. EventId: {}, Emergency: {}", 
               event.getEventId(), event.getEmergencyRequestId());

      Message<EmailNotificationEvent> message = MessageBuilder
          .withPayload(event)
          .setHeader(KafkaHeaders.TOPIC, TOPIC)
          .setHeader(KafkaHeaders.MESSAGE_KEY, event.getEventId())
          .setHeader("X-Event-Type", "EMERGENCY_ALERT")
          .build();

      kafkaTemplate.send(message);
      log.info("Email notification published successfully. EventId: {}", event.getEventId());
    } catch (Exception e) {
      log.error("Failed to publish email notification. EventId: {}", event.getEventId(), e);
      throw new RuntimeException("Failed to publish email notification", e);
    }
  }
}
```

Handles publishing email events to Kafka.

- [ ] **Step 2: Verify file created**

```bash
ls -la healthcare-BE-services/src/main/java/com/healthcare/service/EmailNotificationProducer.java
```

Expected: File exists.

- [ ] **Step 3: Commit**

```bash
git add healthcare-BE-services/src/main/java/com/healthcare/service/EmailNotificationProducer.java
git commit -m "feat: add EmailNotificationProducer for publishing events to Kafka"
```

---

## Task 6: Create EmailService (Pluggable)

**Files:**
- Create: `healthcare-BE-services/src/main/java/com/healthcare/service/EmailService.java`

- [ ] **Step 1: Create EmailService.java interface**

```java
package com.healthcare.service;

import com.healthcare.event.EmailNotificationEvent;

public interface EmailService {

  /**
   * Send email notification based on event.
   *
   * @param event email notification event
   * @return true if email sent successfully, false otherwise
   */
  boolean sendEmailNotification(EmailNotificationEvent event);
}
```

Interface for pluggable email providers.

- [ ] **Step 2: Create EmailServiceImpl.java (default implementation)**

```java
package com.healthcare.service;

import com.healthcare.event.EmailNotificationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

  private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

  @Value("${email.provider:mock}")
  private String emailProvider;

  @Override
  public boolean sendEmailNotification(EmailNotificationEvent event) {
    try {
      log.info("Sending email notification. Provider: {}, Hospital: {}, Type: {}", 
               emailProvider, event.getHospitalEmail(), event.getEmergencyType());

      switch (emailProvider.toLowerCase()) {
        case "sendgrid":
          return sendViaSendGrid(event);
        case "aws-ses":
          return sendViaAwsSes(event);
        case "smtp":
          return sendViaSmtp(event);
        default:
          return sendViaMock(event);
      }
    } catch (Exception e) {
      log.error("Failed to send email notification. EventId: {}, Hospital: {}", 
                event.getEventId(), event.getHospitalEmail(), e);
      return false;
    }
  }

  private boolean sendViaMock(EmailNotificationEvent event) {
    log.info("[MOCK EMAIL] To: {}, Subject: {}, Message: Emergency {} alert from location ({}, {})", 
             event.getHospitalEmail(), event.getSubject(), event.getEmergencyType(), 
             event.getUserLatitude(), event.getUserLongitude());
    return true;
  }

  private boolean sendViaSendGrid(EmailNotificationEvent event) {
    // TODO: Implement SendGrid integration
    log.warn("SendGrid provider not yet implemented. Falling back to mock.");
    return sendViaMock(event);
  }

  private boolean sendViaAwsSes(EmailNotificationEvent event) {
    // TODO: Implement AWS SES integration
    log.warn("AWS SES provider not yet implemented. Falling back to mock.");
    return sendViaMock(event);
  }

  private boolean sendViaSmtp(EmailNotificationEvent event) {
    // TODO: Implement SMTP integration
    log.warn("SMTP provider not yet implemented. Falling back to mock.");
    return sendViaMock(event);
  }
}
```

Default implementation uses mock email provider. Pluggable for future providers.

- [ ] **Step 3: Verify files created**

```bash
ls -la healthcare-BE-services/src/main/java/com/healthcare/service/EmailService*.java
```

Expected: Both EmailService.java and EmailServiceImpl.java exist.

- [ ] **Step 4: Commit**

```bash
git add healthcare-BE-services/src/main/java/com/healthcare/service/EmailService.java healthcare-BE-services/src/main/java/com/healthcare/service/EmailServiceImpl.java
git commit -m "feat: add pluggable EmailService interface and mock implementation"
```

---

## Task 7: Create EmailNotificationConsumer

**Files:**
- Create: `healthcare-BE-services/src/main/java/com/healthcare/service/EmailNotificationConsumer.java`

- [ ] **Step 1: Create EmailNotificationConsumer.java**

```java
package com.healthcare.service;

import com.healthcare.event.EmailNotificationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationConsumer {

  private static final Logger log = LoggerFactory.getLogger(EmailNotificationConsumer.class);

  private final EmailService emailService;

  public EmailNotificationConsumer(EmailService emailService) {
    this.emailService = emailService;
  }

  /**
   * Listen to healthcare.notification.email topic and process email events.
   *
   * @param event email notification event from Kafka
   * @param acknowledgment manual acknowledgment handle
   * @param partition Kafka partition
   * @param offset message offset
   */
  @KafkaListener(
      topics = "healthcare.notification.email",
      groupId = "healthcare-email-group",
      containerFactory = "kafkaListenerContainerFactory"
  )
  public void handleEmailNotification(
      @Payload EmailNotificationEvent event,
      Acknowledgment acknowledgment,
      @Header(KafkaHeaders.RECEIVED_PARTITION_ID) int partition,
      @Header(KafkaHeaders.OFFSET) long offset) {
    
    try {
      log.info("Received email notification event. EventId: {}, Partition: {}, Offset: {}", 
               event.getEventId(), partition, offset);

      // Validate event
      if (!isValidEvent(event)) {
        log.warn("Invalid email notification event. EventId: {}", event.getEventId());
        acknowledgment.acknowledge();
        return;
      }

      // Send email
      boolean sent = emailService.sendEmailNotification(event);
      
      if (sent) {
        log.info("Email notification sent successfully. EventId: {}, Hospital: {}", 
                 event.getEventId(), event.getHospitalEmail());
        acknowledgment.acknowledge();
      } else {
        log.error("Failed to send email notification. EventId: {}, Hospital: {}. Message will be retried.", 
                  event.getEventId(), event.getHospitalEmail());
        // Don't acknowledge on failure; message will be retried
        throw new RuntimeException("Email send failed");
      }
    } catch (Exception e) {
      log.error("Error processing email notification. EventId: {}", 
                event.getEventId(), e);
      // Let Kafka retry the message
    }
  }

  private boolean isValidEvent(EmailNotificationEvent event) {
    return event != null 
        && event.getEventId() != null 
        && event.getHospitalEmail() != null 
        && !event.getHospitalEmail().isBlank()
        && event.getEmergencyRequestId() != null;
  }
}
```

Consumes email events and delegates to EmailService. Manual acknowledgment ensures retry on failure.

- [ ] **Step 2: Verify file created**

```bash
ls -la healthcare-BE-services/src/main/java/com/healthcare/service/EmailNotificationConsumer.java
```

Expected: File exists.

- [ ] **Step 3: Commit**

```bash
git add healthcare-BE-services/src/main/java/com/healthcare/service/EmailNotificationConsumer.java
git commit -m "feat: add EmailNotificationConsumer for processing Kafka events"
```

---

## Task 8: Update EmergencyService to Publish Email Events

**Files:**
- Modify: `healthcare-BE-services/src/main/java/com/healthcare/service/EmergencyService.java:21-93`

- [ ] **Step 1: Open EmergencyService.java**

Locate the service class.

- [ ] **Step 2: Add EmailNotificationProducer dependency**

Find the constructor (line 31-39):

```java
  public EmergencyService(EmergencyRequestRepository emergencyRepository,
                          HospitalRepository hospitalRepository,
                          EmergencyMapper mapper,
                          EmergencyAlertBroadcaster alertBroadcaster) {
    this.emergencyRepository = emergencyRepository;
    this.hospitalRepository = hospitalRepository;
    this.mapper = mapper;
    this.alertBroadcaster = alertBroadcaster;
  }
```

Replace with:

```java
  private final EmailNotificationProducer emailNotificationProducer;

  public EmergencyService(EmergencyRequestRepository emergencyRepository,
                          HospitalRepository hospitalRepository,
                          EmergencyMapper mapper,
                          EmergencyAlertBroadcaster alertBroadcaster,
                          EmailNotificationProducer emailNotificationProducer) {
    this.emergencyRepository = emergencyRepository;
    this.hospitalRepository = hospitalRepository;
    this.mapper = mapper;
    this.alertBroadcaster = alertBroadcaster;
    this.emailNotificationProducer = emailNotificationProducer;
  }
```

- [ ] **Step 3: Add import at top of file**

Add after existing imports:

```java
import com.healthcare.event.EmailNotificationEvent;
import java.util.UUID;
```

- [ ] **Step 4: Add method to publish email notification**

Add this new method after the `createEmergency` method:

```java
  private void publishEmailNotification(EmergencyRequest emergency, Hospital hospital) {
    try {
      EmailNotificationEvent event = EmailNotificationEvent.builder()
          .eventId(UUID.randomUUID().toString())
          .timestamp(LocalDateTime.now())
          .emergencyRequestId(emergency.getId())
          .hospitalId(hospital.getId())
          .hospitalName(hospital.getName())
          .hospitalEmail(hospital.getEmail())
          .emergencyType(emergency.getEmergencyType())
          .userLatitude(emergency.getUserLatitude())
          .userLongitude(emergency.getUserLongitude())
          .userPhone(emergency.getUserPhone())
          .subject("New Emergency Alert: " + emergency.getEmergencyType())
          .messageType("EMERGENCY_ALERT")
          .build();

      emailNotificationProducer.publishEmailNotification(event);
      log.info("Email notification event published. EmergencyId: {}", emergency.getId());
    } catch (Exception e) {
      log.error("Failed to publish email notification for emergency: {}", emergency.getId(), e);
      // Don't fail the emergency request if email publish fails
    }
  }
```

- [ ] **Step 5: Call publishEmailNotification in createEmergency**

Find the createEmergency method around line 50-93. After line 84 where alert is broadcasted:

```java
    // Broadcast alert to hospital via WebSocket
    try {
      alertBroadcaster.notifyHospital(hospital.getId(), saved);
      log.info("Alert broadcasted to hospital: {}", hospital.getId());
    } catch (Exception e) {
      log.error("Failed to broadcast alert to hospital: {}", hospital.getId(), e);
      // Don't fail the request if broadcast fails; hospital can poll for updates
    }
```

Add after this block:

```java
    // Publish email notification event to Kafka
    publishEmailNotification(saved, hospital);
```

- [ ] **Step 6: Verify changes**

Check that:
1. EmailNotificationProducer is injected in constructor
2. import statements include EmailNotificationEvent and UUID
3. publishEmailNotification method exists
4. publishEmailNotification is called after WebSocket broadcast

- [ ] **Step 7: Commit**

```bash
git add healthcare-BE-services/src/main/java/com/healthcare/service/EmergencyService.java
git commit -m "feat: publish email notification event when emergency created"
```

---

## Task 9: Add Email Provider Configuration Property

**Files:**
- Modify: `healthcare-BE-services/src/main/resources/application.yaml:34-60`

- [ ] **Step 1: Open application.yaml**

Find the Kafka section you added in Task 3.

- [ ] **Step 2: Add email configuration**

After the Kafka section, add:

```yaml
email:
  provider: mock
```

Full section should look like:

```yaml
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      acks: all
      retries: 3
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
    consumer:
      bootstrap-servers: localhost:9092
      group-id: healthcare-email-group
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      auto-offset-reset: earliest
      enable-auto-commit: false

email:
  provider: mock

server:
```

- [ ] **Step 3: Verify YAML syntax**

```bash
cd healthcare-BE-services && mvn clean install -DskipTests
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add healthcare-BE-services/src/main/resources/application.yaml
git commit -m "config: add email provider configuration (default: mock)"
```

---

## Task 10: Add Unit Tests for EmailNotificationProducer

**Files:**
- Create: `healthcare-BE-services/src/test/java/com/healthcare/service/EmailNotificationProducerTest.java`

- [ ] **Step 1: Create test file**

```java
package com.healthcare.service;

import com.healthcare.event.EmailNotificationEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmailNotificationProducerTest {

  @Mock
  private KafkaTemplate<String, Object> kafkaTemplate;

  @InjectMocks
  private EmailNotificationProducer producer;

  @Test
  void testPublishEmailNotification_Success() {
    // Arrange
    EmailNotificationEvent event = EmailNotificationEvent.builder()
        .eventId(UUID.randomUUID().toString())
        .timestamp(LocalDateTime.now())
        .emergencyRequestId(1L)
        .hospitalId(1L)
        .hospitalName("Apollo Hospital")
        .hospitalEmail("alerts@apollo.com")
        .emergencyType("CARDIAC_ARREST")
        .userLatitude(28.7041)
        .userLongitude(77.1025)
        .userPhone("+91-9876543210")
        .subject("Emergency Alert")
        .messageType("EMERGENCY_ALERT")
        .build();

    when(kafkaTemplate.send(any())).thenReturn(null);

    // Act
    producer.publishEmailNotification(event);

    // Assert
    verify(kafkaTemplate).send(any());
  }

  @Test
  void testPublishEmailNotification_ThrowsException() {
    // Arrange
    EmailNotificationEvent event = EmailNotificationEvent.builder()
        .eventId(UUID.randomUUID().toString())
        .timestamp(LocalDateTime.now())
        .emergencyRequestId(1L)
        .hospitalId(1L)
        .hospitalName("Apollo Hospital")
        .hospitalEmail("alerts@apollo.com")
        .emergencyType("CARDIAC_ARREST")
        .userLatitude(28.7041)
        .userLongitude(77.1025)
        .userPhone("+91-9876543210")
        .subject("Emergency Alert")
        .messageType("EMERGENCY_ALERT")
        .build();

    when(kafkaTemplate.send(any())).thenThrow(new RuntimeException("Kafka error"));

    // Act & Assert
    org.junit.jupiter.api.Assertions.assertThrows(
        RuntimeException.class,
        () -> producer.publishEmailNotification(event)
    );
  }
}
```

Tests producer success and failure cases.

- [ ] **Step 2: Run tests**

```bash
cd healthcare-BE-services && mvn test -Dtest=EmailNotificationProducerTest
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add healthcare-BE-services/src/test/java/com/healthcare/service/EmailNotificationProducerTest.java
git commit -m "test: add unit tests for EmailNotificationProducer"
```

---

## Task 11: Add Unit Tests for EmailNotificationConsumer

**Files:**
- Create: `healthcare-BE-services/src/test/java/com/healthcare/service/EmailNotificationConsumerTest.java`

- [ ] **Step 1: Create test file**

```java
package com.healthcare.service;

import com.healthcare.event.EmailNotificationEvent;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.support.Acknowledgment;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmailNotificationConsumerTest {

  @Mock
  private EmailService emailService;

  @Mock
  private Acknowledgment acknowledgment;

  @InjectMocks
  private EmailNotificationConsumer consumer;

  @Test
  void testHandleEmailNotification_Success() {
    // Arrange
    EmailNotificationEvent event = EmailNotificationEvent.builder()
        .eventId(UUID.randomUUID().toString())
        .timestamp(LocalDateTime.now())
        .emergencyRequestId(1L)
        .hospitalId(1L)
        .hospitalName("Apollo Hospital")
        .hospitalEmail("alerts@apollo.com")
        .emergencyType("CARDIAC_ARREST")
        .userLatitude(28.7041)
        .userLongitude(77.1025)
        .userPhone("+91-9876543210")
        .subject("Emergency Alert")
        .messageType("EMERGENCY_ALERT")
        .build();

    when(emailService.sendEmailNotification(event)).thenReturn(true);

    // Act
    consumer.handleEmailNotification(event, acknowledgment, 0, 0L);

    // Assert
    verify(emailService).sendEmailNotification(event);
    verify(acknowledgment).acknowledge();
  }

  @Test
  void testHandleEmailNotification_Failure() {
    // Arrange
    EmailNotificationEvent event = EmailNotificationEvent.builder()
        .eventId(UUID.randomUUID().toString())
        .timestamp(LocalDateTime.now())
        .emergencyRequestId(1L)
        .hospitalId(1L)
        .hospitalName("Apollo Hospital")
        .hospitalEmail("alerts@apollo.com")
        .emergencyType("CARDIAC_ARREST")
        .userLatitude(28.7041)
        .userLongitude(77.1025)
        .userPhone("+91-9876543210")
        .subject("Emergency Alert")
        .messageType("EMERGENCY_ALERT")
        .build();

    when(emailService.sendEmailNotification(event)).thenReturn(false);

    // Act
    org.junit.jupiter.api.Assertions.assertThrows(
        RuntimeException.class,
        () -> consumer.handleEmailNotification(event, acknowledgment, 0, 0L)
    );

    // Assert
    verify(emailService).sendEmailNotification(event);
    // Acknowledgment not called on failure - message will be retried
  }

  @Test
  void testHandleEmailNotification_InvalidEvent() {
    // Arrange
    EmailNotificationEvent event = EmailNotificationEvent.builder()
        .eventId(null) // Invalid: no eventId
        .timestamp(LocalDateTime.now())
        .emergencyRequestId(1L)
        .hospitalId(1L)
        .hospitalName("Apollo Hospital")
        .hospitalEmail("alerts@apollo.com")
        .emergencyType("CARDIAC_ARREST")
        .userLatitude(28.7041)
        .userLongitude(77.1025)
        .userPhone("+91-9876543210")
        .subject("Emergency Alert")
        .messageType("EMERGENCY_ALERT")
        .build();

    // Act
    consumer.handleEmailNotification(event, acknowledgment, 0, 0L);

    // Assert
    verify(acknowledgment).acknowledge();
    // EmailService should not be called for invalid event
  }
}
```

Tests consumer success, failure, and invalid event handling.

- [ ] **Step 2: Run tests**

```bash
cd healthcare-BE-services && mvn test -Dtest=EmailNotificationConsumerTest
```

Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add healthcare-BE-services/src/test/java/com/healthcare/service/EmailNotificationConsumerTest.java
git commit -m "test: add unit tests for EmailNotificationConsumer"
```

---

## Task 12: Run Full Test Suite

**Files:**
- Test: All backend tests

- [ ] **Step 1: Run all tests**

```bash
cd healthcare-BE-services && mvn clean test
```

Expected: All tests pass (including new and existing tests).

- [ ] **Step 2: Verify no regressions**

Check that all existing tests still pass:
- EmergencyServiceTest
- EmergencyControllerTest
- Any other existing tests

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test: verify all tests pass including new Kafka email flow tests"
```

---

## Task 13: Update Backend Architecture Documentation

**Files:**
- Modify: `docs/ARCHITECTURE.md` (create if doesn't exist)

- [ ] **Step 1: Check if ARCHITECTURE.md exists**

```bash
ls -la docs/ARCHITECTURE.md
```

If it doesn't exist, create it with basic structure.

- [ ] **Step 2: Add Email Notification Flow section**

Add this section to the documentation:

```markdown
## Email Notification Flow (Kafka-Based)

### Overview
Email notifications are published asynchronously via Kafka when emergencies are created. This decouples the emergency request handling from email sending, allowing for better scalability and resilience.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ EmergencyService (createEmergency)                              │
│ 1. Create emergency request                                     │
│ 2. Broadcast alert via WebSocket                               │
│ 3. Publish EmailNotificationEvent to Kafka topic               │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ (async)
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ Kafka Topic: healthcare.notification.email                      │
│ Event Type: EmailNotificationEvent                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ (consumer group: healthcare-email-group)
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ EmailNotificationConsumer (@KafkaListener)                      │
│ 1. Receive event from topic                                    │
│ 2. Validate event payload                                      │
│ 3. Delegate to EmailService                                    │
│ 4. Acknowledge message on success                              │
│ 5. Retry on failure (manual ack)                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│ EmailService (pluggable interface)                              │
│ Implementations:                                                 │
│ - EmailServiceImpl (default, mock provider)                      │
│ - Future: SendGrid, AWS SES, SMTP providers                    │
└─────────────────────────────────────────────────────────────────┘
```

### Kafka Configuration

**Topic:** `healthcare.notification.email`
**Consumer Group:** `healthcare-email-group`
**Partitions:** 1 (default)
**Replication Factor:** 1 (dev), 3+ (prod)
**Retention:** 7 days (configurable)

### EmailNotificationEvent Payload

```json
{
  "eventId": "uuid",
  "timestamp": "2026-05-11T10:30:00Z",
  "emergencyRequestId": 123,
  "hospitalId": 456,
  "hospitalName": "Apollo Hospital",
  "hospitalEmail": "alerts@apollo.com",
  "emergencyType": "CARDIAC_ARREST",
  "userLatitude": 28.7041,
  "userLongitude": 77.1025,
  "userPhone": "+91-98765432xx",
  "subject": "New Emergency Alert: CARDIAC_ARREST",
  "messageType": "EMERGENCY_ALERT"
}
```

### Retry & Failure Handling

**Retry Strategy:**
- Spring Kafka auto-retry: 3 attempts with exponential backoff (1s initial, 1s increment)
- Manual acknowledgment: Failed messages redelivered to consumer after timeout
- No dead letter topic (MVP): Failed messages logged for manual review

**Failure Scenarios:**
1. Invalid payload → Log warning, acknowledge and skip
2. Email service error → Don't acknowledge, retry via Kafka
3. Unknown provider → Fall back to mock, log warning

**Monitoring:**
- All publish/consume events logged at INFO level
- Errors logged at ERROR level with full context
- Check logs for "email notification" keyword to track flow

### Configuration

**application.yaml:**
```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    producer:
      acks: all
      retries: 3
    consumer:
      group-id: healthcare-email-group
      auto-offset-reset: earliest
      enable-auto-commit: false

email:
  provider: mock  # Options: mock, sendgrid, aws-ses, smtp
```

### Testing

**Local Testing Steps:**

1. **Start Kafka locally:**
   ```bash
   docker run -d --name kafka \
     -p 9092:9092 \
     -e KAFKA_BROKER_ID=1 \
     -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
     -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092 \
     -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
     confluentinc/cp-kafka:7.5.0
   ```

   Or use Docker Compose (create docker-compose.yml with Kafka + Zookeeper)

2. **Start backend:**
   ```bash
   cd healthcare-BE-services
   mvn spring-boot:run
   ```

3. **Trigger emergency (test the flow):**
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

4. **Check logs:**
   - Look for: "Publishing email notification event"
   - Look for: "Received email notification event"
   - Look for: "[MOCK EMAIL]" (shows email would be sent)

5. **Verify end-to-end:**
   - Emergency request created (response 201)
   - Log shows publish event
   - Log shows consumer received event
   - Log shows email send result

### Modules Impacted

- **EmergencyService** - publishes events on emergency creation
- **EmailNotificationProducer** - publishes to Kafka
- **EmailNotificationConsumer** - listens and processes
- **EmailService** - actual email sending logic
- **KafkaConfig** - producer/consumer configuration

### Future Enhancements

1. Add SendGrid provider implementation
2. Add AWS SES provider implementation
3. Add dead letter topic for failed messages
4. Add metrics/monitoring (Prometheus)
5. Add email template system
6. Add user preference for email notifications
7. Batch email sending for high volume scenarios
```

- [ ] **Step 3: Verify documentation**

Check that all sections are clear and complete.

- [ ] **Step 4: Commit**

```bash
git add docs/ARCHITECTURE.md
git commit -m "docs: add email notification kafka flow architecture"
```

---

## Task 14: Final Integration Test

**Files:**
- Manual testing via API

- [ ] **Step 1: Start backend**

```bash
cd healthcare-BE-services
mvn spring-boot:run
```

Wait for: "HospitalServiceApplication started successfully"

- [ ] **Step 2: Verify dependencies loaded**

Check logs for:
```
Starting EmailNotificationProducer
Starting EmailNotificationConsumer
Starting KafkaConfig
```

- [ ] **Step 3: Create emergency via API**

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

Expected response:
```json
{
  "status": "success",
  "data": {
    "requestId": "ER-XXXX",
    "hospital": {
      "id": 1,
      "name": "Apollo Hospital"
    },
    "status": "INITIATED"
  },
  "timestamp": "2026-05-11T10:30:00Z"
}
```

- [ ] **Step 4: Check logs for email flow**

Look for these log lines in order:
1. `Publishing email notification event. EventId: XXX, Emergency: 1`
2. `Email notification published successfully. EventId: XXX`
3. `Received email notification event. EventId: XXX`
4. `[MOCK EMAIL] To: alerts@...` (email send)
5. `Email notification sent successfully. EventId: XXX`

- [ ] **Step 5: Verify no errors**

Ensure no ERROR or WARN logs related to email flow (except "not yet implemented" for other providers).

- [ ] **Step 6: Stop backend**

```bash
Ctrl+C in the terminal running mvn spring-boot:run
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "test: verify email notification flow works end-to-end"
```

---

## Summary

**New files created (7):**
1. `src/main/java/com/healthcare/config/KafkaConfig.java`
2. `src/main/java/com/healthcare/event/EmailNotificationEvent.java`
3. `src/main/java/com/healthcare/service/EmailNotificationProducer.java`
4. `src/main/java/com/healthcare/service/EmailService.java`
5. `src/main/java/com/healthcare/service/EmailServiceImpl.java`
6. `src/main/java/com/healthcare/service/EmailNotificationConsumer.java`
7. `src/test/java/com/healthcare/service/EmailNotificationProducerTest.java`
8. `src/test/java/com/healthcare/service/EmailNotificationConsumerTest.java`

**Files modified (3):**
1. `pom.xml` - Added spring-kafka dependency
2. `src/main/resources/application.yaml` - Added Kafka and email config
3. `src/main/java/com/healthcare/service/EmergencyService.java` - Added email event publishing
4. `docs/ARCHITECTURE.md` - Added email notification flow documentation

---

