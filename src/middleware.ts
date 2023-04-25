import {
  clerkClient,
  getAuth,
  withClerkMiddleware,
} from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PublicMetadata } from '~/utils/clerk/types';

const adminRoutes = ['/contribute'];

const protectedRoutes = ['/play', '/user'];

const createRouteGuard = (routes: string[]) => (path: string) => {
  return routes.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))),
  );
};

const isAdminRoute = createRouteGuard(adminRoutes);
const isProtectedRoute = createRouteGuard(protectedRoutes);

export default withClerkMiddleware(async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (isAdminRoute(pathname)) {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      const user = await clerkClient.users.getUser(userId);
      if ((user?.publicMetadata as PublicMetadata).role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  } else if (isProtectedRoute(pathname)) {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next({
    request,
  });
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
