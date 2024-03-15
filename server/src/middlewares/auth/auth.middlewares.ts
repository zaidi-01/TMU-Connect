import passport from "passport";

/**
 * Middleware to authenticate requests
 * @param strategy The strategy to use for authentication
 * @returns
 */
export function authenticate(strategy: "jwt" | "local" = "jwt") {
  return passport.authenticate(strategy, { session: false });
}
