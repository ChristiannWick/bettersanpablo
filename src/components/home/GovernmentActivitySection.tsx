import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router-dom';
import { governmentCategories } from '../../data/yamlLoader';

interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
}

// Categories hidden from the /government overview grid:
//  - transparency-documents + reports-and-statistics have their own
//    top-level navbar entries (Transparency, Statistics).
//  - news + public-consultations are explainer / pointer pages without
//    live data feeds. We hide them from the landing grid (and the nav)
//    so users don't click into pages that just say "go to the official
//    site or Facebook page." The markdown files remain in place — direct
//    URLs still resolve — so we can flip these back on the moment real
//    news / consultation data is wired up. See CLAUDE.md "Pending /
//    Known Gaps" for the broader content roadmap.
const EXCLUDED = new Set([
  'transparency-documents',
  'reports-and-statistics',
  'news',
  'public-consultations',
]);

const getIcon = (name: string) => {
  const Icon = LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
  return Icon ? <Icon className="h-6 w-6" /> : null;
};

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
}

export default function GovernmentActivitySection({
  title,
  description,
}: GovernmentActivitySectionProps = {}) {
  const displayedCategories = (governmentCategories.categories as Category[])
    .filter(cat => !EXCLUDED.has(cat.slug));

  return (
    <Section id="government">
      <span className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
        Government
      </span>
      <Heading level={2} className="mt-3">
        {title || 'Government Activity'}
      </Heading>
      <Text className="text-gray-600 mb-6">
        {description || 'Stay updated with the latest local government activities and announcements.'}
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Link
            key={category.slug}
            to={`/government/${category.slug}`}
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
                <p className="mt-2 text-sm text-gray-600 flex-1">
                  {category.description}
                </p>
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
