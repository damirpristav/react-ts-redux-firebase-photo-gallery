import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyDrYoS7-YARtXAEP-2IZy2neCTPkfxJWY8",
  authDomain: "authwithgallery.firebaseapp.com",
  projectId: "authwithgallery",
  storageBucket: "authwithgallery.appspot.com",
  messagingSenderId: "543359663527",
  appId: "1:543359663527:web:916ceb45545f96d1a28a82",
  measurementId: "G-8DR626C12M"
});

export default firebase;