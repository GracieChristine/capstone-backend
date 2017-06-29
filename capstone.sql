DROP DATABASE IF EXISTS capstone;
CREATE DATABASE capstone;

\c capstone;

CREATE TABLE records (
  ID SERIAL PRIMARY KEY,
  original VARCHAR,
  original_lang VARCHAR,
  translated VARCHAR,
  translated_lang VARCHAR
);

INSERT INTO records (original, original_lang, translated, translated_lang)
  VALUES ('Hello!', 'English', 'Bonjour!', 'French');
