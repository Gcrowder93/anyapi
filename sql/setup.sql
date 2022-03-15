DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  length INT
);

-- INSERT INTO
--   songs (title, artist, length)
--   VALUES
--   ('aquemini', 'outkast', 5:20),
--   ('slippin', 'dmx', 5:08);