CREATE DATABASE services WITH TEMPLATE postgres;

CREATE SCHEMA figma;
-- DROP TABLE figma.figma_changelogs
CREATE TABLE figma.figma_changelogs (
                                        id SERIAL,
                                        file VARCHAR(100),
                                        date DATE,
                                        name VARCHAR(200),
                                        link TEXT,
                                        description TEXT
);

CREATE INDEX figma_changelogs_step ON figma.figma_changelogs(name);
CREATE INDEX figma_changelogs_file ON figma.figma_changelogs(file);

-- DROP USER service
CREATE USER service WITH PASSWORD '0000' SUPERUSER REPLICATION;


GRANT ALL ON TABLE figma.figma_changelogs to public;
GRANT ALL ON TABLE figma.figma_changelogs to service;

--
-- ALTER SEQUENCE figma.figma_changelogs_id_seq RESTART WITH 1;