import React from "react";
import Neuma from "../assets/Neuma.png"

const QuienesSomos = () => {
  return (
    <section className="py-50 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Quiénes Somos</h1>
      <p className="text-lg leading-relaxed text-gray-700">
        Somos una empresa dedicada a la venta de neumáticos y servicios automotrices.
        Nuestro compromiso es ofrecer calidad, seguridad y confianza a cada cliente.
      </p>

      {/* Espacio para imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <img src= {Neuma} alt="Equipo" className="rounded-lg shadow-md" />
        <img src= {Neuma} alt="Taller" className="rounded-lg shadow-md" />
      </div>
    </section>
  );
};

export default QuienesSomos;
