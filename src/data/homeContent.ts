export interface QuickServiceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
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
  href: string;
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
    icon: 'IdCard',
  },
  {
    title: 'Birth Certificate',
    description: 'Find guidance for civil registry document requests.',
    href: '/services?q=Birth%20Certificate',
    icon: 'FileText',
  },
  {
    title: 'Business Permit',
    description: 'Start or renew your local business permit process.',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
    icon: 'Building2',
  },
  {
    title: 'Business Registration',
    description: 'Access permit and tax steps for business compliance.',
    href: '/services/business/renew-permits-and-pay-local-business-taxes',
    icon: 'Briefcase',
  },
  {
    title: 'Health Assistance',
    description: 'Locate free check-ups, medicines, and health services.',
    href: '/services/health-services/get-free-check-ups-basic-medicines-and-vaccines',
    icon: 'HeartPulse',
  },
  {
    title: 'Senior and PWD Support',
    description: 'View available social welfare assistance programs.',
    href: '/services/social-welfare/apply-for-senior-citizen-solo-parent-or-pwd-assistance',
    icon: 'Users',
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
      "San Pablo's Coco Festival celebrates local culture, coconut-based livelihood, and community creativity each year.",
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/San%20Pablo%20City%20Coco%20Festival.jpg',
    imageAlt:
      'Official poster for a recent San Pablo City Coco Festival edition',
  },
];

export const SAN_PABLO_ABOUT_PARAGRAPHS: string[] = [
  'Known as the City of Seven Lakes, San Pablo is a 1st class component city in Laguna with a strong identity shaped by nature, heritage, and community.',
  'Founded as San Pablo de los Montes and chartered as a city in 1940, it continues to grow as a center for public service, tourism, and local enterprise.',
];

export const SAN_PABLO_HISTORY_TIMELINE: HistoryTimelineEntry[] = [
  {
    year: '1586',
    title: 'Parish Founding',
    description:
      'San Pablo de los Montes was established as a parish, forming the religious and civic foundation of the city.',
  },
  {
    year: '1647',
    title: 'Elevated to Municipality',
    description:
      'The settlement was formally elevated to a municipality, beginning centuries of local governance.',
  },
  {
    year: '1940',
    title: 'City Charter Approved',
    description:
      'Commonwealth Act No. 520 was signed on May 7, 1940, granting San Pablo its city charter — one of the oldest cities in the Philippines.',
  },
  {
    year: '1941',
    title: 'City Inauguration',
    description:
      'San Pablo City was inaugurated on March 30, 1941, marking the formal start of city governance.',
  },
  {
    year: '1967',
    title: 'Diocese of San Pablo Established',
    description:
      'The Roman Catholic Diocese of San Pablo was established on November 28, 1967, with the Cathedral of St. Paul the First Hermit as its seat.',
  },
  {
    year: '1996',
    title: 'First Coconut Festival',
    description:
      "The Coco Festival was launched to celebrate the 400th anniversary of the parish and to promote the city's coconut heritage and local industry.",
  },
  {
    year: '2023',
    title: 'City Central Terminal Opened',
    description:
      'The San Pablo City Central Terminal was inaugurated, modernizing public transport and improving connectivity for residents.',
  },
  {
    year: '2025',
    title: 'New Administration Begins',
    description:
      'Arcadio "Najie" B. Gapangada Jr. was elected City Mayor with 70,822 votes, beginning a new chapter for San Pablo City governance.',
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
      "A local museum that highlights the city's history, institutions, and cultural identity.",
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/MuseoSanPablojf7215%2002.JPG',
    imageAlt: 'Museo ng San Pablo in Laguna',
  },
];

export const SAN_PABLO_CITY_STATS: CityStat[] = [
  { value: '300,166', label: 'Population (2024 POPCEN)' },
  { value: '80', label: 'Barangays' },
  { value: '7', label: 'Crater Lakes' },
  { value: '197.56 km²', label: 'Land Area' },
  { value: '1940', label: 'Year of Cityhood' },
  { value: '1st Class', label: 'City Classification' },
];

export const SAN_PABLO_COCONUT_FESTIVAL: CoconutFestivalInfo = {
  title: 'Coco Festival of San Pablo',
  description:
    "Held every January 9–15, the Coco Festival culminates on January 15 — the Feast Day of St. Paul the First Hermit, the city's patron saint. First held in 1996, it is a DOT and ATOP award-winning tourism event.",
  highlights: [
    'Street dancing competition with elaborate coconut-themed costumes and floats.',
    'Mutya at Lakan ng San Pablo — the city\'s signature beauty pageant.',
    'Coco Trade Fair showcasing coconut farmers, MSMEs, and local products.',
    'Recognized as a Guinness World Record event for mass coconut planting in 2025.',
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
    href: '/government/departments/executive',
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
    href: '/government/departments/executive',
  },
];
