import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";

const middlewares = [thunk];

// 如果在开发的时候，才用logger，deploy的时候就不用logger了
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
