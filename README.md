# Udacity: Build A Storefront Backend

This is a the backend for an online store. It exposes a RESTful API.

For database schema and and endpoint information, read [REQUIREMENT.md](REQUIREMENTS.md).

## prerequisite

- [Node.js : ^ v16.17.1](https://nodejs.org/en/download/)
- [PostgreSQL : ^ 14.5](https://www.postgresql.org/download/)

## setup database

### 1. start PostgreSQL

```shell
$ sudo -i -u postgres
$ psql
```

### 2. In psql run the following to create a user

```shell
$ CREATE ROLE store_admin CREATEDB LOGIN ENCRYPTED PASSWORD 'admin123';
```

### 3. In psql run the following to create the dev and test database seting DATABASE OWNER = store_admin

```shell
$ CREATE DATABASE store_prod OWNER = store_admin;
$ CREATE DATABASE store_test OWNER = store_admin;
```

## Enviromental Variables Set up

- **create `.env` file in the root directory of project**
- Bellow are the environmental variables that needs to be set in a `.env` file.
- **NB:** The given values are used in developement and testing but not in production.

```shell
# during test, change MODE to be 'test'
MODE = prod

# seting PORT for node server
PORT = 8765
HOST = "127.0.0.1"

# PostgreSQL
# port of backend / database
POSTGRES_PORT = 5432
POSTGRES_HOST = 127.0.0.1
POSTGRES_USER = store_admin
POSTGRES_PASSWORD = admin123
POSTGRES_PROD_DB = store_prod
POSTGRES_TEST_DB = store_test

# using the following variables and db-migarte we create admin
ADMIN_EMAIL = adam@store.com
ADMIN_PASSWORD = adam123
ADMIN_FIRST_NAME = adam
ADMIN_LAST_NAME = john

# password encryption
saltRound = 10
pepper = CKzL2+pC!BCm@Ut5M*DxAD4RI<F9Whwn

# JWT
TOKEN_SECRET = E%Xc~gd+^BKcPZbwucuT>!ndh5td-URp
```

## Clone the project

```shell
git clone https://github.com/ahmedIbrahimKenawi/udacity-storefront-backend.git
```

## install dependencies

#### devDependencies

- db-migrate
- db-migrate-pg
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- jasmine
- jasmine-spec-reporter
- nodemon
- prettier
- ts-node
- typescript

#### dependencies

- bcryptjs
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- pg

```shell
npm install
```

## formating and linting

```shell
npm run format
npm run lint
```

## testing

```shell
npm run test
```

> **under the hood of test script there are three commads run**\
> `db-migrate --env test reset`,\
> `db-migrate --env test up`, \
> `env MODE=test npm run jasmine`

## setup database for production

```shell
npm run db-prod-up
```

## Run typescript compiler to build the servder:

```shell
npm run build
```

## Run the server.

**make sure to set MODE = prod in `.env` file**

```shell
npm start
```
