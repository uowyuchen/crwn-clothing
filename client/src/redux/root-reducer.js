import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
// 告诉redux-persist我们要用local storage as default storage
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: "root", // 意思是从root reducer开始persist
  storage: storage, // 意思是我们用local storage
  // 意思是我们要persist cartReducer
  // 不persist userReducer是因为它已经在firestore中了
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
