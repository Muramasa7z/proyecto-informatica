// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    if (formData.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      setError('');
      setLoading(true);
      await register(formData.email, formData.password, {
        nombre: formData.nombre,
        telefono: formData.telefono,
        direccion: formData.direccion
      });
      navigate('/');
    } catch (error) {
      setError('Error al crear la cuenta: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Fondo con efecto */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Contenedor del formulario */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crear Cuenta
          </h1>
          <p className="text-white/80 text-sm">Únete a Neumáticos Premium</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Campo Nombre */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Email */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Teléfono */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="+56 9 1234 5678"
              value={formData.telefono}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Dirección */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Tu dirección"
              value={formData.direccion}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Password */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Campo Confirmar Password */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white p-3.5 rounded-lg text-base font-semibold shadow-lg shadow-green-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/40 transition-all active:translate-y-0 disabled:opacity-50 disabled:transform-none mt-4"
          >
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>

        {/* Login */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login" 
              className="text-blue-300 hover:text-blue-200 font-semibold hover:underline transition"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center">
          <p className="text-white/50 text-xs">Sistema seguro • Neumáticos Premium</p>
        </div>
      </div>
    </div>
  );
};

export default Register;