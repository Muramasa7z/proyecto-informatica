// src/pages/Pedidos.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../services/orderService';
import Footer from '../components/Footer/Footer';

const Pedidos = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserOrders = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const userOrders = await getUserOrders(currentUser.uid);
        setOrders(userOrders);
      } catch (err) {
        console.error('Error cargando pedidos:', err);
        setError('Error al cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    loadUserOrders();
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'entregado': return 'bg-green-100 text-green-800';
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'confirmado': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Inicia sesión para ver tus pedidos</h1>
          <p className="text-gray-600 mb-8">Necesitas estar registrado para acceder a tu historial de pedidos.</p>
          <a
            href="/login"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold inline-block"
          >
            Iniciar Sesión
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Mis Pedidos</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No tienes pedidos aún</h2>
              <p className="text-gray-600 mb-8">
                Cuando realices tu primera compra, aparecerá aquí tu historial de pedidos.
              </p>
              <a
                href="/catalogo"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold inline-block"
              >
                Explorar Catálogo
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header del pedido */}
                <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pedido #{order.id.slice(-8).toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(order.fecha)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.estado)}`}>
                        {order.estado.charAt(0).toUpperCase() + order.estado.slice(1)}
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        ${order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Productos del pedido */}
                <div className="p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Productos</h4>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h5 className="font-medium text-gray-900">{item.nombre}</h5>
                            <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Información de envío */}
                <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Dirección de envío</h5>
                      <p className="text-sm text-gray-600">
                        {order.direccionEnvio.nombre}<br/>
                        {order.direccionEnvio.direccion}<br/>
                        {order.direccionEnvio.ciudad && `${order.direccionEnvio.ciudad}, `}
                        {order.direccionEnvio.region}<br/>
                        {order.direccionEnvio.telefono}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Método de pago</h5>
                      <p className="text-sm text-gray-600 capitalize">
                        {order.metodoPago}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Pedidos;