// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Ofertas from "./components/Ofertas/Ofertas";
import Footer from "./components/Footer/Footer";

// Páginas adicionales SI
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import Catalogo from "./pages/Catalogo";
import Producto from "./pages/Producto";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/Auth/LoginPage";
import Register from "./pages/Auth/Register";
import Profile from "./pages/User/Profile";
import OrderHistory from "./pages/User/OrderHistory";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Rutas CON Navbar */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  {/* Página principal (landing con Hero, Ofertas y Footer) */}
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <Ofertas />
                        <Footer />
                      </>
                    }
                  />
                  
                  {/* Otras páginas */}
                  <Route path="/quienes-somos" element={<QuienesSomos />} />
                  <Route path="/contacto" element={<Contacto />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/producto/:id" element={<Producto />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/perfil" element={<Profile />} />
                  <Route path="/pedidos" element={<OrderHistory />} />
                </Routes>
              </>
            } />
            
            {/* Rutas SIN Navbar */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            
            {/* Ruta ADMIN con protección */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;