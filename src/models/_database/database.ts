import {
  POSTGRES_HOST,
  POSTGRES_TEST_DB,
  POSTGRES_PROD_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  MODE,
} from "../../config";

import { Pool } from "pg";

let POSTGRES_DB;

if (MODE == "prod") POSTGRES_DB = POSTGRES_PROD_DB;
if (MODE == "test") POSTGRES_DB = POSTGRES_TEST_DB;


const Client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export { Client };
