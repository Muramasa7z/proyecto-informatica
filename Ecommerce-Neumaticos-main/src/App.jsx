import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Ofertas from "./components/Ofertas/Ofertas";
import Footer from "./components/Footer/Footer";

// Páginas adicionales
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import Catalogo from "./pages/Catalogo"

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;

