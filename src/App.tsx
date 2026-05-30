import { lazy, Suspense, useEffect } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import SkipToContent from './components/ui/SkipToContent';
import BackToTop from './components/ui/BackToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ── Eagerly loaded: hot paths users hit on first visit ──────────────────
// Home + Services + Government + Document are bundled into the main chunk
// so the landing experience and the most-trafficked pages render instantly
// with no skeleton flash.
import Home from './pages/Home';
import Services from './pages/Services';
import Government from './pages/Government';
import Document from './pages/Document';

// ── Lazy loaded: long-tail / rarely-visited pages ───────────────────────
// Each becomes its own JS chunk, fetched only when the route is hit.
// This trims the initial bundle without bringing back the home-page
// scroll-skeleton flash (those were component-level lazy loads).
const About = lazy(() => import('./pages/About'));
const SearchPage = lazy(() => import('./pages/Search'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const Hotlines = lazy(() => import('./pages/Hotlines'));
const Holidays = lazy(() => import('./pages/Holidays'));
const Attractions = lazy(() => import('./pages/Attractions'));

// ── Hover / focus prefetch ──────────────────────────────────────────────
// When the user hovers (or keyboard-focuses) any anchor that targets a
// lazy route, we eagerly start downloading the chunk. By the time the
// click actually fires (~200–400 ms later for mouse users), Vite has
// already cached the module — the Suspense fallback is skipped entirely.
//
// This is the same pattern Next.js and Remix apply automatically; with
// plain React Router we wire it up once at the document level so no
// <Link> call site has to change.
const ROUTE_PREFETCHERS: Record<string, () => Promise<unknown>> = {
  '/about': () => import('./pages/About'),
  '/search': () => import('./pages/Search'),
  '/sitemap': () => import('./pages/Sitemap'),
  '/accessibility': () => import('./pages/Accessibility'),
  '/philippines/hotlines': () => import('./pages/Hotlines'),
  '/philippines/holidays': () => import('./pages/Holidays'),
  '/attractions': () => import('./pages/Attractions'),
};

function useRoutePrefetch() {
  useEffect(() => {
    const prefetched = new Set<string>();

    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || prefetched.has(href)) return;
      const load = ROUTE_PREFETCHERS[href];
      if (load) {
        prefetched.add(href);
        load().catch(() => prefetched.delete(href));
      }
    };

    document.addEventListener('mouseover', handler, { passive: true });
    document.addEventListener('focusin', handler, { passive: true });
    return () => {
      document.removeEventListener('mouseover', handler);
      document.removeEventListener('focusin', handler);
    };
  }, []);
}

// Minimal fallback while a lazy chunk is being fetched. Kept intentionally
// plain — no spinner, no skeleton — because the chunks are small (~10–80 kB
// gzipped) and most users on broadband never see this for more than a frame.
function RouteFallback() {
  return (
    <div className="container mx-auto px-4 py-16 text-center text-sm text-gray-500">
      Loading…
    </div>
  );
}

function App() {
  useRoutePrefetch();
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <SkipToContent />
            <Navbar />
            <ScrollToTop />
            <div id="main-content" className="flex flex-1 flex-col">
              <Suspense fallback={<RouteFallback />}>
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
              </Suspense>
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
