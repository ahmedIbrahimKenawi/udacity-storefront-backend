import { QueryResult } from "pg";
import { Client } from "./database";

async function pg_query(
  sql: string,
  params: Array<string | number> = []
): Promise<QueryResult> {
  const connection = await Client.connect();
  const result = await connection.query(sql, params);
  connection.release();
  return result;
}

export { pg_query };
