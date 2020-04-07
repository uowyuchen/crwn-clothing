// 我们这里只用到firebase/app下的东西
import firebase from "firebase/app";
// 下面👇的两个firebase就是上面👆导入的名字
import "firebase/firestore";
import "firebase/auth";

// step 1: 这是firebase给我们的
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "crwn-db-3a366.firebaseapp.com",
  databaseURL: "https://crwn-db-3a366.firebaseio.com",
  projectId: "crwn-db-3a366",
  storageBucket: "crwn-db-3a366.appspot.com",
  messagingSenderId: "944083375472",
  appId: "1:944083375472:web:f0a8fa21829e124cbcabb5",
  measurementId: "G-MB5M12NNMY",
};

// step 2: 初始化
firebase.initializeApp(firebaseConfig);

// step 3: 拿到我们需要的 auth 和 firestore
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// 上面👆的firestore就是下面下面👇的 db
// export const db = firebase.firestore();

// step 4: 拿到此provider，当前是Google Signin，当然还有Facebook Signin等
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// this means we want to always trigger the Google popup when ever we
// use this Google auth provider for authentication and sign in
googleProvider.setCustomParameters({ prompt: "select_account" });

// step 5: 导出signInWithGoogle 给前端Sign In Button使用
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// step 6: login signup的时候用的方法。在App.js中用的！
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // 如果user没登录
  if (!userAuth) {
    return;
  }
  // 如果有user登录
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // snapShot是一个真正的一条数据(在这里是user的数据)
  const snapShot = await userRef.get();

  // 如果没有当前登录的user信息，就保存到database
  if (!snapShot.exists) {
    // 要把name和email这一组object存入db
    const { displayName, email } = userAuth;
    console.log(displayName);
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
      //console.log(additionalData);
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // 上面👆代码：如果数据库中没有当前登录user就在数据库中创建一个
  // 同时，此function返回一个userRef，既保存了数据，又返回了ref
  return userRef;
};

// 把shop.data.js中的数据加入到数据库。在第16章的时候用的。
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  // create colletionRef using collection key
  const collectionRef = firestore.collection(collectionKey);
  //console.log(collectionRef);

  // 16.6 用batch就是要好都好，一部分坏了都坏。
  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    // 16.6 通过collectionRef拿到docRef
    const newDocRef = collectionRef.doc();
    // 16.6 正式往数据库里写入东西
    batch.set(newDocRef, obj);
  });
  // 16.6 batch.commit返回一个promise value
  return await batch.commit();
};

// 16.8
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title: title,
      items: items,
    };
  });
  // console.log(transformedCollection);
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
