import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/delete`;

export function deleteProduct(id) {
 
  return httpService.delete(`${apiEndpoint}/${id}`, { withCredentials: true });
}
export default {
  deleteProduct,
};
