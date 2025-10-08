// src/components/admin/ProductManager.jsx
import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../services/productService';
import { storage } from '../../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Para manejar el archivo seleccionado
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

  // Subir imagen a Firebase Storage
  const uploadImage = async (file) => {
    try {
      setUploading(true);
      
      // Crear referencia única para la imagen
      const timestamp = Date.now();
      const fileName = `product_${timestamp}_${file.name}`;
      const storageRef = ref(storage, `products/${fileName}`);
      
      // Subir archivo
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // Eliminar imagen vieja de Storage (al editar)
  const deleteOldImage = async (imageUrl) => {
    try {
      // Extraer la referencia del URL de Firebase Storage
      if (imageUrl.includes('firebasestorage.googleapis.com')) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        console.log('✅ Imagen anterior eliminada');
      }
    } catch (error) {
      console.warn('No se pudo eliminar la imagen anterior:', error);
      // No lanzar error, continuar con la subida
    }
  };

  // Manejar cambio de archivo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('❌ Por favor selecciona un archivo de imagen válido (JPEG, PNG, etc.)');
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ La imagen debe ser menor a 5MB');
      return;
    }

    setImageFile(file);
    
    // Mostrar vista previa local
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, imagen: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

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
    
    let finalImageUrl = formData.imagen;

    // Si hay un nuevo archivo seleccionado, subirlo
    if (imageFile) {
      try {
        finalImageUrl = await uploadImage(imageFile);
        
        // Si estamos editando y hay una imagen anterior, eliminarla
        if (editingProduct && editingProduct.imagen && editingProduct.imagen !== finalImageUrl) {
          await deleteOldImage(editingProduct.imagen);
        }
      } catch (error) {
        alert('❌ Error subiendo imagen: ' + error.message);
        return;
      }
    } else if (!formData.imagen) {
      alert('❌ Por favor selecciona una imagen para el producto');
      return;
    }

    const productData = {
      ...formData,
      imagen: finalImageUrl,
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
      resetForm();
      await loadProducts();
      
      alert(editingProduct ? '✅ Producto actualizado!' : '✅ Producto agregado!');
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  // Resetear formulario
  const resetForm = () => {
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
    setImageFile(null);
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
    setImageFile(null); // Resetear archivo seleccionado
  };

  // Eliminar producto (incluyendo su imagen)
  const handleDelete = async (product) => {
    if (confirm(`¿Estás seguro de eliminar el producto "${product.nombre}"?`)) {
      try {
        // Eliminar imagen del storage si existe
        if (product.imagen && product.imagen.includes('firebasestorage.googleapis.com')) {
          await deleteOldImage(product.imagen);
        }
        
        // Eliminar producto de Firestore
        await deleteProduct(product.id);
        await loadProducts();
        alert('✅ Producto eliminado!');
      } catch (error) {
        alert('❌ Error: ' + error.message);
      }
    }
  };

  // Quitar imagen seleccionada
  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData(prev => ({ ...prev, imagen: '' }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Gestión de Productos</h2>
      
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre *</label>
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
          <label className="block text-sm font-medium mb-1">Precio *</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Categoría *</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          >
            <option value="automovil">Automóvil</option>
            <option value="camioneta">Camioneta</option>
            <option value="moto">Moto</option>
            <option value="camion">Camión</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Marca *</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Imagen del Producto *</label>
          <div className="space-y-3">
            {/* Input de archivo */}
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1 border p-2 rounded"
                disabled={uploading}
              />
              {formData.imagen && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                >
                  Quitar
                </button>
              )}
            </div>
            
            {uploading && (
              <div className="text-blue-600 text-sm flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Subiendo imagen...
              </div>
            )}
            
            {/* Vista previa */}
            {formData.imagen && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">
                  {editingProduct && !imageFile ? 'Imagen actual:' : 'Vista previa:'}
                </p>
                <img 
                  src={formData.imagen} 
                  alt="Vista previa" 
                  className="w-32 h-32 object-cover rounded border shadow-sm"
                />
                <p className="text-green-600 text-sm mt-1">
                  ✅ {imageFile ? 'Nueva imagen lista' : 'Imagen cargada'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Stock *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
            required
            min="0"
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
            placeholder="Descripción del producto..."
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
        
        <div className="md:col-span-2 flex space-x-4">
          <button
            type="submit"
            disabled={uploading}
            className={`px-6 py-2 rounded font-semibold ${
              uploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {uploading ? 'Subiendo...' : editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de productos */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Productos ({products.length})
        </h3>
        
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay productos registrados
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <img 
                  src={product.imagen} 
                  alt={product.nombre}
                  className="w-full h-40 object-cover mb-3 rounded"
                />
                <h3 className="font-semibold text-lg mb-1">{product.nombre}</h3>
                <p className="text-green-600 font-bold text-xl">${product.precio?.toLocaleString()}</p>
                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <p>Marca: {product.marca}</p>
                  <p>Categoría: {product.categoria}</p>
                  <p>Stock: {product.stock}</p>
                  {product.enOferta && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">EN OFERTA</span>
                  )}
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;