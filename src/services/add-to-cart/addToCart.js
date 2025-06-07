import { toast } from "react-toastify";
import { GetCartData } from "../../store/action/cart";
import { addToCartService } from "./addtoCartServices";
import { useDispatch } from "react-redux";
const addToCart = async (itemId, quantityToAdd, onHand) => {
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
        const response = await addToCartService(cartItem);

        if (response?.status === 200) {
          toast.success("Item successfully added to the cart");
        } else {
          toast.error(response.data.message);
        }
      } else {
        console.error("User ID is missing");
        window.location.href = "/auth/login"; // Navigate to login page
      }
    } else {
      console.error("User not found in session storage");
      window.location.href = "/auth/login"; // Navigate to login page
    }
  } catch (error) {
    toast.error(`Can't add to cart.Only ${onHand} items are available.`);
  }
};
export default addToCart;
