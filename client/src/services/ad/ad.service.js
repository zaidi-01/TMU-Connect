import { AdDetails, AdFilterOptions, AdSortOptions } from "@/models";
import axios, { AxiosResponse } from "axios";

// TODO: Add DTOs

// TODO: Use HTTP service once it's implemented.
const http = axios.create({
  baseURL: "/api/ad",
});

/**
 * Create an ad.
 * @param {AdDetails} ad Ad to create.
 * @returns {Promise<AdDetails>} Created ad.
 */
export async function createAd(ad) {
  /** @type {AxiosResponse<AdDetails>} */
  const response = await http.post("/", ad);
  return response.data;
}

/**
 * Update an ad.
 * @param {AdDetails} ad Ad to update.
 * @returns {Promise<AdDetails>} Updated ad.
 */
export async function updateAd(ad) {
  /** @type {AxiosResponse<AdDetails>} */
  const response = await http.put(`/${ad.id}`, ad);
  return response.data;
}

/**
 * Delete an ad.
 * @param {number} id Ad ID.
 * @returns {Promise<void>} Empty promise.
 */
export async function deleteAd(id) {
  await http.delete(`/${id}`);
}

/**
 * Get an ad by ID.
 * @param {number} id Ad ID.
 * @returns {Promise<AdDetails>} Ad details.
 */
export async function getAdById(id) {
  /** @type {AxiosResponse<AdDetails>} */
  const response = await http.get(`/${id}`);
  return response.data;
}

/**
 * Get ads.
 * @param {number} take Number of ads to take.
 * @param {number} skip Number of ads to skip.
 * @param {AdFilterOptions} filterOptions Filter options.
 * @param {AdSortOptions} sortOptions Sort options.
 * @returns {Promise<AdDetails[]>} List of ads.
 */
export async function getAds(take, skip, filterOptions, sortOptions) {
  /** @type {AxiosResponse<AdDetails[]>} */
  const response = await http.get("/", {
    params: {
      take,
      skip,
      filterOptions,
      sortOptions,
    },
  });
  return response.data;
}
