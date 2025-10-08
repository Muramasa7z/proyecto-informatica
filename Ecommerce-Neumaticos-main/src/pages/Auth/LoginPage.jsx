// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // La redirección se maneja en AuthContext
    } catch (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Si hay una página anterior, volver, sino ir al inicio
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Botón Volver/Inicio */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Volver al Inicio</span>
        </button>
      </div>

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
          <p className="text-white/80 text-sm">Bienvenido de vuelta</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Campo Email */}
          <div>
            <label className="block mb-2 font-semibold text-white text-sm">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              required
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-base transition-all focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Recordar contraseña (opcional) */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-white/80 text-sm">Recordarme</span>
            </label>
            <Link 
              to="/forgot-password" 
              className="text-blue-300 hover:text-blue-200 text-sm font-medium"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white p-3.5 rounded-lg text-base font-semibold shadow-lg shadow-green-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/40 transition-all active:translate-y-0 disabled:opacity-50 disabled:transform-none mt-4"
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

        {/* Separador */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-white/60">O continúa con</span>
          </div>
        </div>

        {/* Botones de redes sociales (opcional) */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-md shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2">Google</span>
          </button>

          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-white/20 rounded-md shadow-sm bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
            <span className="ml-2">Twitter</span>
          </button>
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