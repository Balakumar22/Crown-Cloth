import { USER_ACTION_TYPE } from "./user.type";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, isLoading: false };
    case USER_ACTION_TYPE.SIGN_IN_FAILED:
    case USER_ACTION_TYPE.SIGN_UP_FAILED:
    case USER_ACTION_TYPE.SIGN_OUT_FAILED:
      return { ...state, error: payload, isLoading: false };
    case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, isLoading: false };
    default:
      return state;
  }
};
