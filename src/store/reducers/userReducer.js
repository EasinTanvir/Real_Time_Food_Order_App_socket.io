export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return { ...state, user: action.payload };
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOG_OUT":
      return { user: {} };
    default:
      return state;
  }
};
