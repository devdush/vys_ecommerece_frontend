import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get/topRated`;

export function getTopRatedProducts() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
