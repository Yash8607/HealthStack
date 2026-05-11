package com.healthcare.event;

public class EmailNotificationEvent {
  private String eventId;
  private String recipientEmail;
  private String recipientName;
  private String subject;
  private String templateName;
  private String body;
  private Long timestamp;
  private int retryCount;
  private String status;

  public EmailNotificationEvent() {}

  public EmailNotificationEvent(
      String eventId,
      String recipientEmail,
      String recipientName,
      String subject,
      String templateName,
      String body,
      Long timestamp,
      int retryCount,
      String status) {
    this.eventId = eventId;
    this.recipientEmail = recipientEmail;
    this.recipientName = recipientName;
    this.subject = subject;
    this.templateName = templateName;
    this.body = body;
    this.timestamp = timestamp;
    this.retryCount = retryCount;
    this.status = status;
  }

  public String getEventId() {
    return eventId;
  }

  public void setEventId(String eventId) {
    this.eventId = eventId;
  }

  public String getRecipientEmail() {
    return recipientEmail;
  }

  public void setRecipientEmail(String recipientEmail) {
    this.recipientEmail = recipientEmail;
  }

  public String getRecipientName() {
    return recipientName;
  }

  public void setRecipientName(String recipientName) {
    this.recipientName = recipientName;
  }

  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  public String getTemplateName() {
    return templateName;
  }

  public void setTemplateName(String templateName) {
    this.templateName = templateName;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public Long getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Long timestamp) {
    this.timestamp = timestamp;
  }

  public int getRetryCount() {
    return retryCount;
  }

  public void setRetryCount(int retryCount) {
    this.retryCount = retryCount;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
