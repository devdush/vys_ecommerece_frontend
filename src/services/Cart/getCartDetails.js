import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/cart/get`;

export function getCart(userId) {
   
  return httpService.get(`${apiEndpoint}/${userId}`, {
    withCredentials: true,
  });
}
