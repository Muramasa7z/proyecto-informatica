// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Calcular isAdmin basado en userData actual
  const isAdmin = userData?.role === 'admin';

  const register = async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: userData.nombre
      });

      const userDoc = {
        nombre: userData.nombre,
        email: email,
        telefono: userData.telefono || '',
        direccion: userData.direccion || '',
        ciudad: userData.ciudad || '',
        region: userData.region || '',
        role: 'user',
        fechaRegistro: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);
      setUserData(userDoc);

      return userCredential;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setUserData(null);
    setCurrentUser(null);
    return signOut(auth);
  };

  const loadUserData = async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
        } else {
          const basicData = {
            nombre: user.displayName || user.email.split('@')[0] || 'Usuario',
            email: user.email,
            telefono: '',
            direccion: '',
            ciudad: '',
            region: '',
            role: 'user',
            fechaRegistro: user.metadata.creationTime || new Date().toISOString()
          };
          await setDoc(doc(db, 'users', user.uid), basicData);
          setUserData(basicData);
        }
      } catch (error) {
        console.error('Error cargando datos de usuario:', error);
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      await loadUserData(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;