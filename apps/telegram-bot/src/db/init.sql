CREATE TABLE telegram_subscribed_chats(
  chat_id INTEGER PRIMARY KEY,
  group_name VARCHAR(50),
  faculty_id INTEGER
);

CREATE TABLE vk_subscribed_chats(
  chat_id NUMBER PRIMARY KEY,
  group_name VARCHAR(50),
  faculty_id NUMBER
);

CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  description VARCHAR NOT NULL,
  stack VARCHAR
);
