package com.healthcare.service;

import com.healthcare.config.KafkaConfig;
import com.healthcare.event.EmailNotificationEvent;
import com.healthcare.event.UserEmailNotificationEvent;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationPublisher {
  private static final Logger logger = LoggerFactory.getLogger(NotificationPublisher.class);

  @Autowired private KafkaTemplate<String, Object> kafkaTemplate;

  public void publishEmailNotification(
      String recipientEmail,
      String recipientName,
      String subject,
      String templateName,
      String body) {
    EmailNotificationEvent event = new EmailNotificationEvent();
    event.setEventId(UUID.randomUUID().toString());
    event.setRecipientEmail(recipientEmail);
    event.setRecipientName(recipientName);
    event.setSubject(subject);
    event.setTemplateName(templateName);
    event.setBody(body);
    event.setTimestamp(System.currentTimeMillis());
    event.setRetryCount(0);
    event.setStatus("PENDING");

    publishEmailNotification(event);
  }

  public void publishEmailNotification(EmailNotificationEvent event) {
    try {
      logger.info(
          "Publishing email notification to Kafka: eventId={}, recipient={}",
          event.getEventId(),
          event.getRecipientEmail());

      kafkaTemplate.send(KafkaConfig.EMAIL_NOTIFICATION_TOPIC, event.getEventId(), event);

      logger.info("Email notification published successfully: eventId={}", event.getEventId());
    } catch (Exception e) {
      logger.error(
          "Failed to publish email notification: eventId={}, error={}",
          event.getEventId(),
          e.getMessage(),
          e);
    }
  }

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
      String body) {
    UserEmailNotificationEvent event = new UserEmailNotificationEvent();
    event.setEventId(UUID.randomUUID().toString());
    event.setRecipientEmail(recipientEmail);
    event.setRecipientName(patientName);
    event.setEmergencyId(emergencyId);
    event.setEmergencyType(emergencyType);
    event.setHospitalName(hospitalName);
    event.setHospitalPhone(hospitalPhone);
    event.setHospitalAddress(hospitalAddress);
    event.setSubject(subject);
    event.setTemplateName(templateName);
    event.setBody(body);
    event.setTimestamp(System.currentTimeMillis());
    event.setRetryCount(0);
    event.setStatus("PENDING");

    publishUserEmailNotification(event);
  }

  public void publishUserEmailNotification(UserEmailNotificationEvent event) {
    try {
      logger.info(
          "Publishing user email notification to Kafka: eventId={}, recipient={}",
          event.getEventId(),
          event.getRecipientEmail());

      kafkaTemplate.send("healthcare.notification.user-email", event.getEventId(), event);

      logger.info("User email notification published successfully: eventId={}", event.getEventId());
    } catch (Exception e) {
      logger.error(
          "Failed to publish user email notification: eventId={}, error={}",
          event.getEventId(),
          e.getMessage(),
          e);
    }
  }
}
