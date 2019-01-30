import axios from "axios";

const api = axios.create({
  headers: { Accepts: "application/json" }
});

/**
 * Handle standard api wrapping
 * @param {import("axios").AxiosResponse} response
 */
function handle(response) {
  if (response && response.data) {
    return response.data;
  }
}

/**
 * POST to a URL
 * @param {string} url
 * @param {*=} data
 * @param {import("axios").AxiosRequestConfig=} opts
 */
export function POST(url, data, opts) {
  return api.post(url, data, opts).then(handle);
}

/**
 * GET a URL
 * @param {string} url
 * @param {import("axios").AxiosRequestConfig=} opts
 */
export function GET(url, opts) {
  return api.get(url, opts).then(handle);
}

/**
 * PUT to a URL
 * @param {string} url
 * @param {*=} data
 * @param {import("axios").AxiosRequestConfig=} opts
 */
export function PUT(url, data, opts) {
  return api.put(url, data, opts).then(handle);
}

/**
 * DELETE to a URL
 * @param {string} url
 * @param {import("axios").AxiosRequestConfig=} opts
 */
export function DELETE(url, opts) {
  return api.delete(url, opts).then(handle);
}
