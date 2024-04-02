import axios from "axios";
import { RegisterDto } from "./models";

// TODO: Use HTTP service once it's implemented.
axios.defaults.baseURL = "/api/auth";

/**
 * Logs in a user.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise} The response data.
 */
export const login = async (email, password) => {
  const response = await axios.post("/login", { email, password });
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
  const response = await axios.post(
    "/register",
    new RegisterDto(name, email, password)
  );
  return response.data;
};

// TODO: Implement logout.
