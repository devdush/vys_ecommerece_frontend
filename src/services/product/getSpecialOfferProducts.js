import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get/special`;

export function getSpecialOfferProducts() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
