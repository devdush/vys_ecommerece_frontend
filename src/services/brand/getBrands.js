import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/brand/get`;

export function getBrands() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
