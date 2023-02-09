export const PizzaReducer = (state = { pizza: [] }, action) => {
  switch (action.type) {
    case "FETCH_PIZZA":
      return { ...state, pizza: action.payload };

    default:
      return state;
  }
};
