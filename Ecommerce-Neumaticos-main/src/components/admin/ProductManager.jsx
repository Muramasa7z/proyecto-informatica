// src/components/admin/ProductManager.jsx
import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: 'automovil',
    marca: '',
    imagen: '',
    stock: '',
    descripcion: '',
    enOferta: false
  });

  // Cargar productos
  const loadProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Enviar formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      precio: Number(formData.precio),
      stock: Number(formData.stock)
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      
      // Limpiar formulario y recargar productos
      setFormData({
        nombre: '',
        precio: '',
        categoria: 'automovil',
        marca: '',
        imagen: '',
        stock: '',
        descripcion: '',
        enOferta: false
      });
      setEditingProduct(null);
      await loadProducts();
      
      alert(editingProduct ? 'Producto actualizado!' : 'Producto agregado!');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // Editar producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nombre: product.nombre,
      precio: product.precio,
      categoria: product.categoria,
      marca: product.marca,
      imagen: product.imagen,
      stock: product.stock,
      descripcion: product.descripcion,
      enOferta: product.enOferta
    });
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
        await loadProducts();
        alert('Producto eliminado!');
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Gestión de Productos</h2>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value="automovil">Automóvil</option>
            <option value="camioneta">Camioneta</option>
            <option value="moto">Moto</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Marca</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">URL Imagen</label>
          <input
            type="url"
            name="imagen"
            value={formData.imagen}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            rows="3"
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="enOferta"
            checked={formData.enOferta}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm font-medium">En oferta</label>
        </div>
        
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFormData({
                  nombre: '',
                  precio: '',
                  categoria: 'automovil',
                  marca: '',
                  imagen: '',
                  stock: '',
                  descripcion: '',
                  enOferta: false
                });
              }}
              className="ml-4 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4">
            <img 
              src={product.imagen} 
              alt={product.nombre}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <h3 className="font-semibold">{product.nombre}</h3>
            <p className="text-green-600 font-bold">${product.precio.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;