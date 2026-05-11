package com.healthcare.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standard error response DTO for API. Returned by GlobalExceptionHandler for all error responses
 * (4xx, 5xx).
 */
public class ApiErrorDTO {

  private String status;
  private String code;
  private String message;

  @JsonInclude(JsonInclude.Include.NON_NULL)
  private Map<String, String> fieldErrors;

  private String path;
  private LocalDateTime timestamp;

  // Constructors
  public ApiErrorDTO() {}

  public ApiErrorDTO(
      String status,
      String code,
      String message,
      Map<String, String> fieldErrors,
      String path,
      LocalDateTime timestamp) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.fieldErrors = fieldErrors;
    this.path = path;
    this.timestamp = timestamp;
  }

  // Getters
  public String getStatus() {
    return status;
  }

  public String getCode() {
    return code;
  }

  public String getMessage() {
    return message;
  }

  public Map<String, String> getFieldErrors() {
    return fieldErrors;
  }

  public String getPath() {
    return path;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  // Setters
  public void setStatus(String status) {
    this.status = status;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setFieldErrors(Map<String, String> fieldErrors) {
    this.fieldErrors = fieldErrors;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  // Builder
  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private String status;
    private String code;
    private String message;
    private Map<String, String> fieldErrors;
    private String path;
    private LocalDateTime timestamp;

    public Builder status(String status) {
      this.status = status;
      return this;
    }

    public Builder code(String code) {
      this.code = code;
      return this;
    }

    public Builder message(String message) {
      this.message = message;
      return this;
    }

    public Builder fieldErrors(Map<String, String> fieldErrors) {
      this.fieldErrors = fieldErrors;
      return this;
    }

    public Builder path(String path) {
      this.path = path;
      return this;
    }

    public Builder timestamp(LocalDateTime timestamp) {
      this.timestamp = timestamp;
      return this;
    }

    public ApiErrorDTO build() {
      return new ApiErrorDTO(status, code, message, fieldErrors, path, timestamp);
    }
  }
}
