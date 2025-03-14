import { toast } from "react-toastify";
import { getProductsByCategory } from "../../services/product/getProductByCategory";

export const getProductsByFilter = (obj) => {
  return async (dispatch) => {
    const id = `${obj.id}?brand=${obj.brand}&priceMin=${obj.minPrice}&priceMax=${obj.maxPrice}`;
    try {
      const response = await getProductsByCategory(id);
      console.log("response in pro ac", response);
      const products = response.data.data;
      if (response?.data?.success) {
        dispatch({
          type: "PRODUCTS_BY_FILTER",
          products: products,
        });
      } else {
        dispatch({
          type: "PRODUCTS_BY_FILTER",
          products: null,
        });
      }
    } catch (error) {
      console.log("error");
      console.log(error);
      toast.error("Network error: Unable to reach the server.");
    }
  };
};
