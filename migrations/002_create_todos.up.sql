CREATE TABLE todos (
                       id BIGSERIAL PRIMARY KEY,
                       title TEXT NOT NULL,
                       description TEXT,
                       completed BOOLEAN DEFAULT FALSE,
                       due_date TIMESTAMPTZ,
                       created_at TIMESTAMPTZ,
                       updated_at TIMESTAMPTZ,
                       deleted_at TIMESTAMPTZ,
                       user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
);
