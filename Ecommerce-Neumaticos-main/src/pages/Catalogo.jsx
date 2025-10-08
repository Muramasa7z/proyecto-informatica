import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../services/productService';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer/Footer';

const Catalogo = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // ← NUEVO

  const categories = [
    { value: 'todos', label: 'Todos los productos' },
    { value: 'automovil', label: 'Automóvil' },
    { value: 'camioneta', label: 'Camioneta' },
    { value: 'moto', label: 'Moto' }
  ];

  // Cargar productos
  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por categoría
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);
    
    if (category === 'todos') {
      setFilteredProducts(products);
    } else {
      try {
        setLoading(true);
        const categoryProducts = await getProductsByCategory(category);
        setFilteredProducts(categoryProducts);
      } catch (error) {
        console.error('Error filtering products:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Agregar al carrito desde catálogo
  const handleAddToCartFromCatalog = (product, e) => {
    e.preventDefault(); // Evitar navegación
    e.stopPropagation(); // Evitar que se active el Link
    if (product.stock > 0) {
      addToCart(product, 1);
      alert(`✅ ${product.nombre} agregado al carrito!`);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Header del Catálogo */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-6">
            Nuestro Catálogo
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Encuentra el neumático perfecto para tu vehículo
          </p>
          
          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => handleCategoryFilter(category.value)}
                className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No hay productos en esta categoría
            </h3>
            <p className="text-gray-500">Prueba con otra categoría o vuelve más tarde.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full"
              >
                <Link to={`/producto/${product.id}`} className="flex flex-col h-full">
                  <div className="relative overflow-hidden flex-shrink-0">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.enOferta && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        🔥 OFERTA
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        AGOTADO
                      </div>
                    )}
                  </div>
                  
                  {/* Contenido de la tarjeta - altura flexible pero con mínimo */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="font-bold text-xl text-gray-900 line-clamp-2 mb-2 leading-tight min-h-[3.5rem] flex items-start">
                        {product.nombre}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium mb-4">
                        {product.marca}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-green-600">
                            ${product.precio.toLocaleString()}
                          </p>
                          {product.enOferta && (
                            <p className="text-sm text-gray-400 line-through">
                              ${(product.precio * 1.2).toLocaleString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            product.stock > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botones siempre en la parte inferior */}
                    <div className="flex flex-col space-y-3 mt-auto">
                      <Link
                        to={`/producto/${product.id}`}
                        className="w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Ver Detalles
                      </Link>
                      
                      <button 
                        onClick={(e) => handleAddToCartFromCatalog(product, e)}
                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                          product.stock > 0 
                            ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={product.stock === 0}
                      >
                        🛒 Agregar al Carrito
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalogo;