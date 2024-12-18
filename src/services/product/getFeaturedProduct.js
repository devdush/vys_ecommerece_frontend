import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get/featured`;

export function getFeaturedProducts() {

  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
