// src/components/AuthDebugger.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthDebugger = () => {
  const { currentUser, userData, isAdmin } = useAuth();
  
  if (!currentUser) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'red',
      color: 'white',
      padding: '10px',
      zIndex: 10000,
      fontSize: '12px',
      borderRadius: '5px',
      border: '2px solid yellow'
    }}>
      <div><strong>🚨 DEBUG AUTH 🚨</strong></div>
      <div>Email: {currentUser.email}</div>
      <div>Role: {userData?.role || 'NO ROLE'}</div>
      <div>isAdmin: {isAdmin ? 'TRUE' : 'FALSE'}</div>
    </div>
  );
};

export default AuthDebugger;