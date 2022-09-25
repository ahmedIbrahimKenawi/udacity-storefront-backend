CREATE TABLE category (
    category_id serial primary key,
    name varchar(100) not null unique
);


INSERT INTO category (name)
VALUES 
('clothes'),
('electronics'), 
('tools');