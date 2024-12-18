import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/warranty/get`;

export function getWarranty() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
