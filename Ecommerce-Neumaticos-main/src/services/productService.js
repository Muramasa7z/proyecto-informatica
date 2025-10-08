// src/services/productService.js
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  getDoc,
  query,
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Obtener todos los productos
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// Obtener productos en oferta
export const getProductsOnSale = async () => {
  const q = query(collection(db, 'products'), where('enOferta', '==', true));
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// Obtener un producto por ID - VERSIÓN CORREGIDA
export const getProductById = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  console.log('Firebase response:', docSnap.exists(), docSnap.data()); // ← DEBUG
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
  const q = query(collection(db, 'products'), where('categoria', '==', category));
  const querySnapshot = await getDocs(q);
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

// Agregar nuevo producto
export const addProduct = async (product) => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return docRef.id;
};

// Actualizar producto
export const updateProduct = async (id, product) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, product);
};

// Eliminar producto
export const deleteProduct = async (id) => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};