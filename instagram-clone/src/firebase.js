// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp =  firebase.initializeApp({
    apiKey: "AIzaSyCHYEm5loYoIZuMdai1PhwofOpSIr2ql8o",
    authDomain: "instagram-clone-debe2.firebaseapp.com",
    projectId: "instagram-clone-debe2",
    storageBucket: "instagram-clone-debe2.appspot.com",
    messagingSenderId: "970632153906",
    appId: "1:970632153906:web:57c7baf54cfaecfda5e52b",
    measurementId: "G-J1Z3M9WJZS"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};