// Base rooute for the API
const BASE_ROUTE = process.env.NODE_ENV === "production" ? "/api" : "";

// Base routes for the application
const AD_ROUTE = `${BASE_ROUTE}/ad`;
const AUTH_ROUTE = `${BASE_ROUTE}/auth`;
const DOCS_ROUTE = `${BASE_ROUTE}/docs`;
const USER_ROUTE = `${BASE_ROUTE}/user`;
const UPLOADS_ROUTE = "/uploads";
const WS_ROUTE = `${BASE_ROUTE}/ws`;

const AD_ROUTES = {
  BASE: "/",
  CREATE: "/",
  UPDATE: "/:id",
  DELETE: "/:id",
  DETAILS: "/:id",
  SEARCH: "/search",
};
const AUTH_ROUTES = {
  BASE: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  LOGOUT: "/logout",
};
const DOCS_ROUTES = {
  BASE: "/",
};
const USER_ROUTES = {
  BASE: "/",
  DELETE: "/:id",
  SEARCH: "/search",
  UPDATE_ROLE: "/:id/role",
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
  DOCS_ROUTE: generateAbsoluteRoutes(DOCS_ROUTE, DOCS_ROUTES),
  USER: generateAbsoluteRoutes(USER_ROUTE, USER_ROUTES),
};

/**
 * Relative routes for the application.
 */
export const RELATIVE_ROUTES = {
  AD: AD_ROUTES,
  AUTH: AUTH_ROUTES,
  DOCS: DOCS_ROUTES,
  USER: USER_ROUTES,
  UPLOADS: UPLOADS_ROUTE,
  WS: WS_ROUTE,
};
