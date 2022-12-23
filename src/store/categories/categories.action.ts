import { categoriesType, Category } from "./categories.type";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.util";

type FetCategoriesStart = Action<categoriesType.FETCH_CATEGORIES_START>;
type FetchCategoriesSuccess = ActionWithPayload<
  categoriesType.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;
type FetchCategoriesFailed = ActionWithPayload<
  categoriesType.FETCH_CATEGORIES_FAILED,
  Error
>;

export type categoriesAction =
  | FetCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed;

export const fetchCategoriesStart = withMatcher(
  (): FetCategoriesStart => createAction(categoriesType.FETCH_CATEGORIES_START)
);

export const fetchCategoriesSuccess = withMatcher(
  (categories: Category[]): FetchCategoriesSuccess =>
    createAction(categoriesType.FETCH_CATEGORIES_SUCCESS, categories)
);

export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(categoriesType.FETCH_CATEGORIES_FAILED, error)
);

// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetCategoriesStart());
//   try {
//     const categoriesArray = await getCollectionAndDocuments();
//     dispatch(fetchCategoriesSuccess(categoriesArray));
//   } catch (err) {
//     dispatch(fetchCategoriesFailed(err));
//   }
// };
