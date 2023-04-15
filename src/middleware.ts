import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set the paths that don't require the user to be signed in
const publicPaths = ['/', '/api/trpc*', '/login'];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)',
  ],
};
