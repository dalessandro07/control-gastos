import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

import CryptoJS from 'crypto-js'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const agregarGastoDB = (gasto, UID) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(gasto), UID).toString()

  addDoc(collection(db, UID), { ciphertext })
}

const borrarGastoDB = (id, UID) => deleteDoc(doc(db, UID, id))

const actualizarGastoDB = (id, gasto, UID) => {
  console.log(gasto)

  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(gasto), UID).toString()

  updateDoc(doc(db, UID, id), { ciphertext })
}

const obtenerGastosDB = (callback, UID) => onSnapshot(collection(db, UID), callback)

export { db, auth, agregarGastoDB, obtenerGastosDB, borrarGastoDB, actualizarGastoDB }
