import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";

const Ofertas = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Cargar productos reales de Firebase
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        
        // Filtrar productos en oferta o tomar los primeros 6
        const featuredProducts = productsData
          .filter(product => product.enOferta) // Productos en oferta primero
          .slice(0, 6);
        
        // Si no hay suficientes productos en oferta, completar con otros
        if (featuredProducts.length < 6) {
          const otherProducts = productsData
            .filter(product => !product.enOferta)
            .slice(0, 6 - featuredProducts.length);
          setProducts([...featuredProducts, ...otherProducts]);
        } else {
          setProducts(featuredProducts);
        }
        
      } catch (error) {
        console.error('Error cargando productos destacados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      quantity: 1
    });
    alert(`✅ ${product.nombre} agregado al carrito!`);
  };

  if (loading) {
    return (
      <section id="catalogo" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Ofertas Destacadas
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalogo" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {products.some(p => p.enOferta) ? 'Ofertas Destacadas' : 'Productos Destacados'}
        </h2>
        
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg mb-4">No hay productos destacados disponibles</p>
            <Link
              to="/catalogo"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}  // ← ID único de Firestore
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-48 object-cover"
                    />
                    {product.enOferta && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        OFERTA
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {product.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 capitalize">
                      {product.marca} • {product.categoria}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.precio?.toLocaleString()}
                      </span>
                      {product.enOferta && (
                        <span className="text-sm text-red-500 font-semibold">
                          ¡Oferta especial!
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-colors ${
                          product.stock === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
                      </button>
                      <Link 
                        to={`/producto/${product.id}`}
                        className="flex-1 bg-gray-100 text-gray-700 text-center py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                      >
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Botón para ver todo el catálogo */}
            <div className="text-center mt-12">
              <Link
                to="/catalogo"
                className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg"
              >
                Ver Catálogo Completo
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Ofertas;