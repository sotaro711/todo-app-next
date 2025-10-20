import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

interface Database {
  todos: {
    id: number;
    text: string;
    done: boolean;
  };
}

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});
