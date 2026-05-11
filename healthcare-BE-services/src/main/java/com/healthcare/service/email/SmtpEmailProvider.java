package com.healthcare.service.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class SmtpEmailProvider implements EmailProvider {
  private static final Logger logger = LoggerFactory.getLogger(SmtpEmailProvider.class);

  @Autowired private JavaMailSender mailSender;

  @Value("${spring.mail.from:noreply@healthcare.com}")
  private String fromEmail;

  @Value("${app.email.enabled:false}")
  private boolean emailEnabled;

  @Override
  public boolean sendEmail(
      String recipientEmail, String recipientName, String subject, String body) {
    if (!emailEnabled) {
      logger.info("[MOCK] Email would be sent to {} | Subject: {}", recipientEmail, subject);
      return true;
    }

    try {
      logger.info("Sending email to {} | Subject: {}", recipientEmail, subject);
      SimpleMailMessage message = new SimpleMailMessage();
      message.setFrom(fromEmail);
      message.setTo(recipientEmail);
      message.setSubject(subject);
      message.setText(body);
      mailSender.send(message);
      logger.info("Email sent successfully to {}", recipientEmail);
      return true;
    } catch (Exception e) {
      logger.error("Failed to send email to {}: {}", recipientEmail, e.getMessage(), e);
      return false;
    }
  }

  @Override
  public String getProviderName() {
    return "SMTP";
  }
}
