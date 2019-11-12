// 我们这里只用到firebase/app下的东西
import firebase from "firebase/app";
// 下面👇的两个firebase就是上面👆导入的名字
import "firebase/firestore";
import "firebase/auth";

// 这是firebase给我们的
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crwn-db-eda90.firebaseapp.com",
  databaseURL: "https://crwn-db-eda90.firebaseio.com",
  projectId: "crwn-db-eda90",
  storageBucket: "crwn-db-eda90.appspot.com",
  messagingSenderId: "133428215927",
  appId: "1:133428215927:web:42d268abb95a56baa00672",
  measurementId: "G-VWW08EZK2Y"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// this means we want to always trigger the Google popup when ever we
// use this Google auth provider for authentication and sign in
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
