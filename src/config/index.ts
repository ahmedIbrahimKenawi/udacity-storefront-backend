import * as dotenv from "dotenv";

const config = dotenv.config();

// This error should crash whole process
if (config.error) {
  throw new Error("::: Couldn't find .env file  :::");
}

// expose configuration from .env
export const {
  PORT,
  HOST,
  MODE,
  POSTGRES_HOST,
  POSTGRES_DEV_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  pepper,
  saltRound,
  TOKEN_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
} = process.env;
