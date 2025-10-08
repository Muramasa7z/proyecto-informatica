// src/pages/User/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer/Footer';

const Profile = () => {
  const { currentUser, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    region: ''
  });

  // Cargar datos del usuario
  useEffect(() => {
    if (userData) {
      setFormData({
        nombre: userData.nombre || '',
        telefono: userData.telefono || '',
        direccion: userData.direccion || '',
        ciudad: userData.ciudad || '',
        region: userData.region || ''
      });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Simular guardado de datos (en una app real, guardaríamos en Firebase)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('✅ Perfil actualizado correctamente');
    } catch (error) {
      setMessage('❌ Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Acceso Denegado</h1>
          <p className="text-xl text-gray-600 mb-8">Debes iniciar sesión para ver tu perfil.</p>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header del Perfil */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white text-center">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">
                {userData?.nombre?.charAt(0) || 'U'}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
            <p className="text-blue-100">{currentUser.email}</p>
            <p className="text-blue-200 text-sm mt-2">
              Miembro desde {new Date(userData?.fechaRegistro).toLocaleDateString('es-CL')}
            </p>
          </div>

          {/* Formulario de Perfil */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <div className={`p-4 rounded-lg ${
                  message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}

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
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Información de la cuenta */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de la Cuenta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Email</h3>
              <p className="text-gray-900">{currentUser.email}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">ID de Usuario</h3>
              <p className="text-gray-900 text-sm font-mono">{currentUser.uid}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Tipo de Cuenta</h3>
              <p className="text-gray-900 capitalize">{userData?.role || 'Usuario'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Fecha de Registro</h3>
              <p className="text-gray-900">
                {new Date(userData?.fechaRegistro || currentUser.metadata.creationTime).toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;