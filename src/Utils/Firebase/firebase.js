// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc1WZAEoyznVDCyQ7AAEQjVkjaxJQlJLs",
  authDomain: "chat-b525e.firebaseapp.com",
  projectId: "chat-b525e",
  storageBucket: "chat-b525e.appspot.com",
  messagingSenderId: "727142205675",
  appId: "1:727142205675:web:5e2cac4c964fcfc7d616ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
