// src/services/orderService.js
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs,
  getDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Crear nuevo pedido
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creando pedido:', error);
    throw error;
  }
};

// Obtener pedidos de un usuario
export const getUserOrders = async (userId) => {
  try {
    const q = query(
      collection(db, 'orders'), 
      where('usuarioId', '==', userId),
      orderBy('fecha', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error obteniendo pedidos:', error);
    throw error;
  }
};

// Obtener todos los pedidos (para admin)
export const getAllOrders = async () => {
  try {
    const q = query(collection(db, 'orders'), orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error obteniendo todos los pedidos:', error);
    throw error;
  }
};

// Actualizar estado de pedido
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      estado: newStatus
    });
  } catch (error) {
    console.error('Error actualizando pedido:', error);
    throw error;
  }
};

// Obtener un pedido específico
export const getOrderById = async (orderId) => {
  try {
    const docRef = doc(db, 'orders', orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo pedido:', error);
    throw error;
  }
};