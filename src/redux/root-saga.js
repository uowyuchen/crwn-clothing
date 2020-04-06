import { call, all } from "redux-saga/effects";
import { fetchCollectonsStart } from "./shop/shop.sagas";

export default function* rootSaga() {
  yield all([call(fetchCollectonsStart)]);
}
