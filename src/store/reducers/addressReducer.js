export const addressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case "CREATE_ADDRESS":
      return { ...state, address: action.payload };

    default:
      return state;
  }
};
