// src/components/Footer/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Columna 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">On Way Chile</h3>
          <p className="text-sm">
            Tu tienda confiable de neumáticos con la mejor calidad y precios.
            Ofrecemos instalación y asesoría personalizada.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Contacto</h3>
          <p>Email: contacto@onwaychile.cl</p>
          <p>Teléfono: +56 9 1234 5678</p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <i className="bi bi-facebook text-2xl hover:text-yellow-400"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <i className="bi bi-instagram text-2xl hover:text-yellow-400"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} On Way Chile. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

