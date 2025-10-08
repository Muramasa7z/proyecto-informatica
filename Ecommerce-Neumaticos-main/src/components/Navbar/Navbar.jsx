// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import CartSidebar from "../cart/CartSidebar";
import Logo from "../../assets/logo.png";

const navbarlinks = [
  { id: 1, title: "Inicio", to: "/" },
  { id: 2, title: "Catalogo", to: "/catalogo" },
  { id: 3, title: "Quienes somos", to: "/quienes-somos" },
  { id: 4, title: "Contacto", to: "/contacto" },
];

// Icono de carrito SVG
const CartIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10H6L5 9z"
    />
  </svg>
);

// Icono de usuario SVG
const UserIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

// Icono de menú hamburguesa
const MenuIcon = ({ isOpen, className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    {isOpen ? (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { currentUser, userData, logout } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 bg-yellow-300/30 w-full backdrop-blur-md z-50">
        <div className="flex justify-between items-center sm:px-12 sm:py-6 px-4 py-3">
          {/* Logo */}
          <div>
            <Link to="/">
              <img src={Logo} alt="Logo del sitio" className="w-[100px]" />
            </Link>
          </div>

          {/* Botón responsive */}
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            className="md:hidden p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <MenuIcon isOpen={isOpen} />
          </button>

          {/* Navegación Desktop */}
          <div className="hidden md:block">
            <ul className="flex sm:space-x-8 space-x-4">
              {navbarlinks.map(link => (
                <li key={link.id}>
                  <Link
                    className="
                      relative
                      inline-block
                      text-gray-900 
                      sm:text-lg 
                      font-medium
                      transition-all 
                      duration-300 
                      ease-in-out
                      hover:text-purple-600 
                      hover:scale-110
                    "
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                    <span
                      className="
                        absolute left-0 -bottom-1 w-0 h-[2px] 
                        bg-purple-600 
                        transition-all duration-300 
                        ease-in-out 
                        hover:w-full
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Iconos Desktop (Carrito + Usuario) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-gray-900 hover:text-purple-600 transition-all duration-300 group"
              aria-label="Abrir carrito de compras"
            >
              <CartIcon className="w-6 h-6" />
              
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold transform group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Usuario */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-3 text-gray-900 hover:text-purple-600 transition-all duration-300"
                aria-label="Menú de usuario"
              >
                <UserIcon className="w-6 h-6" />
              </button>

              {/* Dropdown Menu Usuario */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Hola, {userData?.nombre || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <Link
                        to="/pedidos"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Mis Pedidos
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                      >
                        Cerrar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Iniciar Sesión
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Crear Cuenta
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Iconos Móvil */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Carrito Móvil */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-900"
              aria-label="Abrir carrito de compras"
            >
              <CartIcon className="w-6 h-6" />
              
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Usuario Móvil */}
            <Link
              to={currentUser ? "/perfil" : "/login"}
              className="p-2 text-gray-900"
              aria-label="Ir a perfil de usuario"
            >
              <UserIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Navegación Móvil */}
        <div
          className={`md:hidden absolute w-full bg-yellow-50 transition-all duration-300 ${
            isOpen ? "opacity-1000 visible" : "opacity-0 invisible"
          }`}
        >
          <ul className="flex flex-col px-4 py-2">
            {navbarlinks.map((link) => (
              <li key={link.id} className="py-2 text-center">
                <Link
                  className="
                    relative block
                    text-gray-900 text-lg font-medium
                    transition-all duration-300 ease-in-out
                    hover:text-purple-600
                  "
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                  <span
                    className="
                      absolute left-0 bottom-0 w-0 h-[2px] 
                      bg-purple-600 
                      transition-all duration-300 
                      ease-in-out 
                      hover:w-full
                    "
                  />
                </Link>
              </li>
            ))}
            
            {/* Enlaces de usuario en móvil */}
            <div className="border-t border-gray-300 mt-2 pt-2">
              {currentUser ? (
                <>
                  <li className="py-2 text-center">
                    <Link
                      to="/perfil"
                      className="text-gray-900 text-lg font-medium hover:text-purple-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                  </li>
                  <li className="py-2 text-center">
                    <Link
                      to="/pedidos"
                      className="text-gray-900 text-lg font-medium hover:text-purple-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Mis Pedidos
                    </Link>
                  </li>
                  <li className="py-2 text-center">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-gray-900 text-lg font-medium hover:text-purple-600"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="py-2 text-center">
                    <Link
                      to="/login"
                      className="text-gray-900 text-lg font-medium hover:text-purple-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                  </li>
                  <li className="py-2 text-center">
                    <Link
                      to="/register"
                      className="text-gray-900 text-lg font-medium hover:text-purple-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Crear Cuenta
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </header>

      {/* Sidebar del Carrito */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Overlay para cerrar menús */}
      {(isUserMenuOpen) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;