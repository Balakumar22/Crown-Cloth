import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview.component";
import Category from "../Category/Category.page";
import { useEffect } from "react";
import { fetchCategoriesStart } from "../../store/categories/categories.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
