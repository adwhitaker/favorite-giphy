CREATE TABLE gifs (
	id SERIAL PRIMARY KEY,
	url varchar(500) NOT NULL,
	comment varchar(150),
	edited boolean
	);
