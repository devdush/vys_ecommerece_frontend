import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/category/get`;

export function getCategories() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
