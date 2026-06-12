import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guardas from './pages/Guardas';
import Professores from './pages/Professores';
import CarreiraPublica from './pages/CarreiraPublica';
import CarreiraPrivada from './pages/CarreiraPrivada';
import Sobre from './pages/Sobre';
import InfoPage from './pages/InfoPage';
import NotFound from './pages/NotFound';
import Prematricula from './pages/Prematricula';

// Rotas que exibem layout próprio (sem header/footer do site)
const FULL_PAGE_ROUTES = ['/prematricula'];

function AppContent() {
  const location = useLocation();
  const isFullPage = FULL_PAGE_ROUTES.includes(location.pathname);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isFullPage && <Header />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guardas" element={<Guardas />} />
          <Route path="/professores" element={<Professores />} />
          <Route path="/carreira-publica" element={<CarreiraPublica />} />
          <Route path="/carreira-privada" element={<CarreiraPrivada />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/info/:slug" element={<InfoPage />} />
          <Route path="/prematricula" element={<Prematricula />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isFullPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
