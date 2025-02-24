import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/cart/add`;

export function addToCartService (obj) {
  return httpService.post(apiEndpoint, obj, { withCredentials: true });
}
export default {
  addToCartService ,
};
