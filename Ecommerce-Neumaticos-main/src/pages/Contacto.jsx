import React from "react";
import Footer from "../components/Footer/Footer";

const Contacto = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contáctanos</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Nos encantaría escucharte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Nombre completo</label>
                <input 
                  type="text" 
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">Correo electrónico</label>
                <input 
                  type="email" 
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                  placeholder="ejemplo@mail.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">Asunto</label>
              <input 
                type="text" 
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">Mensaje</label>
              <textarea 
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[150px]" 
                rows="6" 
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white text-lg font-semibold py-4 px-8 rounded-xl hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Información de contacto adicional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-telephone text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Teléfono</h3>
            <p className="text-gray-600">+56 9 1234 5678</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-envelope text-green-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">contacto@neumaticos.cl</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="bi bi-clock text-purple-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Horario</h3>
            <p className="text-gray-600">Lun-Vie: 9:00 - 18:00</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacto;

