package com.healthcare.exception;

/**
 * Thrown when a hospital is not available to receive emergency alerts. Possible causes: inactive
 * hospital, server down, no ambulances available.
 */
public class HospitalNotAvailableException extends RuntimeException {
  public HospitalNotAvailableException(String message) {
    super(message);
  }

  public HospitalNotAvailableException(String message, Throwable cause) {
    super(message, cause);
  }
}
