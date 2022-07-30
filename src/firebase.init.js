// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRIBYu94FVCWU1uwN7d5jp_RDGnvg90Tg",
  authDomain: "manufacturer-dbb5f.firebaseapp.com",
  projectId: "manufacturer-dbb5f",
  storageBucket: "manufacturer-dbb5f.appspot.com",
  messagingSenderId: "376118249269",
  appId: "1:376118249269:web:5d66db0a2044c0a90aae7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;