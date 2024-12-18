import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/warranty/add`;

export function addWarranty(obj) {
  console.log(apiEndpoint);

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
