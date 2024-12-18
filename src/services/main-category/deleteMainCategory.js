import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/main-category/delete`;

export function deleteMainCategory(id) {

  return httpService.delete(
    `${apiEndpoint}/${id}`,
    { withCredentials: true }
  );
}
export default {
  deleteMainCategory,
};
