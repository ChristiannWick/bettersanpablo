import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Government: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
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
          title="Government"
          description={`All government information for the ${import.meta.env.VITE_GOVERNMENT_NAME} — departments, officials, council, and contacts.`}
          keywords="government, public officials, local government, departments, contacts"
        />
        <GovernmentActivitySection
          title={`San Pablo City Government`}
          description={`Departments, officials, council, and contact directory for the City Government of San Pablo, Laguna.`}
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
        keywords={`${categoryData.category}, San Pablo City government, public officials, local government`}
      />

      <Section className="mb-12">
        <Breadcrumbs className="mb-8" />

        {/* Header — matches ServicesSection clean style */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {categoryData.category || category}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              {categoryData.description}
            </p>
          </div>
          <Link
            to="/government"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary-400 hover:text-primary-600"
          >
            All government
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex animate-pulse flex-col items-center justify-center gap-3 py-16">
            <div className="h-3 w-32 rounded-full bg-gray-200" />
            <p className="text-sm text-gray-400">Loading…</p>
          </div>
        ) : subcategories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <p className="text-sm text-gray-500">
              No pages have been published yet for this category. Please check back soon.
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

            {/* Cards — same clean style as Services */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {subcategories.map(subcategory => (
                <Link
                  key={subcategory.slug ?? subcategory.name}
                  to={`/government/${category}/${subcategory.slug ?? ''}`}
                  className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
                >
                  <Card className="h-full border border-gray-200 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary-300 group-hover:shadow-md">
                    <CardContent className="flex flex-col h-full p-6">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                        {Icon ? (
                          <Icon className="h-6 w-6" />
                        ) : (
                          <LucideIcons.Building2 className="h-6 w-6" />
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {subcategory.name}
                      </h3>
                      {subcategory.description && (
                        <p className="mt-2 text-sm text-gray-600 flex-1">
                          {subcategory.description}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
};

export default Government;
