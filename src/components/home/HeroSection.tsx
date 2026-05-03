import Hero from '../sections/Hero';
import { SAN_PABLO_HERO } from '../../data/homeContent';

const QUICK_ACCESS = [
  { label: 'National ID', href: '/services?q=National%20ID' },
  { label: 'Birth Certificate', href: '/services?q=Birth%20Certificate' },
  {
    label: 'Business Permit',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: 'Senior / PWD',
    href: '/services/social-welfare/apply-for-senior-citizen-solo-parent-or-pwd-assistance',
  },
];

export default function HeroSection() {
  return (
    <Hero
      locationLabel={SAN_PABLO_HERO.locationLabel}
      heading={SAN_PABLO_HERO.heading}
      subtitle={SAN_PABLO_HERO.subtitle}
      primaryCtaLabel={SAN_PABLO_HERO.primaryCtaLabel}
      primaryCtaHref={SAN_PABLO_HERO.primaryCtaHref}
      secondaryCtaLabel={SAN_PABLO_HERO.secondaryCtaLabel}
      secondaryCtaHref={SAN_PABLO_HERO.secondaryCtaHref}
      searchPlaceholder={SAN_PABLO_HERO.searchPlaceholder}
      quickAccessItems={QUICK_ACCESS}
    />
  );
}
