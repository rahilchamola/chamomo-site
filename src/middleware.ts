import { defineMiddleware } from "astro:middleware";

const SITE_PASSWORD = import.meta.env.SITE_PASSWORD || "chamomo2026";
const COOKIE_NAME = "site_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, request } = context;

  // Always allow the login page and its POST
  if (url.pathname === "/login" || url.pathname === "/login/") {
    // Handle POST (password submission)
    if (request.method === "POST") {
      const formData = await request.formData();
      const password = formData.get("password")?.toString() || "";

      if (password === SITE_PASSWORD) {
        // Set auth cookie and redirect to home
        cookies.set(COOKIE_NAME, "authenticated", {
          path: "/",
          maxAge: COOKIE_MAX_AGE,
          httpOnly: true,
          sameSite: "lax",
          secure: url.protocol === "https:",
        });
        return context.redirect("/", 302);
      }

      // Wrong password — redirect back to login with error
      return context.redirect("/login?error=1", 302);
    }

    // GET request to login page — render it
    return next();
  }

  // Allow static assets (images, CSS, JS, fonts)
  const staticExts = [".css", ".js", ".svg", ".png", ".jpg", ".jpeg", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".webp", ".avif"];
  if (staticExts.some(ext => url.pathname.endsWith(ext))) {
    return next();
  }

  // Check if authenticated
  const authCookie = cookies.get(COOKIE_NAME);
  if (authCookie?.value === "authenticated") {
    return next();
  }

  // Not authenticated — redirect to login
  return context.redirect("/login", 302);
});
