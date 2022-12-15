import { takeLatest, all, call, put } from "redux-saga/effects";
import { USER_ACTION_TYPE } from "./user.type";
import {
  createUserDoc,
  getCurrentUser,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.action";

// GET SNAP SHOT FROM USER AUTH
export function* getSnapShotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(createUserDoc, userAuth, additionalDetails);
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// CHECK USER SESSION
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// SIGN IN WITH GOOGLE POP UP
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, sigInWithGoogle);
}

export function* sigInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// SIGN IN WITH EMAIL
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, sigInWithEmail);
}

export function* sigInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapShotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// SIGN UP START
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START, signUp);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

// On SignUp Success
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }) {
  try {
    yield call(getSnapShotFromUserAuth, user, additionalInfo);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// SIGN OUT
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, signOut);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
