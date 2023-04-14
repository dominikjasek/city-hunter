import {
  SignJWT,
  jwtVerify,
  type JWTPayload,
  importSPKI,
  createRemoteJWKSet,
} from 'jose';
import { requireAuth } from '@clerk/nextjs/edge-middleware';
import * as process from 'process';

type JWTUser = JWTPayload & {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  metadata?: {
    role: 'admin';
  };
};

// export async function sign(payload: Token, secret: string): Promise<string> {
//   const iat = Math.floor(Date.now() / 1000);
//   const exp = iat + 60 * 60; // one hour
//
//   return new SignJWT({ ...payload })
//     .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
//     .setExpirationTime(exp)
//     .setIssuedAt(iat)
//     .setNotBefore(iat)
//     .sign(new TextEncoder().encode(secret));
// }
const JWKS = createRemoteJWKSet(new URL(process.env.CLERK_JWK_URI as string));

export async function verify(token: string): Promise<JWTUser> {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: process.env.CLERK_ISSUER,
  });
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  // return null;
  return payload as JWTUser;
}
