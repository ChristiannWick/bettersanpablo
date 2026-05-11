import HeroSection from '../components/home/HeroSection';
import OnlineServicesSection from '../components/home/OnlineServicesSection';
import ContactSection from '../components/home/ContactSection';
import HighlightsSection from '../components/home/HighlightsSection';
import StatsSection from '../components/home/StatsSection';
import AboutSection from '../components/home/AboutSection';
import LeadershipSection from '../components/home/LeadershipSection';
import PlacesSection from '../components/home/PlacesSection';
import HistorySection from '../components/home/HistorySection';
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
        {/* Hero with integrated search and popular services */}
        <HeroSection />

        {/* Official city online portals — sourced from sanpablocity.gov.ph */}
        <OnlineServicesSection />

        {/* Visual city showcase */}
        <HighlightsSection />

        {/* Key city statistics */}
        <StatsSection />

        {/* About the city */}
        <AboutSection />

        {/* City leadership */}
        <LeadershipSection />

        {/* Top places */}
        <PlacesSection />

        {/* History timeline */}
        <HistorySection />

        {/* Contact city hall */}
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
