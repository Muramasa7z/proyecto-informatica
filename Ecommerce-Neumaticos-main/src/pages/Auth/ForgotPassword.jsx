// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      return setError('Por favor ingresa tu correo electrónico');
    }

    try {
      setError('');
      setMessage('');
      setLoading(true);
      
      await resetPassword(email);
      setMessage('¡Revisa tu correo! Te enviamos un enlace para restablecer tu contraseña.');
      
    } catch (error) {
      console.error('Error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No existe una cuenta con este correo electrónico.');
      } else if (error.code === 'auth/invalid-email') {
        setError('El formato del correo electrónico no es válido.');
      } else {
        setError('Error al enviar el email. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Botón Volver */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/10 backdrop-blur-sm border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Volver</span>
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
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Restablecer Contraseña
          </h1>
          <p className="text-white/80 text-sm">
            Te enviaremos un enlace a tu correo
          </p>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 mb-6">
          <p className="text-blue-200 text-sm text-center">
            Ingresa tu correo electrónico y te enviaremos instrucciones para crear una nueva contraseña.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/20 border border-green-500/50 text-white px-4 py-3 rounded-lg text-sm">
              {message}
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

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-3.5 rounded-lg text-base font-semibold shadow-lg shadow-yellow-600/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-yellow-600/40 transition-all active:translate-y-0 disabled:opacity-50 disabled:transform-none mt-4"
          >
            {loading ? 'Enviando...' : 'Enviar Enlace'}
          </button>
        </form>

        {/* Enlaces de navegación */}
        <div className="mt-6 space-y-3 text-center">
          <div>
            <Link 
              to="/login" 
              className="text-blue-300 hover:text-blue-200 font-semibold hover:underline transition text-sm"
            >
              ← Volver al Inicio de Sesión
            </Link>
          </div>
          <div>
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
        </div>

        {/* Footer */}
        <div className="mt-5 text-center">
          <p className="text-white/50 text-xs">Sistema seguro • Neumáticos Premium</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;