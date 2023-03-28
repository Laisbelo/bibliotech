import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

//Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyDOsCKmL9i0n-pgpmCQ8MbkNb00xQSxpaE",
  authDomain: "bibliotech-lais.firebaseapp.com",
  projectId: "bibliotech-lais",
  storageBucket: "bibliotech-lais.appspot.com",
  messagingSenderId: "942252640490",
  appId: "1:942252640490:web:99d9b22311e76a8fe9af93"
};

export const app = initializeApp(firebaseConfig);//Inicializa o app com base nessas configurações
export const auth = getAuth (app); //Configurando o Autentication e seus recursos de loging e cadastro
export const db = getFirestore (app);//Configura o Firestore e seus recursos de banco de dados
export const storage = getStorage (app) //Configura o storage e seus recursos de Upload