DROP SCHEMA IF EXISTS shgpu-table;

CREATE SCHEMA shgpu-table;

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL
);

CREATE TABLE subscribed_groups (
  group_id INTEGER,
    CONSTRAINT fk_group
      FOREIGN KEY group_id
        REFERENCES groups(id)
  telegram_chat_id VARCHAR(255),
  vk_chat_id VARCHAR(255)
);

CREATE TABLE pairs (
  id SERIAL PRIMARY KEY,
  instructor VARCHAR(100),
  name VARCHAR(100) NOT NULL,
  number INTEGER check (number >= 1 AND number <= 6),
  day INTEGER check (number >= 1 AND number <= 6),
  is_current_week boolean,
);

CREATE TABLE pair_groups (
  pair_id INTEGER,
    CONSTRAINT fk_pair
      FOREIGN KEY (pair_id)
        REFERENCES pairs(id),
  group_id INTEGER,
    CONSTRAINT fk_group
      FOREIGN KEY (group_id)
        REFERENCES groups(id)
);