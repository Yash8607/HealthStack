-- First Aid Articles table
CREATE TABLE first_aid_articles (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  steps VARCHAR(5000),
  precautions VARCHAR(1000),
  category VARCHAR(255),
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_first_aid_published ON first_aid_articles(published);
CREATE INDEX idx_first_aid_category ON first_aid_articles(category);
