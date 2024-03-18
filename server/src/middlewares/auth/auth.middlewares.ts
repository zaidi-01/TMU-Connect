import { Role, User } from "@prisma/client";
import passport from "passport";

/**
 * Access levels for each role
 */
const accessLevels: Record<Role, number> = {
  [Role.USER]: 0,
  [Role.ADMIN]: 1,
};

/**
 * Middleware to authenticate requests
 * @param strategy The strategy to use for authentication
 * @returns
 */
export function authenticate(strategy: "jwt" | "local" = "jwt") {
  return passport.authenticate(strategy, { session: false });
}

/**
 * Middleware to allow access to certain routes based on role
 * @param role The role to allow access and above
 */
export function allow(role: Role) {
  return (req: any, res: any, next: any) => {
    if (accessLevels[(req.user as User).role] < accessLevels[role]) {
      res.status(403).send("Forbidden");
      return;
    }

    next();
  };
}
