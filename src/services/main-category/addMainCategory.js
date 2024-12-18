import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/main-category/add`;

export function addMainCategory(obj) {
  return httpService.post(
    apiEndpoint,
    {
      title: obj.title,
    },
    { withCredentials: true }
  );
}
export default {
  addMainCategory,
};
