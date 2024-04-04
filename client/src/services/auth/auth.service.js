import axios from "axios";
import { BehaviorSubject, distinctUntilChanged } from "rxjs";
import { RegisterDto } from "./models";

// TODO: Use HTTP service once it's implemented.
const http = axios.create({
  baseURL: "/api/auth",
});

const _isAuthenticated$ = new BehaviorSubject(false);
export const isAuthenticated$ = _isAuthenticated$
  .asObservable()
  .pipe(distinctUntilChanged());

/**
 * Checks if a user is authenticated.
 * @returns {Promise<boolean>} True if the user is authenticated, false otherwise.
 */
export const isAuthenticated = async () => {
  try {
    await http.get("/");
    _isAuthenticated$.next(true);
    return true;
  } catch {
    _isAuthenticated$.next(false);
    return false;
  }
};

/**
 * Logs in a user.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise} The response data.
 */
export const login = async (email, password) => {
  const response = await http.post("/login", { email, password });
  return response.data;
};

/**
 * Registers a user.
 * @param {string} name The user's name.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise} The response data.
 */
export const register = async (name, email, password) => {
  const response = await http.post(
    "/register",
    new RegisterDto(name, email, password)
  );
  return response.data;
};

/**
 * Logs out a user.
 * @returns {Promise} Fulfills when the user is logged out, rejects otherwise.
 */
export const logout = async () => {
  return new Promise((resolve, reject) => {
    http
      .post("/logout")
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};
