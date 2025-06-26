// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

console.log("✅ Clerk middleware running");

export default authMiddleware({
  publicRoutes: [
    '/',
    '/public', 
    '/sign-in(.*)', 
    '/sign-up(.*)',
    '/searchwithresults(.*)'
  ],
  ignoredRoutes: [
    '/api/webhook(.*)' // 🔥 Esto ignora todos los webhooks y los deja pasar
  ]
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};