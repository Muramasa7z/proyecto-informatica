// pages/Catalogo.jsx
import React from "react";
import Footer from "../components/Footer/Footer";

const Catalogo = () => {
  return (
    <section className="min-h-screen py-50">
      <h1 className="text-4xl font-bold text-center py-12">Nuestro Catálogo</h1>
      
      <section className="px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ejemplo de productos */}
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Producto 1</h2>
          <p>Descripción breve del producto.</p>
        </div>
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Producto 2</h2>
          <p>Descripción breve del producto.</p>
        </div>
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="font-semibold mb-2">Producto 3</h2>
          <p>Descripción breve del producto.</p>
        </div>
      </section>
    </section>
  );
};

export default Catalogo;
