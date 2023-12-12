import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/database"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAuHWm5krrNkQ_W0kDBZNtXEe5KhmXRUTc",
    authDomain: "allay-convo.firebaseapp.com",
    projectId: "allay-convo",
    storageBucket: "allay-convo.appspot.com",
    messagingSenderId: "721774126573",
    appId: "1:721774126573:web:85219f0b9cd3b18bfdf3e4",
    measurementId: "G-ECMYT3YDC6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const firebaseDatabase = firebaseApp.database();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage()
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, storage, db, firebaseDatabase }