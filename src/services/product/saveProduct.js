import apiConfig from "../../config.json";
import httpService from "../httpService";

const apiEndpoint = `${apiConfig.apiURL}/api/product/add`;

export function addProduct(obj) {
  const test = {
    itemCode: obj.itemCode,
    itemName: obj.productTitle,
    onHand: obj.stock,
    sales_price: obj.sellPrice,
    colors: obj.colors,
    shortDescription: obj.shortDesValue,
    oldPrice: obj.oldPrice,
    SKU: obj.sku,
    Specification: obj.specValue,
    featured: obj.featuredProduct,
    onSale: obj.onSale,
    topRated: obj.topRated,
    specialOffers: obj.specialOffers,
    defaultImage: obj.defaultImage,
    otherImages: obj.otherImages,
    categoryId: obj.category,
    brandId: obj.brand,
    warrantyId: obj.warranty,
  };

  return httpService.post(apiEndpoint, test, { withCredentials: true });
}
export default {
  addProduct,
};
