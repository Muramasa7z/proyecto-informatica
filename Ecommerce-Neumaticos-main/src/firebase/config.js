// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // ← NUEVO: Importar Storage

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAgE9K51U9pztA2JbTkqhN8Q7oFR4t2LeQ",
  authDomain: "webappneumaticos.firebaseapp.com",
  projectId: "webappneumaticos",
  storageBucket: "webappneumaticos.firebasestorage.app",  // ← Storage
  messagingSenderId: "243398571509",
  appId: "1:243398571509:web:5e3242cc60be633ca39cbc"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar los servicios que vamos a usar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);  // ← NUEVO: Exportar Storage
export default app;