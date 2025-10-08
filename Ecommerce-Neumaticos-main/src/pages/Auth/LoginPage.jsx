// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
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
            Iniciar Sesión
          </h1>
          <p className="text-white/80 text-sm">Accede a tu cuenta de Neumáticos Premium</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Campo Email */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-white text-sm">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          {/* Campo Password */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-white text-sm">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Opciones */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center text-white/80 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recordarme
            </label>
            <button
              type="button"
              className="text-blue-300 hover:text-blue-200 hover:underline transition"
              onClick={() => alert('Funcionalidad de recuperación de contraseña')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3.5 rounded-lg text-base font-semibold shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/40 transition-all active:translate-y-0 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Registro */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            ¿No tienes una cuenta?{' '}
            <Link 
              to="/register" 
              className="text-blue-300 hover:text-blue-200 font-semibold hover:underline transition"
            >
              Regístrate aquí
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

export default LoginPage;