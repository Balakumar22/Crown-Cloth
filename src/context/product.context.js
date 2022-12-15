import { createContext, useEffect, useReducer } from "react";
import { getCollectionAndDocuments } from "../../src/utils/firebase/firebase.utils";

export const ProductContext = createContext({
  categories: {},
  setCategories: () => null,
});

const productActionType = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

const productReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case productActionType.SET_CATEGORIES:
      return { ...state, categories: payload };

    default:
      throw new Error(`Unhandle ${type} error`);
  }
};

const initialState = {
  categories: {},
};

export const ProductProvider = ({ children }) => {
  // const [categories, setCategories] = useState({});
  const [{ categories }, dispatch] = useReducer(productReducer, initialState);

  const setCategories = (categories) => {
    dispatch({ type: productActionType.SET_CATEGORIES, payload: categories });
  };

  const value = { categories, setCategories };

  useEffect(() => {
    const getProducts = async () => {
      const categoriesMap = await getCollectionAndDocuments();
      setCategories(categoriesMap);
    };
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
