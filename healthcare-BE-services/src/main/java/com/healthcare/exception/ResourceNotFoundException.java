package com.healthcare.exception;

/**
 * Thrown when a requested resource is not found in the database.
 * Typically results in HTTP 404 Not Found response.
 */
public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message) {
    super(message);
  }

  public ResourceNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }
}
