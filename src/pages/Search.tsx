import { FormEvent, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { serviceCategories, governmentCategories } from '../data/yamlLoader';
import { SAN_PABLO_QUICK_SERVICES } from '../data/homeContent';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: 'Quick Service' | 'Service Category' | 'Government';
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);

  const searchItems = useMemo<SearchItem[]>(() => {
    const quickServiceItems: SearchItem[] = SAN_PABLO_QUICK_SERVICES.map(
      service => ({
        title: service.title,
        description: service.description,
        href: service.href,
        type: 'Quick Service',
      })
    );

    const serviceCategoryItems: SearchItem[] = serviceCategories.categories.map(
      category => ({
        title: category.category,
        description: category.description,
        href: `/services/${category.slug}`,
        type: 'Service Category',
      })
    );

    const governmentItems: SearchItem[] = governmentCategories.categories.map(
      category => ({
        title: category.category,
        description: category.description,
        href: `/government/${category.slug}`,
        type: 'Government',
      })
    );

    return [...quickServiceItems, ...serviceCategoryItems, ...governmentItems];
  }, []);

  const normalizedQuery = initialQuery.trim().toLowerCase();
  const filteredItems = useMemo(() => {
    if (!normalizedQuery) {
      return searchItems;
    }

    return searchItems.filter(item => {
      const searchableText =
        `${item.title} ${item.description} ${item.type}`.toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery, searchItems]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchParams({});
      return;
    }

    setSearchParams({ q: trimmed });
  };

  return (
    <>
      <SEO
        title="Search"
        description="Search services, departments, and quick links in San Pablo City."
        keywords="San Pablo search, government services search, local government"
      />
      <Section>
        <Heading level={2}>Search Services and Departments</Heading>
        <Text className="text-gray-600 mb-6">
          Find government services, offices, and quick actions for San Pablo
          City.
        </Text>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search services, departments..."
              className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Search
          </button>
        </form>

        <p className="text-sm text-gray-600 mb-4">
          {filteredItems.length} result{filteredItems.length === 1 ? '' : 's'}
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <Link key={`${item.type}-${item.title}`} to={item.href}>
              <Card
                hoverable
                className="h-full border border-gray-200 transition-transform duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
              >
                <CardContent className="p-5">
                  <span className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700">
                    {item.type}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
};

export default SearchPage;
