// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9cQf6cYGuRowCFgmxg9LE9_wMN0veKC8",
  authDomain: "netflix-clone-60d56.firebaseapp.com",
  projectId: "netflix-clone-60d56",
  storageBucket: "netflix-clone-60d56.appspot.com",
  messagingSenderId: "1077692499588",
  appId: "1:1077692499588:web:66b0a42ec3c2d9a3bfa4d1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Se puede o no utilizar su base de datos
const auth = getAuth(app);

export { auth }; // --> objeto auth
export default db;

// La información de autenticación de Firebase se almacena en los servidores de Firebase. La autenticación y seguridad de la aplicación son administradas por Firebase, que devuelve un objeto auth con otro objeto user dentro ,que representa al usuario y contiene información sobre el mismo, como su correo electrónico y su identificador único de usuario. Este objeto se utiliza para realizar tareas de autenticación y autorización en la aplicación.