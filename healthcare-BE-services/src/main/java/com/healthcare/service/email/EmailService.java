package com.healthcare.service.email;

import com.healthcare.event.EmailNotificationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
  private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
  private static final int MAX_RETRIES = 3;

  @Autowired private EmailProvider emailProvider;

  public boolean sendNotification(EmailNotificationEvent event) {
    logger.info(
        "Processing email notification: eventId={}, recipient={}, retryCount={}",
        event.getEventId(),
        event.getRecipientEmail(),
        event.getRetryCount());

    boolean success =
        emailProvider.sendEmail(
            event.getRecipientEmail(),
            event.getRecipientName(),
            event.getSubject(),
            event.getBody());

    if (success) {
      event.setStatus("SENT");
      logger.info("Email notification sent: eventId={}", event.getEventId());
    } else {
      if (event.getRetryCount() < MAX_RETRIES) {
        event.setRetryCount(event.getRetryCount() + 1);
        event.setStatus("RETRY_PENDING");
        logger.warn(
            "Email notification failed, marked for retry: eventId={}, attempt={}/{}",
            event.getEventId(),
            event.getRetryCount(),
            MAX_RETRIES);
      } else {
        event.setStatus("FAILED");
        logger.error(
            "Email notification failed after {} retries: eventId={}",
            MAX_RETRIES,
            event.getEventId());
      }
    }

    return success;
  }
}
