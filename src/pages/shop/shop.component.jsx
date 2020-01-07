import React from "react";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import CollectionOverview from "../../components/collections-overview/collections-overview.component";
import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // 17.2定义一个loading变量
  state = { loading: true };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    // 拿到数据库中collections这个collection(就是表table)的 Ref
    const collectionRef = firestore.collection("collections");

    // collectionRef.onSnapshot(snapshot => {
    //   //console.log(snapshot.docs[0].data());
    //   // 下面👇这个collectionsMap是从数据库中拿过来的数据！！！！！！
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

    //   this.props.updateCollections(collectionsMap);
    //   // 17.2 从数据库取完数据后，把loading变成false
    //   this.setState({ loading: false });
    // });

    // 18.2 我们用promise，改变上面👆的onSnapshot。.get()也能得到snapshot
    collectionRef.get().then(snapshot => {
      //console.log(snapshot.docs[0].data());
      // 下面👇这个collectionsMap是从数据库中拿过来的数据！！！！！！
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

      this.props.updateCollections(collectionsMap);
      // 17.2 从数据库取完数据后，把loading变成false
      this.setState({ loading: false });
    });
  }

  render() {
    // console.log(`${match.url}`);
    // console.log(match);
    const { match } = this.props;

    return (
      <div className='shop-page'>
        {/* <CollectionOverview /> */}
        {/* <Route exact path={`${match.path}`} component={CollectionOverview} /> */}
        {/* render后面的props就是把localtion，match，history这3个Route中的变量传下去 */}
        {/* 17.2 又进行了改动，如下👇。上面👆是之前的 */}
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={this.state.loading}
              {...props}
            />
          )}
        />

        {/* 这个Route在shop C，它也会给collection C 3个objects：history，match，location */}
        {/* <Route path={`${match.url}/:collectionId`} component={CollectionPage} /> */}
        {/* 17.2 又进行了改动，如下👇。上面👆是之前的 */}
        <Route
          path={`${match.url}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={this.state.loading}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
