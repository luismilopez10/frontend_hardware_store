import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpjgTLzUBzx41S05mDHzhkaMI6iYcR758",
  authDomain: "raulhwstore.firebaseapp.com",
  projectId: "raulhwstore",
  storageBucket: "raulhwstore.appspot.com",
  messagingSenderId: "703847202399",
  appId: "1:703847202399:web:fef5a14c7892c5a36725ea"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();