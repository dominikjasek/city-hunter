import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/dist/api';
import { getAuth } from '@clerk/nextjs/server';

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export const createContextInner = async ({ auth }: AuthContext) => {
  return {
    auth,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: trpcNext.CreateNextContextOptions): Promise<Context> {
  return await createContextInner({ auth: getAuth(opts.req) });
}
