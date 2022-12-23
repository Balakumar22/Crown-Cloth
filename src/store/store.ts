import { createStore, compose, applyMiddleware, Middleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleWare,
].filter((middleware): middleware is Middleware => Boolean(middleware));
const composeEnhancer = compose(applyMiddleware(...middlewares));

type ExtendPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendPersistConfig = {
  key: "root",
  storage,
  whitelist: ["CART"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composeEnhancer);
sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
