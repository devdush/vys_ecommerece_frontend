import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/auth/check_auth`;

export function checkUserAuth(token) {
  console.log("sa", token);

  return httpService.get(apiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-store,no-cache, must-revalidate,proxy-validate",
    },
  });
}
