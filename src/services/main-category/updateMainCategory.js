import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/main-category/edit`;

export function updateMainCategory(obj, id) {
  const test = `${apiEndpoint}/${id}`;
  console.log(obj);

  return httpService.put(
    test,
    {
      title: obj.title,
    },
    { withCredentials: true }
  );
}
export default {
  updateMainCategory,
};
