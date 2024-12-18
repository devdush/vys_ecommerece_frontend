import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/category/add`;

export function addCategory(obj) {
  return httpService.post(apiEndpoint, obj, { withCredentials: true });
}
export default {
  addCategory,
};
