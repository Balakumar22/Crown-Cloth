import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./categories.action";
import { categoriesType } from "./categories.type";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (err) {
    yield put(fetchCategoriesFailed(err));
  }
}

export function* onFetchCategories() {
  yield takeLatest(categoriesType.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
