import { cartActionTypes } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";

const { SET_CART_ITEMS, SET_CART_COUNT, SET_CART_OPEN } = cartActionTypes;

// HELPER FUNCTIONS
const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((product) => {
    return product.id === productToAdd.id;
  });

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((product) => product.id !== productToRemove.id);
};

const reduceCartItemQuantity = (cartItems, productQuantityToReduce) => {
  const existingItem = cartItems.find((product) => {
    return product.id === productQuantityToReduce.id;
  });

  if (existingItem.quantity === 1) {
    return cartItems.filter(
      (product) => product.id !== productQuantityToReduce.id
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productQuantityToReduce.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addItemToCart = (oldCartItems, product) => {
  const cartItems = addCartItem(oldCartItems, product);
  return setCartItems(cartItems);
  // return createAction(ADD_CART_ITEM, cartItems);
};

export const reduceQuantity = (oldCartItems, product) => {
  const cartItems = reduceCartItemQuantity(oldCartItems, product);
  return setCartItems(cartItems);
};

export const removeItemFromCart = (oldCartItems, product) => {
  const cartItems = removeCartItem(oldCartItems, product);
  return setCartItems(cartItems);
  // return createAction(REMOVE_CART_ITEM, cartItems);
};

export const setCartItems = (cartItems) =>
  createAction(SET_CART_ITEMS, cartItems);

export const setCount = (cartCount) => createAction(SET_CART_COUNT, cartCount);

export const setIsCartOpen = (isOpen) => createAction(SET_CART_OPEN, isOpen);
