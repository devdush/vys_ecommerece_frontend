import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get`;

export function getProducts() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
