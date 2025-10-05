import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Neuma from "../../assets/Neuma.png"

const productos = [
  {
    id: 1,
    nombre: "Neumático 195/65 R15",
    precio: "$89.990",
    imagen: Neuma,
  },
  {
    id: 2,
    nombre: "Neumático 205/55 R16",
    precio: "$99.990",
    imagen: Neuma,
  },
  {
    id: 3,
    nombre: "Neumático 215/60 R17",
    precio: "$119.990",
    imagen: Neuma,
  },
  {
    id: 4,
    nombre: "Neumático 225/45 R18",
    precio: "$139.990",
    imagen: Neuma,
  },
  {
    id: 4,
    nombre: "Neumático 225/45 R18",
    precio: "$139.990",
    imagen: Neuma,
  },
  {
    id: 4,
    nombre: "Neumático 225/45 R18",
    precio: "$139.990",
    imagen: Neuma,
  },
];

const Ofertas = () => {
  return (
    <section id="catalogo" className="bg-white py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Ofertas Destacadas
      </h2>
      
      <div className="overflow-x-auto flex gap-6 px-6 md:px-20 scrollbar-hide">
        {productos.map((producto, index) => (
          <motion.div
            key={producto.id}
            className="min-w-[250px] bg-gray-100 rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-40 h-40 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {producto.nombre}
            </h3>
            <p className="text-purple-600 font-bold">{producto.precio}</p>
            <button className="mt-4 bg-yellow-400 text-gray-900 font-medium px-6 py-2 rounded-full hover:bg-yellow-300 transition">
              Comprar
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Ofertas;
