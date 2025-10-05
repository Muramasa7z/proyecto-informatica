import React from "react";

const Contacto = () => {
  return (
    <section className="min-h-screen py-50 px-6 max-w-3xl mx-auto ">
      <h1 className="text-4xl font-bold mb-6">Contáctanos</h1>
      <form className="space-y-6 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input type="text" className="w-full border p-2 rounded-md" placeholder="Tu nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Correo</label>
          <input type="email" className="w-full border p-2 rounded-md" placeholder="ejemplo@mail.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Mensaje</label>
          <textarea className="w-full border p-2 rounded-md" rows="4" placeholder="Escribe tu mensaje"></textarea>
        </div>
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Contacto;


