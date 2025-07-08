import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "~/server/db/schema";

export const useDB = () => {
  const { databaseUrl } = useRuntimeConfig();
  const connection = mysql.createPool({ uri: databaseUrl });
  return drizzle(connection, { schema, mode: "default" });
}; 