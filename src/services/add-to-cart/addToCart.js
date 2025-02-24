import { GetCartData } from "../../store/action/cart";
import { addToCartService } from "./addtoCartServices";
import { useDispatch } from "react-redux";
const addToCart = async (itemId, quantityToAdd) => {
  try {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.id) {
        const userID = parsedUser.id;
        const cartItem = {
          userId: userID,
          productId: itemId,
          quantity: quantityToAdd,
        };
        console.log("Adding to cart:", cartItem);

        const response = await addToCartService(cartItem);
    
      } else {
        console.error("User ID is missing");
        window.location.href = "/auth/login"; // Navigate to login page
      }
    } else {
      console.error("User not found in session storage");
      window.location.href = "/auth/login"; // Navigate to login page
    }
  } catch (error) {
    console.log(error);
  }
};
export default addToCart;
