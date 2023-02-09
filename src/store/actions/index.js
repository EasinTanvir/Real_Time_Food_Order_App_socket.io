import history from "../../history";
import apis from "../apis";
export const Fetch_Pizzas = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await apis.get("/api/pizza");
    dispatch({ type: "FETCH_PIZZA", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Add_Cart =
  (data, qty = 1) =>
  (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_CART", payload: { ...data, qty } });

      localStorage.setItem("carts", JSON.stringify(getState().carts.cart));
    } catch (err) {
      console.log(err);
    }
  };

export const Remove_Cart = (data) => (dispatch, getState) => {
  try {
    dispatch({ type: "REMOVE_CART", payload: data });

    localStorage.setItem("carts", JSON.stringify(getState().carts.cart));
  } catch (err) {
    console.log(err);
  }
};

export const Create_Address = (data) => (dispatch) => {
  try {
    dispatch({ type: "CREATE_ADDRESS", payload: data });

    localStorage.setItem("address", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const Create_User = (Recdata) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await apis.post("/api/user/signup", Recdata);
    dispatch({ type: "CREATE_USER", payload: data });

    localStorage.setItem("myuser", JSON.stringify(data));
    dispatch({ type: "IS_SUCCESS" });
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Orders = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await apis.get("/api/orders", {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    });
    dispatch({ type: "FETCH_ORDERS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Admin_Orders = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await apis.get("/api/orders/admin", {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    });
    dispatch({ type: "FETCH_ADMIN_ORDERS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Order_Id = (id) => async (dispatch, getState) => {
  const { user } = getState().auth;
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await apis.get(`/api/orders/${id}`, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    });
    dispatch({ type: "FETCH_ORDER", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Update_REalTime =
  (params, datas) => async (dispatch, getState) => {
    const { user } = getState().auth;
    try {
      const { data } = await apis.patch(`/api/orders/${params}`, datas, {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      dispatch({ type: "FETCH_ORDER", payload: data });
    } catch (err) {
      dispatch({ type: "IS_ERROR", payload: err.response.data.message });
    }
  };

export const Sign_In = (Recdata) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });

    const { data } = await apis.post("/api/user/login", Recdata);
    dispatch({ type: "LOGIN_USER", payload: data });

    localStorage.setItem("myuser", JSON.stringify(data));
    history.push("/");
    dispatch({ type: "IS_SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Log_Out = () => {
  return {
    type: "LOG_OUT",
  };
};
