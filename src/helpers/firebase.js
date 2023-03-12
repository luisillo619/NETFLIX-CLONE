// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import {
  getAuth,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjocsOu4WXTsSOf522y-i-2IYxKsJ3WIM",
  authDomain: "netflix-clone-c4b06.firebaseapp.com",
  projectId: "netflix-clone-c4b06",
  storageBucket: "netflix-clone-c4b06.appspot.com",
  messagingSenderId: "444658005176",
  appId: "1:444658005176:web:db9e4ce10e1040bb94704d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Se puede o no utilizar su base de datos
const auth = getAuth(app);

export { auth };
export default db;

// La información de autenticación de Firebase se almacena en los servidores de Firebase. La autenticación y seguridad de la aplicación son administradas por Firebase, que devuelve un objeto auth con otro objeto user dentro ,que representa al usuario y contiene información sobre el mismo, como su correo electrónico y su identificador único de usuario. Este objeto se utiliza para realizar tareas de autenticación y autorización en la aplicación.