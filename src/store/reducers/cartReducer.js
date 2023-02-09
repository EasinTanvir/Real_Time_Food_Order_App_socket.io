export const CardReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case "ADD_CART":
      const product = action.payload;
      const existingProduct = state.cart.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x._id === existingProduct._id ? product : x
          ),
        };
      } else {
        return { ...state, cart: [...state.cart, product] };
      }

    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };

    case "ALL_REMOVE":
      return { cart: [] };

    default:
      return state;
  }
};
