import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/get-products`;

export function getProductsByCategory(id) {
    console.log("s",id);
    
  return httpService.get(`${apiEndpoint}/${id}`, {
    withCredentials: true,
  });
}
