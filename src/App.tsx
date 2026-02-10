import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';
import WordlePage from './pages/WordlePage';
import ConnectionsPage from './pages/ConnectionsPage';
import ContextoPage from './pages/ContextoPage';
import Game2048Page from './pages/Game2048Page';
import GeoGuessrPage from './pages/GeoGuessrPage';
import WikiGamePage from './pages/WikiGamePage';
import RedactlePage from './pages/RedactlePage';
import MathlerPage from './pages/MathlerPage';
import Football501Page from './pages/Football501Page';
import FifaNostalgiaPage from './pages/FifaNostalgiaPage';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface transition-colors duration-300">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wordle" element={<WordlePage />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          <Route path="/contexto" element={<ContextoPage />} />
          <Route path="/2048" element={<Game2048Page />} />
          <Route path="/geoguessr" element={<GeoGuessrPage />} />
          <Route path="/wikigame" element={<WikiGamePage />} />
          <Route path="/redactle" element={<RedactlePage />} />
          <Route path="/mathler" element={<MathlerPage />} />
          <Route path="/football501" element={<Football501Page />} />
          <Route path="/fifanostalgia" element={<FifaNostalgiaPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
