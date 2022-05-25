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

const agregarGastoDB = (gasto) => addDoc(collection(db, 'gastos'), gasto)

const borrarGastoDB = (id) => deleteDoc(doc(db, 'gastos', id))

const actualizarGastoDB = (id, gasto) => updateDoc(doc(db, 'gastos', id), gasto)

const obtenerGastosDB = (callback) => onSnapshot(collection(db, 'gastos'), callback)

export { db, auth, agregarGastoDB, obtenerGastosDB, borrarGastoDB, actualizarGastoDB }
