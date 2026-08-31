import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppStateProvider } from './context/AppState';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';
import WordlePage from './pages/WordlePage';
import ConnectionsPage from './pages/ConnectionsPage';
import ContextoPage from './pages/ContextoPage';
import Game2048Page from './pages/Game2048Page';
import MathlerPage from './pages/MathlerPage';
import DinoRunnerPage from './pages/DinoRunnerPage';
import SnakePage from './pages/SnakePage';
import MemoryPage from './pages/MemoryPage';
import FargminnePage from './pages/FargminnePage';
import OmOssPage from './pages/OmOssPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <AppStateProvider>
      <Router>
        <ScrollToTop />
        <div className="pp-app">
          <div className="pp-gridbg" aria-hidden="true" />
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wordle" element={<WordlePage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/contexto" element={<ContextoPage />} />
          <Route path="/2048" element={<Game2048Page />} />
          <Route path="/mathler" element={<MathlerPage />} />
          <Route path="/kaffehopp" element={<DinoRunnerPage />} />
          <Route path="/pluggorm" element={<SnakePage />} />
          <Route path="/minne" element={<MemoryPage />} />
          <Route path="/fargminne" element={<FargminnePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/om-oss" element={<OmOssPage />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
