import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/auth/login`;

export function loginUser(obj) {

  return httpService.post(
    apiEndpoint,
    {
      email: obj.email,
      password: obj.password,
    },

  );
}
export default {
  loginUser,
};
