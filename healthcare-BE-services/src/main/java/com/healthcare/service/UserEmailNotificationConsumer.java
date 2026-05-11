package com.healthcare.service;

import com.healthcare.event.UserEmailNotificationEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserEmailNotificationConsumer {

  @Autowired private EmailService emailService;

  @KafkaListener(
      topics = "healthcare.notification.user-email",
      groupId = "healthcare-user-email-group",
      containerFactory = "kafkaListenerContainerFactory")
  public void consumeUserEmailNotification(
      @Payload UserEmailNotificationEvent event, Acknowledgment acknowledgment) {
    try {
      log.info(
          "Received user email notification: eventId={}, recipient={}, emergency={}",
          event.getEventId(),
          event.getRecipientEmail(),
          event.getEmergencyId());

      emailService.sendNotification(event);

      if ("RETRY_PENDING".equals(event.getStatus())) {
        event.setRetryCount(event.getRetryCount() + 1);
        log.info(
            "Republishing user email notification for retry: eventId={}, retryCount={}",
            event.getEventId(),
            event.getRetryCount());
      }

      log.info(
          "Email notification processed and acknowledged: eventId={}, status={}",
          event.getEventId(),
          event.getStatus());
      acknowledgment.acknowledge();
    } catch (Exception e) {
      log.error("Error processing user email notification: eventId={}", event.getEventId(), e);
    }
  }
}
