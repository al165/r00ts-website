--
-- Up
--

CREATE TABLE Articles (
    id INTEGER PRIMARY KEY,
    title TEXT,
    url TEXT,
    description TEXT,
    date INTEGER
);

--
-- Down
--

DROP TABLE Articles;

