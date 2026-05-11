package com.healthcare.service.email;

public interface EmailProvider {
  boolean sendEmail(String recipientEmail, String recipientName, String subject, String body);

  String getProviderName();
}
