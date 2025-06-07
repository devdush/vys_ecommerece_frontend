import { toast } from "react-toastify";
import { getCart } from "../../services/Cart/getCartDetails";

export const GetCartData = (userId) => {
    return async (dispatch) => {
      if (!userId) {
        //toast.error("User ID is missing");
        return;
      }
  
      try {
        const response = await getCart(userId);
        if (response?.data?.success) {
          const cart = response.data.data ? response.data.data : []; // Ensure empty cart if no items
          
          dispatch({
            type: "CART_DATA",
            cart: cart.items,
            totalPrice: response.data.data.totalPrice || 0, // Ensure totalPrice is 0 when cart is empty
          });
  
          toast.success(response.data.message);
        } else {
          dispatch({
            type: "CART_DATA",
            cart: [],
            totalPrice: 0,
          });
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
  
        if (error.response?.status === 404) {
          dispatch({
            type: "CART_DATA",
            cart: [],
            totalPrice: 0,
          });
          //toast.info("Your cart is empty."); // Show user-friendly message
        } else {
          toast.error("Network error: Unable to reach the server.");
        }
      }
    };
  };
  