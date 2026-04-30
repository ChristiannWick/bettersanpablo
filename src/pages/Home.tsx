import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import HighlightsSection from '../components/home/HighlightsSection';
import HistorySection from '../components/home/HistorySection';
import PlacesSection from '../components/home/PlacesSection';
import StatsSection from '../components/home/StatsSection';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';

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
        <HighlightsSection />
        <AboutSection />
        <HistorySection />
        <PlacesSection />
        <StatsSection />
      </main>
    </>
  );
};

export default Home;
