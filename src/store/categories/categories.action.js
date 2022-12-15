import { categoriesType } from "./categories.type";
import { createAction } from "../../utils/reducer/reducer.util";

const {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
} = categoriesType;

export const fetchCategoriesStart = () => createAction(FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
  createAction(FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
  createAction(FETCH_CATEGORIES_FAILED, error);

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetCategoriesStart());
//   try {
//     const categoriesArray = await getCollectionAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (err) {
//     dispatch(fetchCategoriesFailed(err));
//   }
// };
