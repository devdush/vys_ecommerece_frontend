import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/brand/add`;

export function addBrand(obj) {
 
  return httpService.post(
    apiEndpoint,
    {
      brandTitle: obj.brandTitle,
      imageUrl: "",
    },
    { withCredentials: true }
  );
}
export default {
  addBrand,
};
