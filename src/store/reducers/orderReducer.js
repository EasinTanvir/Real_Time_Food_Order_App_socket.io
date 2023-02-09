export const orderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { ...state, order: action.payload };

    default:
      return state;
  }
};

export const adminOrderReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case "FETCH_ADMIN_ORDERS":
      return { ...state, order: action.payload };

    default:
      return state;
  }
};

export const singleOrderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "FETCH_ORDER":
      return { ...state, order: action.payload };

    default:
      return state;
  }
};
