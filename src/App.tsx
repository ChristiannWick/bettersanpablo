import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import SkipToContent from './components/ui/SkipToContent';
import BackToTop from './components/ui/BackToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import Government from './pages/Government';
import About from './pages/About';
import SearchPage from './pages/Search';
import Sitemap from './pages/Sitemap';
import Accessibility from './pages/Accessibility';
import Hotlines from './pages/Hotlines';
import Holidays from './pages/Holidays';
import Attractions from './pages/Attractions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <SkipToContent />
            <Navbar />
            <ScrollToTop />
            <div id="main-content" className="flex flex-1 flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services/:category" element={<Services />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="/philippines/hotlines" element={<Hotlines />} />
                <Route path="/philippines/holidays" element={<Holidays />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route
                  path="/services/:category/:documentSlug"
                  element={<Document categoryType="service" />}
                />
                <Route path="/government/:category" element={<Government />} />
                <Route path="/government" element={<Government />} />
                <Route
                  path="/government/:category/:documentSlug"
                  element={<Document categoryType="government" />}
                />
                <Route path="/:lang/:documentSlug" element={<Document />} />
                <Route path="/:documentSlug" element={<Document />} />
              </Routes>
            </div>
            <Footer />
            <BackToTop />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
