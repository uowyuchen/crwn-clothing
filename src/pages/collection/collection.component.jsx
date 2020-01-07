import React from "react";
import { connect } from "react-redux";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";

import "./collection.styles.scss";

function CollectionPage({ collection }) {
  // console.log(match);
  // console.log(match.params.collectionId);
  // console.log(collection);
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// 我们要用onwProps，所以不能用createSturcturedSelector
const mapStateToProps = (state, ownProps) => {
  return {
    // 比如: ownProps.match.params.collectionId 就是 hats 传给collectionUrlParam
    collection: selectCollection(ownProps.match.params.collectionId)(state)
  };
};

export default connect(mapStateToProps)(CollectionPage);
