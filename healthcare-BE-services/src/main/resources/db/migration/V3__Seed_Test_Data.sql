-- Test hospital data for development
INSERT INTO hospitals (name, address, latitude, longitude, phone, email, established_year, rating, is_active)
VALUES
  ('Apollo Hospital', 'Sarita Vihar, Delhi Mathura Road, New Delhi, 110076', 28.5278, 77.2785, '+91-11-71791090', 'contact@apollodelhi.com', 1996, 4.5, TRUE),
  ('AIIMS Delhi', 'Ansari Nagar East, New Delhi, 110029', 28.5672, 77.2100, '+91-11-26588500', 'contact@aiims.edu', 1956, 4.8, TRUE),
  ('Fortis Hospital', 'Sector 62, Phase VIII, Mohali, Punjab 160062', 30.7046, 76.7179, '+91-172-4922222', 'contact@fortishealthcare.com', 2001, 4.3, TRUE);
