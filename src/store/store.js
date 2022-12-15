import { createStore, compose, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter(Boolean);
const composeEnhancer = compose(applyMiddleware(...middlewares));

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["CART"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composeEnhancer);
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
