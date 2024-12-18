import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/main-category/get`;

export function getMainCategory() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
