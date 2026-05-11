package com.healthcare.service;

import com.healthcare.config.KafkaConfig;
import com.healthcare.event.EmailNotificationEvent;
import com.healthcare.service.email.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationConsumer {
  private static final Logger logger = LoggerFactory.getLogger(EmailNotificationConsumer.class);

  @Autowired private EmailService emailService;
  @Autowired private NotificationPublisher publisher;

  @KafkaListener(
      topics = KafkaConfig.EMAIL_NOTIFICATION_TOPIC,
      groupId = KafkaConfig.EMAIL_GROUP_ID,
      containerFactory = "kafkaListenerContainerFactory")
  public void consumeEmailNotification(
      @Payload EmailNotificationEvent event, Acknowledgment acknowledgment) {
    logger.info(
        "Received email notification: eventId={}, recipient={}",
        event.getEventId(),
        event.getRecipientEmail());

    try {
      emailService.sendNotification(event);

      if ("RETRY_PENDING".equals(event.getStatus())) {
        logger.info(
            "Republishing notification for retry: eventId={}, attempt={}",
            event.getEventId(),
            event.getRetryCount());
        publisher.publishEmailNotification(event);
      }

      acknowledgment.acknowledge();
      logger.info(
          "Email notification processed and acknowledged: eventId={}, status={}",
          event.getEventId(),
          event.getStatus());

    } catch (Exception e) {
      logger.error(
          "Error processing email notification: eventId={}, error={}",
          event.getEventId(),
          e.getMessage(),
          e);
    }
  }
}
