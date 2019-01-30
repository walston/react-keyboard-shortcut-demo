import { GET } from "./api";

/**
 * @returns {Promise<{name}>}
 */
export const getUser = () =>
  GET("https://randomuser.me/api/?inc=name").then(data => data.results[0]);
