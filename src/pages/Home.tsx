import { Suspense, lazy } from 'react';
import HeroSection from '../components/home/HeroSection';
import OnlineServicesSection from '../components/home/OnlineServicesSection';
import ContactSection from '../components/home/ContactSection';
import SEO from '../components/SEO';

const HighlightsSection = lazy(() => import('../components/home/HighlightsSection'));
const StatsSection = lazy(() => import('../components/home/StatsSection'));
const AboutSection = lazy(() => import('../components/home/AboutSection'));
const LeadershipSection = lazy(() => import('../components/home/LeadershipSection'));
const PlacesSection = lazy(() => import('../components/home/PlacesSection'));
const HistorySection = lazy(() => import('../components/home/HistorySection'));

const HomeSectionLoader = () => (
  <section className="py-12">
    <div className="container mx-auto px-4">
      <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />
      <div className="mt-4 h-4 w-full max-w-3xl animate-pulse rounded bg-gray-200" />
      <div className="mt-2 h-4 w-11/12 max-w-2xl animate-pulse rounded bg-gray-200" />
    </div>
  </section>
);

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Community-powered portal for San Pablo City, Laguna, the City of Seven Lakes. Access local government services, public information, and transparency resources."
        keywords="San Pablo City, Laguna, City of Seven Lakes, government services, transparency portal, public services"
      />
      <main className="flex-grow">
        {/* Hero with integrated search and popular services */}
        <HeroSection />

        {/* Official city online portals — sourced from sanpablocity.gov.ph */}
        <OnlineServicesSection />

        {/* Visual city showcase */}
        <Suspense fallback={<HomeSectionLoader />}>
          <HighlightsSection />
        </Suspense>

        {/* Key city statistics */}
        <Suspense fallback={<HomeSectionLoader />}>
          <StatsSection />
        </Suspense>

        {/* About the city */}
        <Suspense fallback={<HomeSectionLoader />}>
          <AboutSection />
        </Suspense>

        {/* City leadership */}
        <Suspense fallback={<HomeSectionLoader />}>
          <LeadershipSection />
        </Suspense>

        {/* Top places */}
        <Suspense fallback={<HomeSectionLoader />}>
          <PlacesSection />
        </Suspense>

        {/* History timeline */}
        <Suspense fallback={<HomeSectionLoader />}>
          <HistorySection />
        </Suspense>

        {/* Contact city hall */}
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
