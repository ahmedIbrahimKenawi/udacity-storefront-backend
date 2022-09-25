# API Requirements

> The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

> These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### /users

- `POST /users/login` - LOGIN user
- `POST /users/signup` - CREATE user
- `GET /users` - READ all users [token required]
- `GET /users/id/:user_id` - READ specific user by id [token required]

### /products

- `GET /products` - READ all products
- `POST /products` - CREATE product [token required]
- `PUT /products` - CHANGE price of a product [token required]
- `DELETE /products` - DELETE product by product name [token required]
- `GET /products/:product` - READ specific product by product name
- `GET /products/category/:category ` - READ all product in category

### /orders

- `POST /orders` - CREATE orders [token required]
- `GET /orders/:user_id` - READ orders by user id [token required]
- `GET /orders/order_id/:order_id` - READ orders by order id [token required]
- `POST /orders/order_id/:order_id/addproduct` - ADD product to an order [token required
- `GET /orders/order_id/:order_id/product` - READ products in an order by order_id

## Data Shapes

#### Users

- user_id
- first_name
- last_name
- email
- password
- role

#### Category

- category_id
- name

#### Products

- product_id
- name
- price
- category_id `[foreign key references category table]`

#### Orders

- order_id
- user_id
- status `(active, complete, cancelled) default:active`

#### Order_Products

- id,
- order_id `[foreign key references orders table]`
- product_id `[foreign key references producs table]`
- quantity

### Database Schema

### Table "public.users"

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email text not null unique,
    password text not null,
    role varchar(30) not null default 'user',
    UNIQUE (first_name, last_name)
);
```

### Table "public.category"

```sql
CREATE TABLE category (
    category_id serial primary key,
    name varchar(100) not null unique
);
```

### Table "public.products"

```sql
CREATE TABLE products (
    product_id serial primary key,
    name varchar(100) not null unique,
    price numeric not null,
    category_id int not null,
    foreign key (category_id) references category(category_id)
);
```

### Table "public.orders"

```sql
CREATE TABLE orders (
    order_id serial primary key,
    user_id int not null,
    status varchar(100) not null default 'active' check (status in ('active',  'complete' ,'cancelled'))
);
```

### Table "public.order_products"

```sql
CREATE TABLE order_products (
    id serial primary key,
    order_id int references orders(order_id),
    product_id int references products(product_id),
    quantity int not null
);
```
