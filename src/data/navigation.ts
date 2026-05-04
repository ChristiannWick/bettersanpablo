import type { NavigationItem } from '../types';
import {
  serviceCategories as servicesData,
  governmentCategories as govData,
  transparencyDocumentPages,
  reportsStatisticsPages,
} from './yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

// Slugs handled by their own top-level nav items — exclude from Government dropdown
const GOV_NAV_EXCLUDED = new Set([
  'transparency-documents',
  'reports-and-statistics',
]);

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: (servicesData.categories as Category[]).map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government/departments',
    children: (govData.categories as Category[])
      .filter(cat => !GOV_NAV_EXCLUDED.has(cat.slug))
      .map(cat => ({
        label: cat.category,
        href: `/government/${cat.slug}`,
      })),
  },
  {
    label: 'Transparency',
    href: '/government/transparency-documents',
    children: transparencyDocumentPages.map(page => ({
      label: page.name,
      href: `/government/transparency-documents/${page.slug}`,
    })),
  },
  {
    label: 'Statistics',
    href: '/government/reports-and-statistics',
    children: reportsStatisticsPages.map(page => ({
      label: page.name,
      href: `/government/reports-and-statistics/${page.slug}`,
    })),
  },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About the Portal', href: '/about' },
        // { label: 'Privacy Policy', href: '/privacy' },
        // { label: 'Terms of Use', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Contact Us', href: '/about' },
        { label: 'Community Discord', href: '/discord' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'All Services', href: '/services' },
        ...(servicesData.categories as Category[])
          .slice(0, 6)
          .map(category => ({
            label: category.category,
            href: `/services/${category.slug}`,
          })),
        { label: 'Hotlines', href: '/philippines/hotlines' },
        { label: 'Holidays', href: '/philippines/holidays' },
      ],
    },
    {
      title: 'Official Links',
      links: [
        {
          label: 'sanpablocity.gov.ph',
          href: 'https://www.sanpablocity.gov.ph',
        },
        {
          label: 'Real Property Tax',
          href: 'https://realpropertytax.sanpablocity.gov.ph',
        },
        {
          label: 'Business Permits (BPLO)',
          href: 'https://bplo.sanpablocity.gov.ph',
        },
        {
          label: 'eLGU San Pablo',
          href: 'https://elgu-city-of-san-pablo-laguna.e.gov.ph',
        },
        {
          label: 'Water District (SPCWD)',
          href: 'https://www.spcwd.org.ph',
        },
        {
          label: 'Disclosure Portal',
          href: 'https://www.sanpablocity.gov.ph/disclosure-portal',
        },
      ],
    },
  ],
  socialLinks: [{ label: 'Facebook', href: 'https://www.facebook.com/ciospc' }],
};
