package com.healthcare.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

  private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

  /** Handle resource not found errors (404). */
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorDTO> handleResourceNotFound(
      ResourceNotFoundException ex, WebRequest request) {
    log.warn("Resource not found: {}", ex.getMessage());

    ApiErrorDTO error =
        ApiErrorDTO.builder()
            .status("error")
            .code("RESOURCE_NOT_FOUND")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .timestamp(LocalDateTime.now())
            .build();

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  /** Handle hospital not available errors (503). */
  @ExceptionHandler(HospitalNotAvailableException.class)
  public ResponseEntity<ApiErrorDTO> handleHospitalNotAvailable(
      HospitalNotAvailableException ex, WebRequest request) {
    log.warn("Hospital not available: {}", ex.getMessage());

    ApiErrorDTO error =
        ApiErrorDTO.builder()
            .status("error")
            .code("HOSPITAL_NOT_AVAILABLE")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .timestamp(LocalDateTime.now())
            .build();

    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
  }

  /** Handle JSR-303 validation errors (400). */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorDTO> handleValidationExceptions(
      MethodArgumentNotValidException ex, WebRequest request) {
    log.warn("Validation error: {}", ex.getMessage());

    Map<String, String> fieldErrors = new HashMap<>();
    ex.getBindingResult()
        .getFieldErrors()
        .forEach(error -> fieldErrors.put(error.getField(), error.getDefaultMessage()));

    ApiErrorDTO error =
        ApiErrorDTO.builder()
            .status("error")
            .code("VALIDATION_ERROR")
            .message("Input validation failed")
            .fieldErrors(fieldErrors)
            .path(request.getDescription(false).replace("uri=", ""))
            .timestamp(LocalDateTime.now())
            .build();

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  /** Handle all other unexpected errors (500). */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorDTO> handleGlobalException(Exception ex, WebRequest request) {
    log.error("Unexpected error occurred", ex);

    ApiErrorDTO error =
        ApiErrorDTO.builder()
            .status("error")
            .code("INTERNAL_SERVER_ERROR")
            .message("An unexpected error occurred. Please try again later.")
            .path(request.getDescription(false).replace("uri=", ""))
            .timestamp(LocalDateTime.now())
            .build();

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  }
}
