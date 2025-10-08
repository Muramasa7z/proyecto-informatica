// src/pages/User/OrderHistory.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer/Footer';

const OrderHistory = () => {
  const { currentUser } = useAuth();

  // Datos de ejemplo
  const orders = [];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
          <p className="text-xl text-gray-600 mb-8">Debes iniciar sesión para ver tu historial de pedidos.</p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Iniciar Sesión
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600 mb-8">Revisa el historial de todas tus compras</p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay pedidos</h2>
            <p className="text-gray-600 mb-6">Aún no has realizado ninguna compra.</p>
            <a
              href="/catalogo"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Ir al Catálogo
            </a>
          </div>
        ) : (
          <div>Aquí irían los pedidos...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;