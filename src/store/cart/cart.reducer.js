import { cartActionTypes } from "./cart.types";

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case cartActionTypes.SET_CART_ITEMS:
      return { ...state, cartItems: payload };

    case cartActionTypes.SET_CART_COUNT:
      return { ...state, cartCount: payload };

    case cartActionTypes.SET_CART_OPEN:
      return { ...state, isCartOpen: payload };

    default:
      return state;
  }
};
