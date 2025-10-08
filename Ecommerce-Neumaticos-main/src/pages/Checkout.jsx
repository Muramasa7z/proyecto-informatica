// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import Footer from '../components/Footer/Footer';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: userData?.nombre || '',
    email: currentUser?.email || '',
    telefono: userData?.telefono || '',
    direccion: userData?.direccion || '',
    ciudad: userData?.ciudad || '',
    region: userData?.region || '',
    metodoPago: 'webpay'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Procesar pedido REAL
  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Validar formulario
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.direccion) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsProcessing(true);

    try {
      // Crear datos del pedido
      const orderData = {
        usuarioId: currentUser.uid,
        usuarioEmail: currentUser.email,
        usuarioNombre: formData.nombre,
        total: total,
        items: items.map(item => ({
          productoId: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.quantity,
          imagen: item.imagen
        })),
        direccionEnvio: {
          nombre: formData.nombre,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          region: formData.region,
          telefono: formData.telefono
        },
        metodoPago: formData.metodoPago,
        transaccionId: 'TBK_' + Date.now()
      };

      // Guardar pedido en Firebase
      const orderId = await createOrder(orderData);
      
      // Simular procesamiento de pago
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mostrar confirmación
      alert(`✅ Pedido creado exitosamente!\nNúmero de pedido: ${orderId}\nTotal: $${total.toLocaleString()}`);
      
      // Limpiar carrito y redirigir
      clearCart();
      navigate('/pedidos');
      
    } catch (error) {
      console.error('Error en el checkout:', error);
      alert('❌ Error al procesar el pedido. Por favor intenta nuevamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carrito Vacío</h1>
          <p className="text-xl text-gray-600 mb-8">No hay productos en tu carrito.</p>
          <button
            onClick={() => navigate('/catalogo')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            Ir al Catálogo
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario de envío y pago */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Envío</h2>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Región
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Método de Pago
                </label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="webpay"
                      checked={formData.metodoPago === 'webpay'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Webpay</span>
                      <p className="text-sm text-gray-500">Pago seguro con tarjeta de crédito/débito</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                } text-white`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Procesando pedido...
                  </div>
                ) : (
                  `Pagar $${total.toLocaleString()}`
                )}
              </button>
            </form>
          </div>

          {/* Resumen del pedido */}
          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{item.nombre}</h3>
                      <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.precio * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-gray-200">
                <span>Total</span>
                <span className="text-green-600">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;