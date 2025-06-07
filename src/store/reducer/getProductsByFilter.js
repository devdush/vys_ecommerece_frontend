const initialState = {
  products: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_BY_FILTER":
      return {
        ...state,
        products: action.products || [], // Use action.payload instead of action.products
      };

    default:
      return state; // Always return the current state for unknown actions
  }
};

export default productsReducer;
