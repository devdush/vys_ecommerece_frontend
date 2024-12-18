import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/auth/register`;

export function registerUser(obj) {
  return httpService.post(
    apiEndpoint,
    {
      firstName: obj.firstName,
      lastName: obj.lastName,
      email: obj.email,
      primaryPhoneNumber: obj.primaryPhoneNumber,
      secondaryPhoneNumber: obj.secondaryPhoneNumber,
      password: obj.password,
    },
    { withCredentials: true }
  );
}
export default {
  registerUser,
};
