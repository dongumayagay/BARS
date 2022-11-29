// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyA0eyaXyOMlaZJ6uYa8iTJ1IPodCQWhSgw",
	authDomain: "bars-gf.firebaseapp.com",
	projectId: "bars-gf",
	storageBucket: "bars-gf.appspot.com",
	messagingSenderId: "744412497677",
	appId: "1:744412497677:web:af2f1a838d00a30b9b5244",
	measurementId: "G-DNPKYL2RWR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
