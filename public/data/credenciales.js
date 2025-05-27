// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnBM2WJyitOrmI6kedlOWXgRLIkzZeOLk",
  authDomain: "proyecto-fotos-f1fc2.firebaseapp.com",
  projectId: "proyecto-fotos-f1fc2",
  storageBucket: "proyecto-fotos-f1fc2.firebasestorage.app",
  messagingSenderId: "703248778516",
  appId: "1:703248778516:web:bcfa0945e3a469e2042e01"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase