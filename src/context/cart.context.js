import { createContext, useEffect, useReducer } from "react";

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

const cartActionTypes = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_OPEN: "SET_CART_OPEN",
  SET_CART_COUNT: "SET_CART_COUNT",
  // DEC_CART_COUNT: "DEC_CART_COUNT",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case cartActionTypes.SET_CART_ITEMS:
      return { ...state, cartItems: payload };

    case cartActionTypes.SET_CART_COUNT:
      return { ...state, cartCount: payload };

    case cartActionTypes.DEC_CART_COUNT:
      return { ...state, cartCount: state.cartCount - 1 };

    case cartActionTypes.SET_CART_OPEN:
      return { ...state, isCartOpen: !state.isCartOpen };

    default:
      throw new Error(`Unhandle ${type} error`);
  }
};

const initialState = {
  isCartOpen: false,
  cartCount: 0,
  cartItems: [],
};

export const CartProvider = ({ children }) => {
  // const [isCartOpen, setCart] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCount] = useState(0);
  const [{ cartItems, cartCount, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    initialState
  );

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

  const setCartItems = (cartItems) => {
    dispatch({ type: cartActionTypes.SET_CART_ITEMS, payload: cartItems });
  };

  const setCount = (cartCount) => {
    dispatch({ type: cartActionTypes.SET_CART_COUNT, payload: cartCount });
  };

  const setCart = () => {
    dispatch({ type: cartActionTypes.SET_CART_OPEN });
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
