CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE DATABASE stcc-db;

CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE todo(
  todo_id SERIAL,
  user_id UUID ,
  description VARCHAR(255),
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);


INSERT INTO users (user_name, user_email, user_password) VALUES ('henry', 'henryly213@gmail.com', 'kthl8822');

INSERT INTO "users" ("id", "userName", "email", "password", "createdAt", "updatedAt") VALUES ('c42b0866-44bf-4141-a73b-061f85be71aa','Juan', 'jvazquez2098@gmail.com', '123456', '2016-06-23', '2016-06-23 00:00:00-05');