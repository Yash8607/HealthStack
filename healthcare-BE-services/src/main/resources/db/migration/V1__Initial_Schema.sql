-- Hospitals table
CREATE TABLE hospitals (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(512),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone VARCHAR(20),
  email VARCHAR(255),
  established_year INTEGER,
  rating DECIMAL(3, 2),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hospital_name ON hospitals(name);
CREATE INDEX idx_hospital_location ON hospitals(latitude, longitude);

-- Departments table
CREATE TABLE departments (
  id BIGSERIAL PRIMARY KEY,
  hospital_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
);

CREATE INDEX idx_department_hospital ON departments(hospital_id);

-- Doctors table
CREATE TABLE doctors (
  id BIGSERIAL PRIMARY KEY,
  department_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255),
  qualification VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE INDEX idx_doctor_department ON doctors(department_id);

-- Services table
CREATE TABLE services (
  id BIGSERIAL PRIMARY KEY,
  hospital_id BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
);

CREATE INDEX idx_service_hospital ON services(hospital_id);

-- Beds table
CREATE TABLE beds (
  id BIGSERIAL PRIMARY KEY,
  hospital_id BIGINT NOT NULL,
  department_id BIGINT,
  total_beds INTEGER NOT NULL,
  occupied_beds INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE INDEX idx_bed_hospital ON beds(hospital_id);

-- Emergency Requests table
CREATE TABLE emergency_requests (
  id BIGSERIAL PRIMARY KEY,
  hospital_id BIGINT,
  user_latitude DECIMAL(10, 8),
  user_longitude DECIMAL(11, 8),
  emergency_type VARCHAR(100),
  user_phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'INITIATED',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE SET NULL
);

CREATE INDEX idx_emergency_hospital ON emergency_requests(hospital_id);
CREATE INDEX idx_emergency_created ON emergency_requests(created_at);
