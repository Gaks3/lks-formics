import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/submit/:path*'],
  ignoredRoutes: ['/submit/:path*'],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
