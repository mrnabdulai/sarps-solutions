// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXVZQO2N8blSnoi45E-oDxgwUgGLF1PuI",
    authDomain: "sarps-solutions-55845.firebaseapp.com",
    projectId: "sarps-solutions-55845",
    storageBucket: "sarps-solutions-55845.appspot.com",
    messagingSenderId: "340873235647",
    appId: "1:340873235647:web:47bb9f8369a310474d8a0a"
  };
  

// Initialize Firebase
const  app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)
export default app