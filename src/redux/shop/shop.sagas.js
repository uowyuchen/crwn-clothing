// takeEvery:create a non blocking call
// and listen for every action of a specific type that we pass to it
import { takeLatest, call, put } from "redux-saga/effects";
import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from "./shop.actions";

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    // 这个就像async await的用法似的。和下面👇注释的.get().then()效果一样，但在generator function中必须用yield
    const snapshot = yield collectionRef.get();
    // call: call is the effect inside of our generator function that invokes the method
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    // after we have collectionsMap就说明我们拿到了数据库中的数据
    // 那么我们就要dispatch fetchCollectionsSuccess 这个action并且把数据传给reducer用来改变state数据从而在前端显示出来
    // 但是 saga 不用dispatch 这个 keyword,而用 put
    // put: put is the saga effect for create action and it exactly like dispatch. The only differenct
    //      is we have to yield it.
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectonsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
