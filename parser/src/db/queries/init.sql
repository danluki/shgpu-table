CREATE TABLE IF NOT EXISTS groups (
  group_id SERIAL PRIMARY KEY,
  group_name VARCHAR(10) NOT NULL
);

INSERT INTO groups (group_name)
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

CREATE TABLE IF NOT EXISTS subscribed_groups (
  group_id INT,
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

/*Current week*/

CREATE TABLE IF NOT EXISTS monday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tuesday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS wednesday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS thursday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS friday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS saturday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255)
);

/*Next week*/

CREATE TABLE IF NOT EXISTS next_monday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS next_tuesday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS next_wednesday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS next_thursday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS next_friday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255),
  fifth_pair VARCHAR(255),
  six_pair VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS next_saturday_table (
  group_id INT,
  CONSTRAINT fk_group
	FOREIGN KEY (group_id) REFERENCES groups(group_id),
  first_pair VARCHAR(255),
  second_pair VARCHAR(255),
  third_pair VARCHAR(255),
  fourth_pair VARCHAR(255)
);