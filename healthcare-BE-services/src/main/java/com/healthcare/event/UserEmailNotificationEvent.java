package com.healthcare.event;

public class UserEmailNotificationEvent {
  private String eventId;
  private String recipientEmail;
  private String recipientName;
  private Long emergencyId;
  private String emergencyType;
  private String hospitalName;
  private String hospitalPhone;
  private String hospitalAddress;
  private String subject;
  private String templateName;
  private String body;
  private Long timestamp;
  private int retryCount;
  private String status;

  public UserEmailNotificationEvent() {}

  public UserEmailNotificationEvent(
      String eventId,
      String recipientEmail,
      String recipientName,
      Long emergencyId,
      String emergencyType,
      String hospitalName,
      String hospitalPhone,
      String hospitalAddress,
      String subject,
      String templateName,
      String body,
      Long timestamp,
      int retryCount,
      String status) {
    this.eventId = eventId;
    this.recipientEmail = recipientEmail;
    this.recipientName = recipientName;
    this.emergencyId = emergencyId;
    this.emergencyType = emergencyType;
    this.hospitalName = hospitalName;
    this.hospitalPhone = hospitalPhone;
    this.hospitalAddress = hospitalAddress;
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

  public Long getEmergencyId() {
    return emergencyId;
  }

  public void setEmergencyId(Long emergencyId) {
    this.emergencyId = emergencyId;
  }

  public String getEmergencyType() {
    return emergencyType;
  }

  public void setEmergencyType(String emergencyType) {
    this.emergencyType = emergencyType;
  }

  public String getHospitalName() {
    return hospitalName;
  }

  public void setHospitalName(String hospitalName) {
    this.hospitalName = hospitalName;
  }

  public String getHospitalPhone() {
    return hospitalPhone;
  }

  public void setHospitalPhone(String hospitalPhone) {
    this.hospitalPhone = hospitalPhone;
  }

  public String getHospitalAddress() {
    return hospitalAddress;
  }

  public void setHospitalAddress(String hospitalAddress) {
    this.hospitalAddress = hospitalAddress;
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
