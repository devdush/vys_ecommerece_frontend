import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/category/delete`;

export function deleteCategory(id) {

  return httpService.delete(
    `${apiEndpoint}/${id}`,
    { withCredentials: true }
  );
}
export default {
  deleteCategory,
};
