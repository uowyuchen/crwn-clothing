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
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

// collectionUrlParam 比如是 hats
export const selectCollection = collectionUrlParam =>
  // return 一个createSelector function 如下：
  createSelector(
    // 在里面get [selectCollections], 我们就得到了collections
    [selectCollections],
    collections => collections[collectionUrlParam]
  );
