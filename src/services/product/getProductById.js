import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get`;

export function getProductsById(id) {
  return httpService.get(`${apiEndpoint}/${id}`, {
    withCredentials: true,
  });
}
