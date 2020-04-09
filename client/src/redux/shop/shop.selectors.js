import { createSelector } from "reselect";

// ID Map
// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   men: 5
// };

// create input selector
const selectShop = state => state.shop;

// create output selector
// 返回的是：
// hats: {id: 1, title: "Hats", routeName: "hats", items: Array(9)}
// sneakers: {id: 2, title: "Sneakers", routeName: "sneakers", items: Array(8)}
// jackets: {id: 3, title: "Jackets", routeName: "jackets", items: Array(5)}
// womens: {id: 4, title: "Womens", routeName: "womens", items: Array(7)}
// mens: {id: 5, title: "Mens", routeName: "mens", items: Array
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// 返回的是：
// 0: {id: 1, title: "Hats", routeName: "hats", items: Array(9)}
// 1: {id: 2, title: "Sneakers", routeName: "sneakers", items: Array(8)}
// 2: {id: 3, title: "Jackets", routeName: "jackets", items: Array(5)}
// 3: {id: 4, title: "Womens", routeName: "womens", items: Array(7)}
// 4: {id: 5, title: "Mens", routeName: "mens", items: Array(
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// collectionUrlParam 比如是 hats
export const selectCollection = collectionUrlParam =>
  // return 一个createSelector function 如下：
  createSelector(
    // 在里面get [selectCollections], 我们就得到了collections
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );

// isFetching selector
export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);
