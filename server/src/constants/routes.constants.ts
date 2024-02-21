const AD_ROUTE = "/ad";
const AUTH_ROUTE = "/auth";
const USER_ROUTE = "/user";

const AD_ROUTES = {
  ROOT: "/",
};
const AUTH_ROUTES = {
  ROOT: "/",
};
const USER_ROUTES = {
  ROOT: "/",
};

export const ROUTES = {
  AD: generateAbsoluteRoutes(AD_ROUTE, AD_ROUTES),
  AUTH: generateAbsoluteRoutes(AUTH_ROUTE, AUTH_ROUTES),
  USER: generateAbsoluteRoutes(USER_ROUTE, USER_ROUTES),
};

export const RELATIVE_ROUTES = {
  AD: AD_ROUTES,
};

function generateAbsoluteRoutes<T extends Record<string, string>>(
  route: string,
  routes: T
) {
  return Object.fromEntries(
    Object.entries(routes).map(([key, value]) => [key, `${route}${value}`])
  ) as T;
}
