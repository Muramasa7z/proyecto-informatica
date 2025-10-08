// src/pages/Admin/Dashboard.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProductManager from '../../components/admin/ProductManager';

const Dashboard = () => {
  const { currentUser, isAdmin, logout } = useAuth();

  // Protección - bloquear si no es admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Administración
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hola, {currentUser?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        
        <ProductManager />
      </div>
    </div>
  );
};

export default Dashboard;