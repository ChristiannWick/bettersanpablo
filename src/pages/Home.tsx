import { Suspense, lazy } from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';

const HighlightsSection = lazy(() => import('../components/home/HighlightsSection'));
const AboutSection = lazy(() => import('../components/home/AboutSection'));
const HistorySection = lazy(() => import('../components/home/HistorySection'));
const LeadershipSection = lazy(() => import('../components/home/LeadershipSection'));
const PlacesSection = lazy(() => import('../components/home/PlacesSection'));
const StatsSection = lazy(() => import('../components/home/StatsSection'));

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
        <HeroSection />
        <ServicesSection variant="quick" />
        <Suspense fallback={<HomeSectionLoader />}>
          <HighlightsSection />
        </Suspense>
        <Suspense fallback={<HomeSectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<HomeSectionLoader />}>
          <HistorySection />
        </Suspense>
        <Suspense fallback={<HomeSectionLoader />}>
          <LeadershipSection />
        </Suspense>
        <Suspense fallback={<HomeSectionLoader />}>
          <PlacesSection />
        </Suspense>
        <Suspense fallback={<HomeSectionLoader />}>
          <StatsSection />
        </Suspense>
      </main>
    </>
  );
};

export default Home;
