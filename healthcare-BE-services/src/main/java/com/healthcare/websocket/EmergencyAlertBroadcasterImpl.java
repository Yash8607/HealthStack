package com.healthcare.websocket;

import com.healthcare.entity.EmergencyRequest;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * In-memory implementation of EmergencyAlertBroadcaster. Maintains subscriptions in memory and
 * notifies subscribed hospitals.
 *
 * <p>TODO: Replace with WebSocket implementation for production.
 */
@Service
public class EmergencyAlertBroadcasterImpl implements EmergencyAlertBroadcaster {

  private static final Logger log = LoggerFactory.getLogger(EmergencyAlertBroadcasterImpl.class);

  // Map of hospital ID -> list of session IDs
  private final ConcurrentHashMap<Long, CopyOnWriteArrayList<String>> subscriptions =
      new ConcurrentHashMap<>();

  @Override
  public void notifyHospital(Long hospitalId, EmergencyRequest emergency) {
    log.info("Broadcasting emergency to hospital: {}", hospitalId);

    if (subscriptions.containsKey(hospitalId)) {
      CopyOnWriteArrayList<String> sessions = subscriptions.get(hospitalId);
      sessions.forEach(
          sessionId -> {
            log.debug("Sending alert to session: {} for hospital: {}", sessionId, hospitalId);
            // TODO: Send via WebSocket to sessionId with emergency details
          });
    } else {
      log.info("No active subscriptions for hospital: {}", hospitalId);
    }
  }

  @Override
  public void broadcastToAll(EmergencyRequest emergency) {
    log.info("Broadcasting emergency to all hospitals");
    subscriptions.forEach(
        (hospitalId, sessions) -> {
          if (hospitalId.equals(emergency.getHospital().getId())) {
            notifyHospital(hospitalId, emergency);
          }
        });
  }

  @Override
  public void subscribeHospital(Long hospitalId, String sessionId) {
    log.info("Hospital {} subscribing with session: {}", hospitalId, sessionId);
    subscriptions.computeIfAbsent(hospitalId, k -> new CopyOnWriteArrayList<>()).add(sessionId);
  }

  @Override
  public void unsubscribeHospital(String sessionId) {
    log.info("Unsubscribing session: {}", sessionId);
    subscriptions.values().forEach(sessions -> sessions.remove(sessionId));
  }
}
