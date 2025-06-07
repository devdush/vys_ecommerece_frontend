import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/cart/remove`;

export function removeItemFromCart(obj) {

  return httpService.post(apiEndpoint, obj, { withCredentials: true });
}
export default {
  removeItemFromCart,
};
