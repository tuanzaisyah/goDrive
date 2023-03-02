import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCtA3WXO7BN3Hhtu_5BiyrBh1alKg2ojLM",
  authDomain: "godrive-dd75e.firebaseapp.com",
  projectId: "godrive-dd75e",
  storageBucket: "godrive-dd75e.appspot.com",
  messagingSenderId: "913239306638",
  appId: "1:913239306638:web:16fd915f67ff5ad97774df",
  measurementId: "G-HEJM2EMXE7",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
