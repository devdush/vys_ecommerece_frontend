import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = "https://erpcl.net/GR12/VYSI/VYIN/v1_/Api/getItemDetails";

export function getDataFromERP() {
  return httpService.get(apiEndpoint);
}
