import Hero from '../sections/Hero';
import { SAN_PABLO_HERO } from '../../data/homeContent';

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
    />
  );
}
