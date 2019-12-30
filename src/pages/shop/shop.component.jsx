import React from "react";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";

const ShopPage = ({ match }) => {
  // console.log(`${match.url}`);
  // console.log(match);
  return (
    <div className='shop-page'>
      {/* <CollectionOverview /> */}
      <Route exact path={`${match.path}`} component={CollectionOverview} />

      {/* 这个Route在shop C，它也会给collection C 3个objects：history，match，location */}
      <Route path={`${match.url}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;
