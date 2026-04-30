export interface QuickServiceItem {
  title: string;
  description: string;
  href: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface HistoryTimelineEntry {
  period: string;
  points: string[];
}

export interface PlaceToVisitItem {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface CityStat {
  value: string;
  label: string;
}

export const SAN_PABLO_HERO = {
  locationLabel: 'SAN PABLO CITY, LAGUNA',
  heading: 'Services and City Information, All in One Place',
  subtitle:
    'BetterSanPablo.org helps residents access local services, permits, and trusted public information for the City of Seven Lakes.',
  primaryCtaLabel: 'View All Services',
  primaryCtaHref: '/services',
  secondaryCtaLabel: 'Government',
  secondaryCtaHref: '/government',
  searchPlaceholder: 'Search services, departments...',
};

export const SAN_PABLO_QUICK_SERVICES: QuickServiceItem[] = [
  {
    title: 'National ID',
    description: 'Check requirements and local assistance points for PhilSys.',
    href: '/services?q=National%20ID',
  },
  {
    title: 'Birth Certificate',
    description: 'Find guidance for civil registry document requests.',
    href: '/services?q=Birth%20Certificate',
  },
  {
    title: 'Business Permit',
    description: 'Start or renew your local business permit process.',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    title: 'Business Registration',
    description: 'Access permit and tax steps for business compliance.',
    href: '/services/business/renew-permits-and-pay-local-business-taxes',
  },
  {
    title: 'Health Assistance',
    description: 'Locate free check-ups, medicines, and health services.',
    href: '/services/health-services/get-free-check-ups-basic-medicines-and-vaccines',
  },
  {
    title: 'Senior and PWD Support',
    description: 'View available social welfare assistance programs.',
    href: '/services/social-welfare/apply-for-senior-citizen-solo-parent-or-pwd-assistance',
  },
];

export const SAN_PABLO_FEATURED_HIGHLIGHTS: HighlightItem[] = [
  {
    title: 'Seven Lakes and Scenic Landscapes',
    description:
      'San Pablo is nationally known for its cluster of volcanic crater lakes and mountain views.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sampaloc%20Lake%20in%20San%20Pablo%20City.jpg',
    imageAlt: 'Sampaloc Lake in San Pablo City at sunset',
  },
  {
    title: 'Tourism and Recreation',
    description:
      'Lakeside routes, local food spots, and eco-activities make the city a key Laguna destination.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Pandin,%20San%20Pablo,%20Laguna.jpg',
    imageAlt: 'Lake Pandin in San Pablo City, Laguna',
  },
  {
    title: 'Culture and Community Heritage',
    description:
      'From local museums to faith traditions, San Pablo preserves a rich cultural identity.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/MuseoSanPablojf7215%2002.JPG',
    imageAlt: 'Museo de San Pablo inside the old city hall complex',
  },
];

export const SAN_PABLO_ABOUT_PARAGRAPHS: string[] = [
  'Known as the City of Seven Lakes, San Pablo is a 1st class component city in Laguna with a strong identity shaped by nature, heritage, and community.',
  'Founded as San Pablo de los Montes and chartered as a city in 1940, it continues to grow as a center for public service, tourism, and local enterprise.',
];

export const SAN_PABLO_HISTORY_TIMELINE: HistoryTimelineEntry[] = [
  {
    period: 'Pre-Colonial Era',
    points: [
      'Settlements formed near forests and crater lakes.',
      'Fishing and agriculture sustained early communities.',
    ],
  },
  {
    period: 'Spanish Colonial Period (1586-1898)',
    points: [
      'The town became known as San Pablo de los Montes.',
      'Parish development shaped governance, planning, and faith life.',
    ],
  },
  {
    period: 'American Period (1898-1946)',
    points: [
      'Public infrastructure and education services expanded.',
      'Institutions transitioned to modern civil administration.',
    ],
  },
  {
    period: 'Modern Era',
    points: [
      'San Pablo was chartered as a city in 1940.',
      'Today it is recognized as Laguna\'s City of Seven Lakes.',
    ],
  },
];

export const SAN_PABLO_TOP_PLACES: PlaceToVisitItem[] = [
  {
    title: 'Sampaloc Lake',
    description:
      'The largest and most accessible lake, popular for lakeside walks and city views.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sampaloc%20Lake%20in%20San%20Pablo%20City.jpg',
    imageAlt: 'Sampaloc Lake in San Pablo City',
  },
  {
    title: 'Pandin Lake',
    description:
      'Known for clear water and bamboo-raft experiences managed by local communities.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Pandin,%20San%20Pablo,%20Laguna.jpg',
    imageAlt: 'Pandin Lake in San Pablo City',
  },
  {
    title: 'Yambo Lake',
    description:
      'A peaceful twin lake beside Pandin, ideal for quiet nature trips.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Yambo,%20San%20Pablo,%20Laguna.jpg',
    imageAlt: 'Yambo Lake in San Pablo City',
  },
  {
    title: 'Museo ng San Pablo',
    description:
      'A local museum that highlights the city\'s history, institutions, and cultural identity.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/MuseoSanPablojf7215%2002.JPG',
    imageAlt: 'Museo ng San Pablo in Laguna',
  },
];

export const SAN_PABLO_CITY_STATS: CityStat[] = [
  { value: '~285K+', label: 'Population' },
  { value: '1940', label: 'Year of Cityhood' },
  { value: '7', label: 'Number of Lakes' },
];
