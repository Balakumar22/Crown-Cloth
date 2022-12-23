import { takeLatest, all, call, put } from "typed-redux-saga/macro";
import { getCategoriesCollection } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { categoriesType } from "./categories.type";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesCollection);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (err) {
    yield* put(fetchCategoriesFailed(err as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    categoriesType.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
