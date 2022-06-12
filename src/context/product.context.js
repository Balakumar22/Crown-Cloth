import { createContext, useEffect, useState } from "react";
import {
  // addCollectionAndDocuments,
  getCollectionAndDocuments,
} from "../../src/utils/firebase/firebase.utils";
import SHOP_DATA from "../shop-data.js";

export const ProductContext = createContext({
  categories: {},
  setCategories: () => null,
});

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
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
