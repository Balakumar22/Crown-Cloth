import { AnyAction } from "redux";
import { setCartItems, setCount, setIsCartOpen } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const initialState: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state: CartState = initialState,
  action: AnyAction
) => {
  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  return state;
};
