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
          <Card
            key={category.slug}
            hoverable
            className="border-t-4 border-primary-500"
          >
            <Link
              to={`/services/${category.slug}`}
              className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
            >
              <CardContent className="flex flex-col h-full p-6">
                <div className="flex gap-2">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-md mb-4 self-start">
                    {getIcon(category.icon)}
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-gray-900 self-center">
                    {category.category}
                  </h3>
                </div>
                <Text className="text-gray-800">{category.description}</Text>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
