import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { serviceCategories, governmentCategories } from '../data/yamlLoader';

interface Category {
  category: string;
  slug: string;
  subcategories?: { name: string; slug: string }[];
}

const Sitemap: React.FC = () => {
  const services = (serviceCategories.categories as Category[]) || [];
  const govCategories = (governmentCategories.categories as Category[]) || [];

  return (
    <>
      <SEO
        title="Sitemap"
        description="Full sitemap of BetterSanPablo.org — all pages and sections of the portal."
        keywords="sitemap, San Pablo City, portal pages"
      />
      <Section>
        <div className="max-w-4xl">
          <Heading level={2}>Sitemap</Heading>
          <p className="text-gray-600 mb-8">
            A complete overview of all pages available on BetterSanPablo.org.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Main */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Main
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About San Pablo', href: '/about' },
                  { label: 'Search', href: '/search' },
                  { label: 'Accessibility', href: '/accessibility' },
                  { label: 'Sitemap', href: '/sitemap' },
                ].map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/services"
                    className="text-primary-600 hover:underline text-sm font-medium"
                  >
                    All Services
                  </Link>
                </li>
                {services.map(cat => (
                  <li key={cat.slug} className="pl-3 border-l-2 border-gray-200">
                    <Link
                      to={`/services/${cat.slug}`}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {cat.category}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/philippines/hotlines"
                    className="text-primary-600 hover:underline text-sm"
                  >
                    Emergency Hotlines
                  </Link>
                </li>
                <li>
                  <Link
                    to="/philippines/holidays"
                    className="text-primary-600 hover:underline text-sm"
                  >
                    Public Holidays
                  </Link>
                </li>
              </ul>
            </div>

            {/* Government */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Government
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/government"
                    className="text-primary-600 hover:underline text-sm font-medium"
                  >
                    Government Overview
                  </Link>
                </li>
                {govCategories.map(cat => (
                  <li key={cat.slug} className="pl-3 border-l-2 border-gray-200">
                    <Link
                      to={`/government/${cat.slug}`}
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {cat.category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* External */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-3">
                External Links
              </h3>
              <ul className="space-y-2">
                {[
                  {
                    label: 'San Pablo City Official Website',
                    href: 'https://www.sanpablocity.gov.ph',
                  },
                  {
                    label: 'Disclosure Portal',
                    href: 'https://www.sanpablocity.gov.ph/disclosure-portal',
                  },
                  { label: 'eGov PH', href: 'https://egov.ph' },
                  {
                    label: 'GitHub Repository',
                    href: 'https://github.com/ChristiannWick/better-lgu-directory',
                  },
                ].map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline text-sm"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Sitemap;
