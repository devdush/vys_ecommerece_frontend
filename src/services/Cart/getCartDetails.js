import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/cart/get`;

export function getCart(userId) {
    console.log("GetCartData called", userId);
  return httpService.get(`${apiEndpoint}/${userId}`, {
    withCredentials: true,
  });
}
