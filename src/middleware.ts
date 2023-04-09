import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Set the paths that don't require the user to be signed in
const publicPaths = ['/api/trpc*', '/sign-in*', '/sign-up*'];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);
  console.log(`[Middleware] ${request.nextUrl.pathname} userID=`, userId);

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts

    // const signInUrl = new URL('/sign-in', request.url);
    // signInUrl.searchParams.set('redirect_url', request.url);
    // return NextResponse.redirect(signInUrl);
    console.log(
      'fuck, user should see this page, we should redirect him - TODO',
    );
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
