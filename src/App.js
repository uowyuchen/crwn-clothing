import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import { checkUserSession } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // console.log(this.props.collectionArray);
    // listen for auth status change
    // 就是login了，user有一系列数据；logout了，user是null
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // 如果当前有登录的user
    //   if (userAuth) {
    //     // 拿到user的指针userRef
    //     const userRef = await createUserProfileDocument(userAuth);
    //     // 拿到真正的user信息
    //     userRef.onSnapshot(snapshot => {
    //       this.props.setCurrentUser({
    //         id: snapshot.id,
    //         ...snapshot.data()
    //       });
    //     });
    //   } else {
    //     // 如果当前没有登录的user就currentUser: null
    //     this.props.setCurrentUser(userAuth);
    //     // 16.5 把collections加入database中,先拿到CollectionRef
    //     // 16.6 collectionArray中有不想被传到数据库中的东西比如：routeName，id。
    //     // 16.6 所以我们不能把collectionArray都传走。
    //     // addCollectionAndDocuments(
    //     //   "collections",
    //     //   this.props.collectionArray.map(({ title, items }) => ({
    //     //     title,
    //     //     items
    //     //   }))
    //     // );
    //   }
    // });

    const { checkUserSession } = this.props;
    checkUserSession();
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          {/* Route pass 3 objects: match,location,history  */}
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          {/* <Route path='/signin' component={SignInAndSignUpPage} /> */}
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });
// createStructuredSelector就是只是为了少写点代码而已！
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
