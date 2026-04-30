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
  year: string;
  title: string;
  description: string;
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

export interface CityLeadershipEntry {
  position: string;
  name: string;
  note: string;
  priorities: string[];
}

export interface CoconutFestivalInfo {
  title: string;
  description: string;
  highlights: string[];
}

export const SAN_PABLO_HERO = {
  locationLabel: 'SAN PABLO CITY, LAGUNA',
  heading: 'BetterSanPablo.org',
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
      'San Pablo is nationally known for its cluster of volcanic crater lakes and mountain views across the city.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sampaloc%20Lake%20in%20San%20Pablo%20City.jpg',
    imageAlt: 'Sampaloc Lake in San Pablo City at sunset',
  },
  {
    title: 'Pandin Lake Eco-Tourism',
    description:
      'Pandin is known for clear waters, bamboo-raft experiences, and community-based tourism.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Pandin,%20San%20Pablo,%20Laguna.jpg',
    imageAlt: 'Lake Pandin in San Pablo City, Laguna',
  },
  {
    title: 'Yambo Lake Viewpoint',
    description:
      'Yambo, the twin lake of Pandin, offers calm waters and panoramic natural scenery.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Yambo,%20San%20Pablo,%20Laguna.jpg',
    imageAlt: 'Lake Yambo in San Pablo City, Laguna',
  },
  {
    title: 'Museo ng San Pablo',
    description:
      'The city museum preserves stories of local governance, heritage, and cultural identity.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/MuseoSanPablojf7215%2002.JPG',
    imageAlt: 'Museo de San Pablo inside the old city hall complex',
  },
  {
    title: 'Historic Cathedral and Plaza',
    description:
      'St. Paul the First Hermit Cathedral and its plaza remain central to faith and civic life.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/St.%20Paul%20the%20First%20Hermit%20Cathedral%20in%20San%20Pablo,%20Laguna.jpg',
    imageAlt: 'St. Paul the First Hermit Cathedral in San Pablo City',
  },
  {
    title: 'City Hall and Public Spaces',
    description:
      'Government facilities, parks, and public spaces support daily services and community events.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/San%20Pablo%20City%20Municipal%20Hall.jpg',
    imageAlt: 'San Pablo City Municipal Hall in Laguna',
  },
  {
    title: 'Lakeside Community Activities',
    description:
      'Boat rides and lakeside gatherings highlight how tourism and local livelihoods connect.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Balsa%20in%20San%20Pablo%20Laguna.jpg',
    imageAlt: 'Bamboo raft activity in San Pablo Laguna',
  },
  {
    title: 'Coco Festival Tradition',
    description:
      'San Pablo\'s Coco Festival celebrates local culture, coconut-based livelihood, and community creativity each year.',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/San%20Pablo%20City%20Coco%20Festival.jpg',
    imageAlt: 'Official poster for a recent San Pablo City Coco Festival edition',
  },
];

export const SAN_PABLO_ABOUT_PARAGRAPHS: string[] = [
  'Known as the City of Seven Lakes, San Pablo is a 1st class component city in Laguna with a strong identity shaped by nature, heritage, and community.',
  'Founded as San Pablo de los Montes and chartered as a city in 1940, it continues to grow as a center for public service, tourism, and local enterprise.',
];

export const SAN_PABLO_HISTORY_TIMELINE: HistoryTimelineEntry[] = [
  {
    year: '1571',
    title: 'Spanish Contact in Sampalok',
    description:
      'Spanish troops under Captain Juan de Salcedo reached the village of Sampalok, an early settlement of present-day San Pablo.',
  },
  {
    year: '1586',
    title: 'Parish Establishment',
    description:
      'Sampalok became a separate parish, helping shape the city\'s religious and civic core.',
  },
  {
    year: '1647',
    title: 'Municipality and Renaming',
    description:
      'Sampalok was separated as a municipality and renamed San Pablo de los Montes in honor of St. Paul the First Hermit.',
  },
  {
    year: '1940',
    title: 'City Charter Approved',
    description:
      'Commonwealth Act No. 520 was approved on May 7, 1940, granting San Pablo its city charter.',
  },
  {
    year: '1941',
    title: 'City Inauguration',
    description:
      'San Pablo City was inaugurated on March 30, 1941, marking the formal start of city governance.',
  },
  {
    year: '2025',
    title: '30th Coco Festival and Trade Fair',
    description:
      'The city celebrated the 30th Coco Festival, with a Coco Trade Fair that promoted coconut farmers, MSMEs, and local products.',
  },
  {
    year: '2025',
    title: 'Guinness Coconut Planting Record',
    description:
      'Thousands of volunteers in San Pablo joined a large-scale coconut planting activity recognized as a Guinness World Record event.',
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

export const SAN_PABLO_COCONUT_FESTIVAL: CoconutFestivalInfo = {
  title: 'Coco Festival of San Pablo',
  description:
    'The Coco Festival is one of San Pablo City\'s signature cultural events, celebrating local heritage and the coconut industry.',
  highlights: [
    'The 30th Coco Festival formally opened in January 2025 with a city trade fair.',
    'Festival activities highlight local products, entrepreneurship, and community participation.',
    'Recent city programs linked coconut planting and livelihood with environmental goals.',
  ],
};

export const SAN_PABLO_CITY_LEADERSHIP: CityLeadershipEntry[] = [
  {
    position: 'City Mayor',
    name: 'Arcadio "Najie" B. Gapangada Jr.',
    note: 'Won the 2025 local race for mayor in San Pablo City.',
    priorities: [
      'Citywide service delivery and barangay outreach programs',
      'Economic and tourism initiatives tied to local livelihood',
      'Support for environmental and community-based projects',
    ],
  },
  {
    position: 'City Vice Mayor',
    name: 'Justin G. Colago',
    note: 'Led the 2025 vice mayoral race in San Pablo City.',
    priorities: [
      'Legislative support for city programs and ordinances',
      'Coordination with barangays and local stakeholders',
      'Public service oversight alongside the city council',
    ],
  },
];
