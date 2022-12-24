import { cartActionTypes, CartItem } from "./cart.types";
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.util";
import { CategoryItem } from "../categories/categories.type";

const { SET_CART_ITEMS, SET_CART_COUNT, SET_CART_OPEN } = cartActionTypes;

export type SetIsOpen = ActionWithPayload<
  cartActionTypes.SET_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  cartActionTypes.SET_CART_ITEMS,
  CartItem[]
>;
export type SetCartCount = ActionWithPayload<
  cartActionTypes.SET_CART_COUNT,
  number
>;

// HELPER FUNCTIONS
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
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

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  return cartItems.filter((product) => product.id !== productToRemove.id);
};

const reduceCartItemQuantity = (
  cartItems: CartItem[],
  productQuantityToReduce: CartItem
): CartItem[] => {
  const existingItem: CartItem | undefined = cartItems.find(
    (product: CartItem) => {
      return product.id === productQuantityToReduce.id;
    }
  );

  if (existingItem && existingItem.quantity === 1) {
    return cartItems.filter(
      (product: CartItem) => product.id !== productQuantityToReduce.id
    );
  }

  return cartItems.map((cartItem: CartItem) =>
    cartItem.id === productQuantityToReduce.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addItemToCart = (
  oldCartItems: CartItem[],
  product: CategoryItem
) => {
  const cartItems = addCartItem(oldCartItems, product);
  return setCartItems(cartItems);
  // return createAction(ADD_CART_ITEM, cartItems);
};

export const reduceQuantity = (oldCartItems: CartItem[], product: CartItem) => {
  const cartItems = reduceCartItemQuantity(oldCartItems, product);
  return setCartItems(cartItems);
};

export const removeItemFromCart = (
  oldCartItems: CartItem[],
  product: CartItem
) => {
  const cartItems = removeCartItem(oldCartItems, product);
  return setCartItems(cartItems);
  // return createAction(REMOVE_CART_ITEM, cartItems);
};

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(SET_CART_ITEMS, cartItems)
);

export const setCount = withMatcher(
  (cartCount: number): SetCartCount => createAction(SET_CART_COUNT, cartCount)
);

export const setIsCartOpen = withMatcher(
  (isOpen: boolean): SetIsOpen => createAction(SET_CART_OPEN, isOpen)
);
