import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/warranty/add`;

export function addWarranty(obj) {

  return httpService.post(
    apiEndpoint,
    {
      duration: obj.duration,
      imageUrl: obj.imageUrl,
    },
    { withCredentials: true }
  );
}
export default {
  addWarranty,
};
