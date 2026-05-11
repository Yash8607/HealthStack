package com.healthcare.websocket;

import com.healthcare.entity.EmergencyRequest;

/**
 * Service for broadcasting emergency alerts to hospitals via WebSocket. Hospitals subscribe to
 * alerts and receive real-time notifications when emergencies occur nearby.
 */
public interface EmergencyAlertBroadcaster {

  /**
   * Notify hospital of new emergency request. Hospital must be subscribed to receive the alert.
   *
   * @param hospitalId ID of hospital to notify
   * @param emergency emergency request details
   * @throws Exception if broadcast fails
   */
  void notifyHospital(Long hospitalId, EmergencyRequest emergency) throws Exception;

  /**
   * Broadcast alert to all subscribed hospitals.
   *
   * @param emergency emergency request details
   */
  void broadcastToAll(EmergencyRequest emergency);

  /**
   * Hospital subscribes to emergency alerts.
   *
   * @param hospitalId ID of hospital
   * @param sessionId WebSocket session ID
   */
  void subscribeHospital(Long hospitalId, String sessionId);

  /**
   * Hospital unsubscribes from emergency alerts.
   *
   * @param sessionId WebSocket session ID
   */
  void unsubscribeHospital(String sessionId);
}
