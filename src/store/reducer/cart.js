// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
//   totalPrice: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     setCartData: (state, action) => {
//       state.cart = action.payload;
//       state.totalPrice = action.payload.reduce(
//         (total, item) => total + item.sales_price * item.quantity,
//         0
//       );
//     },
//   },
// });

// export const { setCartData } = cartSlice.actions;
// export default cartSlice.reducer;
// // Compare this snippet from src/store/reducer/cart.js:
const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_DATA":
      return {
        ...state,
        cart: action.cart,
        totalPrice: action.totalPrice, // Use API totalPrice
      };

    default:
      return state; // Always return state if action type is unknown
  }
};

export default cartReducer;
