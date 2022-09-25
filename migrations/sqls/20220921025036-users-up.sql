CREATE TABLE users (
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    user_id SERIAL PRIMARY KEY,
    email text not null unique,
    password text not null,
    role varchar(30) not null default 'user',
    UNIQUE (first_name, last_name)
);

