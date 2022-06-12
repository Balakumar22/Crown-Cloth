import { createContext, useEffect, useState } from "react";

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
  // const remainCart = cartItems.filter((product) => {
  //   return product.id !== productQuantityToReduce.id;
  // });

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

  // if (productQuantityToReduce.quantity > 1) {
  //   return [
  //     ...remainCart,
  //     {
  //       ...productQuantityToReduce,
  //       quantity: productQuantityToReduce.quantity - 1,
  //     },
  //   ];
  // }
};

export const CartContext = createContext({
  isCartOpen: false,
  setCart: () => null,
  cartItems: [],
  setCartItems: () => null,
  addItemToCart: () => null,
  reduceQuantity: () => null,
  removeItemFromCart: () => null,
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCount] = useState(0);

  useEffect(() => {
    const newCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCount(newCount);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const reduceQuantity = (product) => {
    setCartItems(reduceCartItemQuantity(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const value = {
    isCartOpen,
    setCart,
    setCartItems,
    cartCount,
    cartItems,
    addItemToCart,
    reduceQuantity,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
