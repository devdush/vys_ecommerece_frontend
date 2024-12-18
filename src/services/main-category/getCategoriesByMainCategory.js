import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/main-category/get-categories`;

export function getCategoriesByMainCategory(id) {

    
  return httpService.get(`${apiEndpoint}/${id}`, {
    withCredentials: true,
  });
}
