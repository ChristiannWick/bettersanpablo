import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Banner } from '@bettergov/kapwa/banner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as LucideIcons from 'lucide-react';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { Card, CardContent, CardHeader } from '@bettergov/kapwa/card';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  serviceCategories,
  governmentCategories,
  getCategorySubcategories,
  isNestedCategory,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import SEO from '../components/SEO';
import StatsPageCharts from '../components/government/StatsPageCharts';

// Track the active category info for the rich page hero
interface ActiveCategory {
  category: string;
  slug: string;
  icon: string;
  description?: string;
}

interface DocumentProps {
  theme?: string;
  categoryType?: 'service' | 'government';
}

export default function Document({
  theme: initialTheme = 'default',
  categoryType,
}: DocumentProps) {
  const { documentSlug, category } = useParams();
  const { i18n } = useTranslation();
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const [nestedIndex, setNestedIndex] = useState<CategoryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<ActiveCategory | null>(null);

  const markdownComponents = createMarkdownComponents(
    getTypographyTheme(initialTheme)
  );

  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: 'Home', href: '/' },
  ]);

  useEffect(() => {
    if (!documentSlug || !category || !categoryType) {
      setError('No document specified');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const isGovernment = categoryType === 'government';
        const categories = isGovernment
          ? governmentCategories.categories
          : serviceCategories.categories;
        const sectionLabel = isGovernment ? 'Government' : 'Services';
        const sectionHref = isGovernment ? '/government' : '/services';
        const categoryData = categories.find(c => c.slug === category);

        if (categoryData) {
          setActiveCategory({
            category: categoryData.category,
            slug: categoryData.slug,
            icon: categoryData.icon,
            description: categoryData.description,
          });
        } else {
          setActiveCategory(null);
        }

        // If the slug maps to its own index, render it as a nested listing
        if (isNestedCategory(documentSlug)) {
          const index = await getCategorySubcategories(documentSlug);
          setNestedIndex(index);
          setBreadcrumbs([
            { label: 'Home', href: '/' },
            { label: sectionLabel, href: sectionHref },
            {
              label: categoryData?.category ?? category,
              href: `${sectionHref}/${category}`,
            },
            {
              label: documentSlug,
              href: `${sectionHref}/${category}/${documentSlug}`,
            },
          ]);
          return;
        }

        const content = await loadMarkdownContent(
          documentSlug,
          category,
          categoryType
        );
        setMarkdownContent(content);

        setBreadcrumbs([
          { label: 'Home', href: '/' },
          { label: sectionLabel, href: sectionHref },
          {
            label: categoryData?.category ?? category,
            href: `${sectionHref}/${category}`,
          },
          {
            label: content.title ?? documentSlug,
            href: `${sectionHref}/${category}/${documentSlug}`,
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load document'
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [documentSlug, category, categoryType, i18n.language]);

  if (loading) {
    return (
      <Section className="p-3 mb-12">
        <Banner type="info" description="Loading document..." />
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Banner
          type="error"
          title="Document Not Found"
          description={error}
          icon
        />
      </Section>
    );
  }

  if (nestedIndex) {
    const nestedPages: Subcategory[] = nestedIndex.pages;
    return (
      <>
        <SEO
          title={documentSlug}
          keywords={`${documentSlug}, government services, local government`}
        />
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" items={breadcrumbs} />
          {nestedIndex.title && (
            <Heading level={2}>{nestedIndex.title}</Heading>
          )}
          {nestedIndex.description && (
            <Text className="text-gray-600 mb-4">
              {nestedIndex.description}
            </Text>
          )}
          {nestedIndex.layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nestedPages.map((page, i) => (
                <Card hoverable key={page.slug ?? i} className="h-full">
                  <CardContent>
                    <h4 className="text-lg font-medium text-gray-900">
                      {page.name}
                    </h4>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {page.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {nestedPages.map((page, i) => (
                <Card key={page.slug ?? i} className="mb-4">
                  <CardContent>
                    <h4 className="text-lg font-medium text-gray-900">
                      {page.name}
                    </h4>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {page.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!markdownContent) {
    return null;
  }

  return (
    <>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description ||
          `Government service information for ${documentSlug}`
        }
        keywords={`${documentSlug}, government services, public services, local government`}
      />
      <Section className="mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />

        {/* ── Rich page hero (Attractions-style) ── */}
        {activeCategory && (
          <DocumentHero
            categoryName={activeCategory.category}
            categoryIcon={activeCategory.icon}
            title={markdownContent.title || documentSlug || ''}
            description={markdownContent.description}
            sectionType={categoryType}
          />
        )}

        {/* Inject relevant charts at top of statistics detail pages */}
        {category === 'reports-and-statistics' && documentSlug && (
          <StatsPageCharts documentSlug={documentSlug} />
        )}

        <Card className="mb-8 markdown-content">
          <CardHeader>
            {!activeCategory && markdownContent.description && (
              <CardContent>{markdownContent.description}</CardContent>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdownContent.content}
            </ReactMarkdown>
          </CardHeader>
        </Card>
      </Section>
    </>
  );
}

// ── Rich page hero — used at the top of every service / government page ──
// Mirrors the look & feel of the Attractions page hero so detail pages
// feel cohesive across the site.

const HERO_ACCENTS: Record<string, { badge: string; ring: string }> = {
  service: {
    badge: 'bg-emerald-100 text-emerald-700',
    ring: 'ring-emerald-100',
  },
  government: {
    badge: 'bg-blue-100 text-blue-700',
    ring: 'ring-blue-100',
  },
};

function DocumentHero({
  categoryName,
  categoryIcon,
  title,
  description,
  sectionType,
}: {
  categoryName: string;
  categoryIcon: string;
  title: string;
  description?: string;
  sectionType?: 'service' | 'government';
}) {
  const Icon =
    (LucideIcons[categoryIcon as keyof typeof LucideIcons] as
      | React.ComponentType<{ className?: string }>
      | undefined) ?? LucideIcons.FileText;

  const accent = HERO_ACCENTS[sectionType ?? 'service'] ?? HERO_ACCENTS.service;
  const sectionLabel = sectionType === 'government' ? 'Government' : 'Services';

  // Strip an "— San Pablo City" suffix if present so the H1 is shorter
  const cleanTitle = title.replace(/\s*[—-]\s*San Pablo.*$/i, '').trim();

  return (
    <div className="mb-8">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${accent.badge}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {sectionLabel} · {categoryName}
      </span>
      <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
        {cleanTitle}
      </h1>
      {description && (
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}
