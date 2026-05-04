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
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const displayedCategories = serviceCategories.categories as Category[];

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

  return (
    <Section className={className}>
      <Heading level={2}>{title || t('services.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('services.description')}
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Link
            key={category.slug}
            to={`/services/${category.slug}`}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          >
            <Card className="h-full border border-gray-200 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary-300 group-hover:shadow-md">
              <CardContent className="flex flex-col h-full p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {category.category}
                </h3>
                <Text className="mt-2 text-sm text-gray-600 flex-1">
                  {category.description}
                </Text>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
