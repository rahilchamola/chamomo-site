import { defineMiddleware } from "astro:middleware";

const SITE_PASSWORD = import.meta.env.SITE_PASSWORD || "chamomo2026";
const COOKIE_NAME = "site_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies } = context;

  // Allow static assets
  const staticExts = [".css", ".js", ".svg", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".webp", ".avif"];
  if (staticExts.some(ext => url.pathname.endsWith(ext))) {
    return next();
  }

  // Check for password in query param (GET-based login)
  const passwordAttempt = url.searchParams.get("password");
  if (passwordAttempt) {
    if (passwordAttempt === SITE_PASSWORD) {
      cookies.set(COOKIE_NAME, "authenticated", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
        httpOnly: true,
        sameSite: "lax",
        secure: url.protocol === "https:",
      });
      return context.redirect("/", 302);
    }
    // Wrong password — go to login with error
    return context.redirect("/login?error=1", 302);
  }

  // Already authenticated — proceed
  const authCookie = cookies.get(COOKIE_NAME);
  if (authCookie?.value === "authenticated") {
    return next();
  }

  // Login page itself — always allow
  if (url.pathname === "/login" || url.pathname === "/login/") {
    return next();
  }

  // Not authenticated — redirect to login
  return context.redirect("/login", 302);
});
