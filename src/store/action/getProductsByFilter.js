import { toast } from "react-toastify";
import { getProductsByCategory } from "../../services/product/getProductByCategory";

export const getProductsByFilter = (obj) => {
  return async (dispatch) => {
    const id = `${obj.id}?brand=${obj.brand}&priceMin=${obj.minPrice}&priceMax=${obj.maxPrice}`;
    try {
      const response = await getProductsByCategory(id);
      const products = response?.data?.data || [];
   
      dispatch({
        type: "PRODUCTS_BY_FILTER",
        products: products,
      });
    } catch (error) {
      console.log("error", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        toast.error(
          `Error: ${error.response.data.message || "Something went wrong!"}`
        );
      }

      // Clear products on error as well (optional)
      dispatch({
        type: "PRODUCTS_BY_FILTER",
        products: [],
      });
    }
  };
};
