import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "./addressReducer";
import { CardReducer } from "./cartReducer";
import { errorReducer } from "./errorReducer";
import {
  adminOrderReducer,
  orderReducer,
  singleOrderReducer,
} from "./orderReducer";
import { PizzaReducer } from "./pizzaReducer";
import { userReducer } from "./userReducer";

const cartItems = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : [];

const getAddress = localStorage.getItem("address")
  ? JSON.parse(localStorage.getItem("address"))
  : {};

const findUser = localStorage.getItem("myuser")
  ? JSON.parse(localStorage.getItem("myuser"))
  : {};

const Inital_State = {
  carts: { cart: cartItems },
  add: { address: getAddress },
  auth: { user: findUser },
};

export const store = configureStore({
  reducer: {
    pizzas: PizzaReducer,
    carts: CardReducer,
    add: addressReducer,
    auth: userReducer,
    orders: orderReducer,
    admin: adminOrderReducer,
    singleorder: singleOrderReducer,
    errors: errorReducer,
  },
  preloadedState: Inital_State,
});
