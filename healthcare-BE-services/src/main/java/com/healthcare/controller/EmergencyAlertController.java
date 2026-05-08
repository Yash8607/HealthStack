package com.healthcare.controller;

import com.healthcare.websocket.EmergencyAlertBroadcaster;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class EmergencyAlertController {

  private static final Logger log = LoggerFactory.getLogger(EmergencyAlertController.class);

  @Autowired private EmergencyAlertBroadcaster broadcaster;

  @MessageMapping("/emergency/subscribe")
  public void subscribeToAlerts(@Payload SubscriptionRequest request,
                                SimpMessageHeaderAccessor headerAccessor) {
    String sessionId = headerAccessor.getSessionId();
    Long hospitalId = request.getHospitalId();
    log.info("Hospital {} subscribing to emergency alerts (session: {})", hospitalId, sessionId);
    broadcaster.subscribeHospital(hospitalId, sessionId);
  }

  @MessageMapping("/emergency/unsubscribe")
  public void unsubscribeFromAlerts(SimpMessageHeaderAccessor headerAccessor) {
    String sessionId = headerAccessor.getSessionId();
    log.info("Hospital unsubscribing from emergency alerts (session: {})", sessionId);
    broadcaster.unsubscribeHospital(sessionId);
  }

  public static class SubscriptionRequest {
    private Long hospitalId;

    public SubscriptionRequest() {}

    public SubscriptionRequest(Long hospitalId) {
      this.hospitalId = hospitalId;
    }

    public Long getHospitalId() {
      return hospitalId;
    }

    public void setHospitalId(Long hospitalId) {
      this.hospitalId = hospitalId;
    }
  }
}
