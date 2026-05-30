import { useTranslation } from 'react-i18next';
import Hero from '../sections/Hero';

export default function HeroSection() {
  const { t } = useTranslation('common');
  return (
    <Hero
      locationLabel={t('hero.locationLabel')}
      heading={t('hero.heading')}
      subtitle={t('hero.subtitle')}
      primaryCtaLabel={t('hero.primaryCta')}
      primaryCtaHref="/services"
      secondaryCtaLabel={t('hero.secondaryCta')}
      secondaryCtaHref="/government"
    />
  );
}
