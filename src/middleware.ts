import { clerkClient, getAuth, withClerkMiddleware } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const adminRoutes = ['/admin**'];

const protectedRoutes = ['/play**', '/auth/user', '/auth/login-receiver'];

const createRouteGuard = (routes: string[]) => (path: string) => {
  return routes.find((x) => path.match(new RegExp(`^${x}$`.replace('*$', '($|/)'))));
};

const isAdminRoute = createRouteGuard(adminRoutes);
const isProtectedRoute = createRouteGuard(protectedRoutes);

export default withClerkMiddleware(async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (isAdminRoute(pathname)) {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    const user = await clerkClient.users.getUser(userId);
    if (user.publicMetadata.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } else if (isProtectedRoute(pathname)) {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next({
    request,
  });
});

export const config = {
  matcher: '/((?!_next/image|_next/static|favicon.ico).*)',
};
