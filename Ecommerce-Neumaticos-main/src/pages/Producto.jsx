// src/pages/Producto.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer/Footer';

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Cargar producto
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);
        } else {
          navigate('/catalogo');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/catalogo');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, navigate]);

  // Agregar al carrito (REAL ahora)
  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);
      alert(`✅ ${quantity} x ${product.nombre} agregado al carrito!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-40">
        <div className="text-xl">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-40">
        <div className="text-xl">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      {/* Breadcrumb */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex space-x-3 text-base">
            <Link to="/" className="text-gray-500 hover:text-gray-700 font-medium">Inicio</Link>
            <span className="text-gray-400">/</span>
            <Link to="/catalogo" className="text-gray-500 hover:text-gray-700 font-medium">Catálogo</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-semibold truncate">{product.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Detalles del Producto */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen del Producto */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Información del Producto */}
          <div className="space-y-6">
            <div>
              {product.enOferta && (
                <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
                  🔥 OFERTA ESPECIAL
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {product.nombre}
              </h1>
              <p className="text-xl text-gray-600 mb-6 font-medium">{product.marca}</p>
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <div className="flex items-baseline space-x-4">
                <span className="text-5xl font-bold text-green-600">
                  ${product.precio.toLocaleString()}
                </span>
                {product.enOferta && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${(product.precio * 1.2).toLocaleString()}
                  </span>
                )}
              </div>
              {product.enOferta && (
                <p className="text-green-600 font-semibold text-lg">
                  ¡Ahorras ${(product.precio * 0.2).toLocaleString()}!
                </p>
              )}
            </div>

            {/* Stock */}
            <div className={`inline-flex items-center px-5 py-3 rounded-full text-lg font-medium ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <span className={`w-3 h-3 rounded-full mr-3 ${
                product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </div>

            {/* Descripción */}
            <div className="prose max-w-none">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Descripción</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.descripcion || 'Este producto no tiene descripción adicional.'}
              </p>
            </div>

            {/* Especificaciones */}
            <div className="bg-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-6 text-base">
                <div>
                  <span className="font-semibold text-gray-600 block mb-2">Categoría:</span>
                  <p className="text-gray-900 font-medium capitalize">{product.categoria}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 block mb-2">Marca:</span>
                  <p className="text-gray-900 font-medium">{product.marca}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 block mb-2">Stock:</span>
                  <p className="text-gray-900 font-medium">{product.stock} unidades</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 block mb-2">Estado:</span>
                  <p className="text-gray-900 font-medium">{product.enOferta ? 'En oferta' : 'Precio regular'}</p>
                </div>
              </div>
            </div>

            {/* Selector de Cantidad y Botón de Compra */}
            {product.stock > 0 && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <label className="text-xl font-semibold text-gray-900">Cantidad:</label>
                  <div className="flex items-center border-2 border-gray-300 rounded-xl text-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-6 py-3 border-l border-r border-gray-300 font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-5 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-base text-gray-500">
                    Máximo: {product.stock}
                  </span>
                </div>

                <div className="flex space-x-6">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 text-white py-5 px-8 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 text-lg hover:shadow-lg"
                  >
                    🛒 Agregar al Carrito
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-5 px-8 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 text-lg hover:shadow-lg">
                    ⚡ Comprar Ahora
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Producto;