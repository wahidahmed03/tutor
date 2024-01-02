// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy73LMwckgPfHhFs2dqkTI5v-df_exd9U",
  authDomain: "varatiya-9713e.firebaseapp.com",
  databaseURL: "https://varatiya-9713e-default-rtdb.firebaseio.com",
  projectId: "varatiya-9713e",
  storageBucket: "varatiya-9713e.appspot.com",
  messagingSenderId: "403946382761",
  appId: "1:403946382761:web:dffd381c772bd7519e10b8",
  measurementId: "G-FBZ5PQ5GLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);