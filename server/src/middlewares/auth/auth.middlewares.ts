import { UserRole, User } from "@prisma/client";
import passport from "passport";

/**
 * Access levels for each UserRole
 */
const accessLevels: Record<UserRole, number> = {
  [UserRole.USER]: 0,
  [UserRole.ADMIN]: 1,
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
 * Middleware to allow access to certain routes based on UserRole
 * @param UserRole The UserRole to allow access and above
 */
export function allow(role: UserRole) {
  return (req: any, res: any, next: any) => {
    if (accessLevels[(req.user as User).role] < accessLevels[role]) {
      res.status(403).send("Forbidden");
      return;
    }

    next();
  };
}
