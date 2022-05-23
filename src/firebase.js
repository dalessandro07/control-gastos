import { initializeApp } from 'firebase/app'
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
  apiKey: 'AIzaSyDynvgSRWL-lEeiL1ygpBDhkvuLCWIIImQ',
  authDomain: 'app-control-gastos-e45bb.firebaseapp.com',
  projectId: 'app-control-gastos-e45bb',
  storageBucket: 'app-control-gastos-e45bb.appspot.com',
  messagingSenderId: '685429614303',
  appId: '1:685429614303:web:480897cc498f481e2e2b6a'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const agregarGastoDB = (gasto) => addDoc(collection(db, 'gastos'), gasto)

const borrarGastoDB = (id) => deleteDoc(doc(db, 'gastos', id))

const actualizarGastoDB = (id, gasto) => updateDoc(doc(db, 'gastos', id), gasto)

const obtenerGastosDB = (callback) => onSnapshot(collection(db, 'gastos'), callback)

export { db, agregarGastoDB, obtenerGastosDB, borrarGastoDB, actualizarGastoDB }
