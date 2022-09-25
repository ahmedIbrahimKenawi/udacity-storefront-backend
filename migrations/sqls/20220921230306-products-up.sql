CREATE TABLE products ( 
    product_id serial primary key, 
    name varchar(100) not null unique, 
    price numeric not null, 
    category_id int not null,
    foreign key (category_id) references category(category_id) 
);
