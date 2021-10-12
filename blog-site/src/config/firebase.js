import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
    apiKey: "SECRET",
    authDomain: "blogtutorial-df36b.firebaseapp.com",
    projectId: "blogtutorial-df36b",
    storageBucket: "blogtutorial-df36b.appspot.com",
    messagingSenderId: "272266024371",
    appId: "1:272266024371:web:dfcecd1898b5070600a7c6"
  };

  const fire = firebase.initializeApp(firebaseConfig);

  export const auth = fire.auth();
  export const firestore = fire.firestore();
  export const storage = fire.storage();