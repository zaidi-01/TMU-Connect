// Base routes for the application.
const AD_ROUTE = "/ad";
const AUTH_ROUTE = "/auth";
const USER_ROUTE = "/user";

const AD_ROUTES = {
  ROOT: "/",
};
const AUTH_ROUTES = {
  ROOT: "/",
  REGISTER: "/register",
  LOGIN: "/login",
};
const USER_ROUTES = {
  ROOT: "/",
};

/**
 * Generates absolute routes by combining the base route with the provided routes.
 * @param route The base route.
 * @param routes The routes to be combined with the base route.
 * @returns An object containing the combined routes.
 */
function generateAbsoluteRoutes<T extends Record<string, string>>(
  route: string,
  routes: T
) {
  return Object.fromEntries(
    Object.entries(routes).map(([key, value]) => [key, `${route}${value}`])
  ) as T;
}

/**
 * Absolute routes for the application.
 */
export const ROUTES = {
  AD: generateAbsoluteRoutes(AD_ROUTE, AD_ROUTES),
  AUTH: generateAbsoluteRoutes(AUTH_ROUTE, AUTH_ROUTES),
  USER: generateAbsoluteRoutes(USER_ROUTE, USER_ROUTES),
};

/**
 * Relative routes for the application.
 */
export const RELATIVE_ROUTES = {
  AD: AD_ROUTES,
  AUTH: AUTH_ROUTES,
  USER: USER_ROUTES,
};
