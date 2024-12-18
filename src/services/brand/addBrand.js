import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/brand/add`;

export function addBrand(obj) {
  console.log(apiEndpoint);

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
