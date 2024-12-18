import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/auth/logout`;

export function logoutUser(obj) {
  return httpService.post(
    apiEndpoint,

    { withCredentials: true }
  );
}
export default {
  logoutUser,
};
