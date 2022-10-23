CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE subscribed_groups (
  group_id INTEGER,
    CONSTRAINT fk_group
      FOREIGN KEY (group_id)
        REFERENCES groups(id),
  telegram_chat_id VARCHAR(255),
  vk_chat_id VARCHAR(255)
);

CREATE TABLE pairs (
  id SERIAL PRIMARY KEY,
  instructor VARCHAR(100),
  name VARCHAR(100) NOT NULL,
  number INTEGER check (number >= 1 AND number <= 6),
  day INTEGER check (number >= 1 AND number <= 6),
  group_id INTEGER,
  date DATE,
  CONSTRAINT unique_pairs UNIQUE (instructor, name, number, day, group_id, date)
);

CREATE TABLE time_table (
  number INTEGER,
  begint VARCHAR(50),
  endt VARCHAR(50)
);

INSERT INTO time_table (number, begint, endt)
VALUES 
(1, '8:00', '9:30'),
(2, '9:40', '11:10'),
(3, '11:20', '12:50'),
(4, '13:20', '14:50'),
(5, '15:00', '16:30'),
(6, '16:40', '18:10');

INSERT INTO groups (name)
VALUES 
('130Б'),
('131Б'),
('132Б'),
('133Б-а'),
('133Б-б'),
('134Б-а'),
('134Б-б'),
('134Б-в'),
('135Б-а'),
('135Б-б'),
('130М'),
('131М'),
('230Б'),
('231Б'),
('232Б-а'),
('232Б-б'),
('233Б-а'),
('233Б-б'),
('234Б-а'),
('234Б-б'),
('235Б-а'),
('235Б-б'),
('236Б'),
('230М'),
('231М'),
('232М'),
('330Б'),
('331Б'),
('332Б-а'),
('332Б-б'),
('333Б-а'),
('333Б-б'),
('334Б-б'),
('334Б-в'),
('335Б'),
('337Б'),
('430Б'),
('431Б-а'),
('432Б-а'),
('432Б-б'),
('433Б'),
('434Б-б'),
('435Б'),
('532Б-а'),
('532Б-б'),
('534Б');