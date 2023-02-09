const Initial_State = {
  isLoading: false,
  isError: null,
};

export const errorReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case "IS_FETCHING":
      return { ...state, isLoading: true, isError: null };
    case "IS_SUCCESS":
      return { ...state, isLoading: false, isError: null };
    case "IS_ERROR":
      return { ...state, isLoading: false, isError: action.payload };
    default:
      return state;
  }
};
