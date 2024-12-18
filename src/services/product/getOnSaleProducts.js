import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get/onSale`;

export function getOnSaleProducts() {
  return httpService.get(apiEndpoint, {
    withCredentials: true,
  });
}
