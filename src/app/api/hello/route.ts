import { drizzle } from 'drizzle-orm/planetscale-serverless';

import { connect } from '@planetscale/database';
import {users} from "@/db/schema";

// create the connection
const connection = connect({
  url: process.env['DATABASE_URL'],
});

const db = drizzle(connection);

export const config = {
  runtime: 'edge',
}

export async function GET(request: Request) {
  const allUsers = await db.select().from(users);
  console.log("allUsers", allUsers)
  return new Response(`Hello, Next.js! ${allUsers[0].id}`, )
}
