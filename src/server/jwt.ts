import { createRemoteJWKSet, type JWTPayload, jwtVerify } from 'jose';

type JWTUser = JWTPayload & {
  userId: string;
  firstName: string | null;
  lastName: string | null;
};

const JWKS = createRemoteJWKSet(new URL(process.env.CLERK_JWK_URI as string));

export async function verify(token: string): Promise<JWTUser> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: process.env.CLERK_ISSUER,
  });
  return payload as JWTUser;
}
