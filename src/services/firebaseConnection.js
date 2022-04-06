import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firebase-storage-compat'; //parte de enviar imagem

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqaYsXeETHVWCm4lIc4DjOBflG8wOUw64",
  authDomain: "sistemachamado-ff1a0.firebaseapp.com",
  projectId: "sistemachamado-ff1a0",
  storageBucket: "sistemachamado-ff1a0.appspot.com",
  messagingSenderId: "210201093256",
  appId: "1:210201093256:web:ca25b23b3e0375c8cdeb3d",
  measurementId: "G-GDDE5RFCEC"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase;