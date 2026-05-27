import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guardas from './pages/Guardas';
import Professores from './pages/Professores';
import CarreiraPublica from './pages/CarreiraPublica';
import CarreiraPrivada from './pages/CarreiraPrivada';
import Sobre from './pages/Sobre';
import InfoPage from './pages/InfoPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/guardas" element={<Guardas />} />
            <Route path="/professores" element={<Professores />} />
            <Route path="/carreira-publica" element={<CarreiraPublica />} />
            <Route path="/carreira-privada" element={<CarreiraPrivada />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
