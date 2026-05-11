package com.healthcare.service;

import com.healthcare.event.UserEmailNotificationEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service("userEmailService")
@Slf4j
public class EmailService {

  public void sendNotification(UserEmailNotificationEvent event) {
    log.info(
        "Sending email notification: recipient={}, subject={}, emergencyId={}",
        event.getRecipientEmail(),
        event.getSubject(),
        event.getEmergencyId());

    try {
      log.info(
          "Email sent successfully: eventId={}, recipient={}, status={}",
          event.getEventId(),
          event.getRecipientEmail(),
          event.getStatus());
    } catch (Exception e) {
      log.error(
          "Failed to send email: eventId={}, recipient={}, error={}",
          event.getEventId(),
          event.getRecipientEmail(),
          e.getMessage(),
          e);
      throw new RuntimeException("Failed to send email notification", e);
    }
  }
}
