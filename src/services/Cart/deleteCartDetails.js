import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/cart/remove`;
console.log("apiEndpoint", apiEndpoint);

export function removeItemFromCart(obj) {
  console.log(obj);
  return httpService.post(apiEndpoint, obj, { withCredentials: true });
}
export default {
  removeItemFromCart,
};
