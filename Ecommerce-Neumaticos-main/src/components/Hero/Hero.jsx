import React from "react";
import Fondo from "../../assets/Fondo.jpg";
import Neuma from "../../assets/Neuma.png";
import Logo from "../../assets/Logo.png";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { slipeUp, slipeInFromSide } from "../../utility/animation";

const Hero = () => {
  const bgImagen = {
    backgroundImage: `url(${Fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
  };

  return (
    <section style={bgImagen} className="min-h-screen py-15 pt-32">
      <div className="p-10 grid grid-cols-1 md:grid-cols-2">
        {/* textos descriptivos */}
        <div className="p-10 sm:p-10 md:p-15 lg:p-30 xl:p-36">
          <motion.img
            className="max-w-xs -mt-5"
            src={Logo}
            alt="Logo del Hero"
            variants={slipeUp(0.2)}
            initial="initial"
            animate="animate"
          />
          <motion.p
            className="py-12 text-gray-900 text-lg leading-relaxed"
            variants={slipeUp(0.3)}
            initial="initial"
            animate="animate"
          >
            Bienvenido a nuestra tienda. Encuentra la mejor selección de productos con calidad garantizada y ofertas exclusivas.
          </motion.p>
          <motion.div
            className="flex justify-center gap-6"
            variants={slipeUp(1)}
            initial="initial"
            animate="animate"
          >
            <a href="/catalogo" className="bg-blue-600 py-3 px-8 rounded-2xl text-white hover:bg-blue-700 transition-all duration-300 items-center cursor-pointer text-lg font-semibold shadow-lg hover:shadow-xl">
              Ver Catálogo
              <i className="bi bi-card-text text-xl ml-2"></i>
            </a>
            <a href="/contacto" className="text-gray-900 flex items-center cursor-pointer text-lg font-semibold hover:text-blue-600 transition-all duration-300">
              Contáctanos
              <i className="bi bi-chat-dots text-xl ml-2"></i>
            </a>
          </motion.div>
        </div>

        {/* imagen */}
        <motion.div
          className="sm:p-10 md:p-15 lg:p-30 xl:p-36"
          variants={slipeInFromSide("right", 0.5)}
          initial="initial"
          animate="animate"
        >
          <img src={Neuma} alt="Imagen de referencia" className="max-w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;