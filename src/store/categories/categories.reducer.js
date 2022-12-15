import { categoriesType } from "./categories.type";

const {
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILED,
} = categoriesType;

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};
