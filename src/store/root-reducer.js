import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { categoriesReducer } from "./categories/categories.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  USER: userReducer,
  CATEGORY: categoriesReducer,
  CART: cartReducer,
});
