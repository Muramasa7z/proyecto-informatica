import React from "react";
import Footer from "../components/Footer/Footer";

const QuienesSomos = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Quiénes Somos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            En Neumáticos Premium, nos dedicamos a proporcionar la mejor calidad en neumáticos 
            para todos los tipos de vehículos. Con años de experiencia en el rubro, nos hemos 
            convertido en la opción preferida de miles de clientes.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <i className="bi bi-bullseye text-blue-600 text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Proporcionar neumáticos de la más alta calidad, garantizando seguridad, 
              durabilidad y rendimiento excepcional para todos nuestros clientes, 
              acompañados de un servicio al cliente insuperable.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <i className="bi bi-eye text-green-600 text-2xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ser la empresa líder en venta de neumáticos a nivel nacional, 
              reconocida por nuestra calidad, innovación y compromiso con la 
              satisfacción total de nuestros clientes.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-award text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Calidad</h3>
              <p className="text-gray-600">Productos de la más alta calidad garantizada</p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-heart text-red-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Confianza</h3>
              <p className="text-gray-600">Relaciones basadas en la honestidad y transparencia</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-lightning text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovación</h3>
              <p className="text-gray-600">Siempre a la vanguardia en tecnología y servicios</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="bi bi-people text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compromiso</h3>
              <p className="text-gray-600">Total dedicación a la satisfacción del cliente</p>
            </div>
          </div>
        </div>

        {/* Historia */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white">
          <h2 className="text-4xl font-bold text-center mb-8">Nuestra Historia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10+</div>
              <div className="text-lg">Años de Experiencia</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5K+</div>
              <div className="text-lg">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-lg">Marcas Disponibles</div>
            </div>
          </div>
          <p className="text-center text-blue-100 text-lg mt-8 max-w-2xl mx-auto">
            Desde nuestro inicio en 2013, hemos crecido constantemente gracias a la confianza 
            de nuestros clientes y nuestro compromiso inquebrantable con la excelencia en 
            productos y servicios.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuienesSomos;