CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username TEXT NOT NULL UNIQUE,
                       password TEXT NOT NULL,
                       created_at TIMESTAMPTZ,
                       updated_at TIMESTAMPTZ,
                       deleted_at TIMESTAMPTZ
);
