-- ======================
-- TABLES
-- ======================

CREATE TABLE IF NOT EXISTS image (
    id SERIAL PRIMARY KEY,
    user_id INT,
    storage_location storage_location_enum,
    directory VARCHAR(500),
    url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(500),
    last_name VARCHAR(500),
    email VARCHAR(500) UNIQUE,
    password VARCHAR(500),
    school VARCHAR(500),
    level VARCHAR(500),
    bio TEXT,
    image_id INT
);

CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) UNIQUE
);

CREATE TABLE IF NOT EXISTS activity (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500),
    description TEXT,
    location VARCHAR(500),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    date TIMESTAMP,
    capacity INT,
    image_id INT,
    organizer_id INT,
    category_id INT,
    status activity_status_enum,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registration (
    id SERIAL PRIMARY KEY,
    user_id INT,
    activity_id INT,
    registered_at TIMESTAMP,
    status registration_status_enum
);

CREATE TABLE IF NOT EXISTS social_account (
    id SERIAL PRIMARY KEY,
    user_id INT,
    platform platform_enum,
    handle VARCHAR(500),
    url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS conversation (
    id SERIAL PRIMARY KEY,
    activity_id INT UNIQUE,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message (
    id SERIAL PRIMARY KEY,
    conversation_id INT,
    user_id INT,
    body TEXT,
    sent_at TIMESTAMP
);

-- ======================
-- FOREIGN KEYS
-- ======================

ALTER TABLE image
ADD CONSTRAINT fk_image_user FOREIGN KEY (user_id)
REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE users
ADD CONSTRAINT fk_users_image FOREIGN KEY (image_id)
REFERENCES image(id) ON DELETE SET NULL;

ALTER TABLE activity
ADD CONSTRAINT fk_activity_image FOREIGN KEY (image_id)
REFERENCES image(id) ON DELETE SET NULL;

ALTER TABLE activity
ADD CONSTRAINT fk_activity_organizer FOREIGN KEY (organizer_id)
REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE activity
ADD CONSTRAINT fk_activity_category FOREIGN KEY (category_id)
REFERENCES category(id) ON DELETE SET NULL;

ALTER TABLE registration
ADD CONSTRAINT fk_registration_user FOREIGN KEY (user_id)
REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE registration
ADD CONSTRAINT fk_registration_activity FOREIGN KEY (activity_id)
REFERENCES activity(id) ON DELETE CASCADE;

ALTER TABLE social_account
ADD CONSTRAINT fk_social_user FOREIGN KEY (user_id)
REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE conversation
ADD CONSTRAINT fk_conversation_activity FOREIGN KEY (activity_id)
REFERENCES activity(id) ON DELETE CASCADE;

ALTER TABLE message
ADD CONSTRAINT fk_message_conversation FOREIGN KEY (conversation_id)
REFERENCES conversation(id) ON DELETE CASCADE;

ALTER TABLE message
ADD CONSTRAINT fk_message_user FOREIGN KEY (user_id)
REFERENCES users(id) ON DELETE CASCADE;
