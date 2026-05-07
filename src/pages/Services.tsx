import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

// Color rotation for cards — same pattern as Government / Transparency / Statistics
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

const Services: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return serviceCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
          keywords="government services, public services, local government, civic services"
        />
        <ServicesSection
          title={`All local government services`}
          description={`All services provided by the ${import.meta.env.VITE_GOVERNMENT_NAME} government. Find what you need for citizenship, business, education, and more.`}
        />
      </>
    );
  }

  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />

      <Section className="mb-12">
        <Breadcrumbs className="mb-8" />

        {/* Header — same colorful pill-badge style as Government / Transparency / Statistics */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
              {Icon && <Icon className="h-3.5 w-3.5" />}
              {categoryData.category || category}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              {categoryData.category || category}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
              {categoryData.description}
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary-400 hover:text-primary-600"
          >
            All services
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex animate-pulse flex-col items-center justify-center gap-3 py-16">
            <div className="h-3 w-32 rounded-full bg-gray-200" />
            <p className="text-sm text-gray-400">Loading services…</p>
          </div>
        ) : subcategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="text-sm text-gray-500">
              No service pages have been published yet for this category. Please check back soon.
            </p>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                {categoryIndex.title}
              </h2>
            )}
            {categoryIndex.description && (
              <p className="mb-6 max-w-2xl text-sm text-gray-500">
                {categoryIndex.description}
              </p>
            )}

            {/* Cards — colorful style matching Government / Transparency / Statistics */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {subcategories.map((subcategory, idx) => {
                const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                return (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                    className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md"
                  >
                    {/* Icon + badge row */}
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent.iconBg}`}
                        aria-hidden="true"
                      >
                        {Icon ? (
                          <Icon className="h-5 w-5" />
                        ) : (
                          <LucideIcons.FileText className="h-5 w-5" />
                        )}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${accent.badge}`}
                      >
                        {categoryData.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {subcategory.name}
                    </h3>
                    {subcategory.description && (
                      <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-500">
                        {subcategory.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-600">
                      View details
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </Section>
    </>
  );
};

export default Services;
