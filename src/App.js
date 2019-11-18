import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup/signin-and-signup.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // listen for auth status change
    // 就是login了，user有一系列数据；logout了，user是null
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // 如果当前有登录的user
      if (userAuth) {
        // 拿到user的指针userRef
        const userRef = await createUserProfileDocument(userAuth);
        // 拿到真正的user信息
        userRef.onSnapshot(snapshot => {
          this.props.setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        // 如果当前没有登录的user就currentUser: null
        this.props.setCurrentUser(userAuth);
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop/' component={ShopPage} />
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

// 此举为了调用action
const mapDispatchToProps = dispatch => ({
  // 定义一个方法名字叫:setCurrentUser，此方法接收一个user参数
  // 并且执行store.dispatch，就是把action dispatch给相应的reducer
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// 这是 ES5
// const mapDispatchToProps = function(dispatch) {
//   return {
//     setCurrentUser: function(user) {
//       dispatch(setCurrentUser(user));
//     }
//   };
// };
export default connect(mapStateToProps, mapDispatchToProps)(App);
