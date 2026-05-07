import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { serviceCategories } from '../../data/yamlLoader';
import { SAN_PABLO_QUICK_SERVICES } from '../../data/homeContent';
import { cn } from '../../lib/utils';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

type ServicesSectionVariant = 'quick' | 'catalog';

interface ServicesSectionProps {
  title?: string;
  description?: string;
  variant?: ServicesSectionVariant;
  className?: string;
}

// Color rotation — same pattern as Services.tsx, Government.tsx
const CARD_ACCENTS = [
  { badge: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-50 text-blue-600' },
  { badge: 'bg-emerald-100 text-emerald-700', iconBg: 'bg-emerald-50 text-emerald-600' },
  { badge: 'bg-orange-100 text-orange-700', iconBg: 'bg-orange-50 text-orange-600' },
  { badge: 'bg-purple-100 text-purple-700', iconBg: 'bg-purple-50 text-purple-600' },
  { badge: 'bg-cyan-100 text-cyan-700', iconBg: 'bg-cyan-50 text-cyan-600' },
  { badge: 'bg-pink-100 text-pink-700', iconBg: 'bg-pink-50 text-pink-600' },
  { badge: 'bg-amber-100 text-amber-700', iconBg: 'bg-amber-50 text-amber-600' },
  { badge: 'bg-red-100 text-red-700', iconBg: 'bg-red-50 text-red-600' },
];

export default function ServicesSection({
  title,
  description,
  variant = 'catalog',
  className,
}: ServicesSectionProps) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const displayedCategories = serviceCategories.categories as Category[];

  // ── Quick Services variant (home page) ─────────────────────────────
  if (variant === 'quick') {
    return (
      <Section className={cn('bg-slate-50', className)}>
        <Heading level={2}>{title || 'Quick Services'}</Heading>
        <Text className="text-gray-600 mb-6">
          {description ||
            'Start with the most requested services for residents, workers, and business owners.'}
        </Text>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAN_PABLO_QUICK_SERVICES.map(service => (
            <Link key={service.title} to={service.href} className="h-full">
              <Card
                hoverable
                className="h-full border border-gray-200 transition-transform duration-200 hover:-translate-y-0.5 hover:border-primary-400"
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 flex-1">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-700">
                    Open Service
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    );
  }

  // ── Catalog variant (parent /services page) ────────────────────────
  // Same colorful card style as Government / Transparency / Statistics
  return (
    <Section className={className}>
      <Heading level={2}>{title || t('services.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('services.description')}
      </Text>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayedCategories.map((category, idx) => {
          const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
          return (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent.iconBg}`}
                  aria-hidden="true"
                >
                  {getIcon(category.icon)}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${accent.badge}`}
                >
                  Services
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {category.category}
              </h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-500">
                {category.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-600">
                View details
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
