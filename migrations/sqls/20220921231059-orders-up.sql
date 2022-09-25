CREATE TABLE orders (
    order_id serial primary key,
    user_id int not null,
    status varchar(100) not null default 'active' check (status in ('active',  'complete' ,'cancelled')) 
);