import type { Config } from 'drizzle-kit';
import 'dotenv/config';

const config = {
  out: './migrations',
  schema: './src/db/schema.ts',
  connectionString: process.env.DATABASE_URL,
} satisfies Config

export default config;
