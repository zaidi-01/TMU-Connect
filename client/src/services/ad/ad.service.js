import { AdDetails } from "@/models";
import axios, { AxiosResponse } from "axios";

// TODO: Use HTTP service once it's implemented.
const http = axios.create({
  baseURL: "/api/ad",
});

/**
 * Create an ad.
 * @param {AdDetails} ad
 * @returns {Promise<AdDetails>}
 */
export async function createAd(ad) {
  /** @type {AxiosResponse<AdDetails>} */
  const response = await http.post("/", ad);
  return response.data;
}

/**
 * Update an ad.
 * @param {AdDetails} ad
 * @returns {Promise<AdDetails>}
 */
export async function updateAd(ad) {
  /** @type {AxiosResponse<AdDetails>} */
  const response = await http.put(`/${ad.id}`, ad);
  return response.data;
}

/**
 * Delete an ad.
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function deleteAd(id) {
  await http.delete(`/${id}`);
}

/**
 * Get an ad by ID.
 * @param {number} id
 * @returns {Promise<AdDetails>}
 */
export async function getAdById(id) {
  /** @type {AxiosResponse<AdDetails>} */
  const response = await http.get(`/${id}`);
  return response.data;
}
