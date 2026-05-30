import { Link } from 'react-router-dom';
import {
  MapPin,
  Mountain,
  Waves,
  Calendar,
  Phone,
  Bus,
  Car,
  Camera,
  ShieldAlert,
  Sun,
  Clock,
  Building2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';

// ── Data ──────────────────────────────────────────────────────────────

interface Lake {
  name: string;
  barangay: string;
  area: string; // hectares
  highlight: string;
  activities: string[];
  fee: string;
  imageUrl: string;
}

const SEVEN_LAKES: Lake[] = [
  {
    name: 'Sampaloc Lake',
    barangay: 'Barangay II (City Center)',
    area: '~104 hectares',
    highlight:
      'The largest of the Seven Lakes and the most accessible — right beside City Hall. The Sampaloc Lake Promenade is popular for morning walks, jogging, photos, and sunset views.',
    activities: ['Lakeside walking promenade', 'Photography', 'Local seafood eateries', 'Fishpens'],
    fee: 'Free entry to promenade',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Sampaloc%20Lake%20in%20San%20Pablo%20City.jpg',
  },
  {
    name: 'Pandin Lake',
    barangay: 'Barangay Sta. Catalina',
    area: '~20.5 hectares',
    highlight:
      'San Pablo\'s most famous eco-tourism destination. Community-managed bamboo raft tours include a guided cruise, freshwater swimming spots, and a freshly cooked lunch on the raft.',
    activities: [
      'Bamboo raft tours (~₱400/person, includes lunch & life vest)',
      'Swimming in designated areas',
      'Short hike from parking area (~10–15 min)',
    ],
    fee: 'Entry ₱20–₱50 · Raft tour package ₱400+',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Pandin,%20San%20Pablo,%20Laguna.jpg',
  },
  {
    name: 'Yambo Lake',
    barangay: 'Barangay Sta. Catalina',
    area: '~30.5 hectares',
    highlight:
      'Pandin\'s twin lake — accessed via a short trail from Pandin. Quieter and less commercialized; perfect for nature lovers wanting solitude.',
    activities: ['Nature viewing', 'Photography', 'Trekking between Pandin & Yambo'],
    fee: 'Combined with Pandin Lake fee',
    imageUrl:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Lake%20Yambo,%20San%20Pablo,%20Laguna.jpg',
  },
  {
    name: 'Bunot Lake',
    barangay: 'Barangay Concepcion',
    area: '~30.5 hectares',
    highlight:
      'A scenic lake surrounded by coconut groves and small farms. Less developed for tourism but worth a peaceful detour for visitors who want to see authentic lake-community life.',
    activities: ['Sightseeing', 'Birdwatching', 'Photography'],
    fee: 'Free / barangay-set fee',
    imageUrl: '',
  },
  {
    name: 'Palakpakin Lake',
    barangay: 'Barangay San Lorenzo',
    area: '~43 hectares',
    highlight:
      'The largest among the outer lakes. Active aquaculture and community fishing. Visitors can see traditional fishpens up close.',
    activities: ['Fishpen viewing', 'Local fish meals', 'Community immersion'],
    fee: 'Free / barangay-set fee',
    imageUrl: '',
  },
  {
    name: 'Calibato Lake',
    barangay: 'Barangay Sta. Catalina',
    area: '~42 hectares',
    highlight:
      'The deepest lake among the seven. Surrounded by farmland and forest. Less accessible — best for adventurous visitors.',
    activities: ['Nature viewing', 'Trekking'],
    fee: 'Free / barangay-set fee',
    imageUrl: '',
  },
  {
    name: 'Muhikap Lake',
    barangay: 'Barangay San Buenaventura',
    area: '~6.5 hectares',
    highlight:
      'The smallest of the Seven Lakes. Calm and serene; mostly visited by lake-trekkers completing the full seven-lakes circuit.',
    activities: ['Nature viewing', 'Lake completion challenge'],
    fee: 'Free / barangay-set fee',
    imageUrl: '',
  },
];

interface HeritageSite {
  name: string;
  type: string;
  description: string;
  address: string;
}

const HERITAGE_SITES: HeritageSite[] = [
  {
    name: 'Cathedral Parish of St. Paul the First Hermit',
    type: 'Religious / Heritage',
    description:
      "The main cathedral of San Pablo City and seat of the Roman Catholic Diocese of San Pablo (est. 1967). A colonial-era church at the heart of the city. Patron saint feast day: January 15.",
    address: 'Plaza area, San Pablo City',
  },
  {
    name: 'Museo ng San Pablo',
    type: 'Museum',
    description:
      "Local museum showcasing the city's history, indigenous culture, religious heritage, and civic institutions. A great first stop for understanding San Pablo's identity.",
    address: 'San Pablo City',
  },
  {
    name: 'San Pablo City Hall',
    type: 'Civic Landmark',
    description:
      'The administrative seat of the City Government. Historic building at the center of the city, beside the Plaza and Cathedral.',
    address: 'Mabini Extension, San Pablo City',
  },
  {
    name: 'Mt. Banahaw',
    type: 'Mountain / Pilgrimage',
    description:
      'A sacred mountain straddling the borders of Laguna and Quezon, near San Pablo. Major pilgrimage site, especially during Holy Week. Trekking is regulated; check with local guides and DENR before climbing.',
    address: 'Laguna–Quezon border',
  },
  {
    name: 'Hacienda Escudero Plantation Resort',
    type: 'Heritage Resort',
    description:
      'A 415-hectare heritage plantation and resort town with museum, cultural shows, and traditional Filipino dining. A short drive from the city center.',
    address: 'San Pablo / Tiaong border',
  },
  {
    name: 'Komikero Komiks Museum',
    type: 'Cultural Museum',
    description:
      'Founded by acclaimed Filipino comic book artist Gerry Alanguilan (born in San Pablo). A unique stop for Filipino pop-culture lovers.',
    address: 'San Pablo City',
  },
];

interface Festival {
  name: string;
  dates: string;
  description: string;
}

const FESTIVALS: Festival[] = [
  {
    name: 'Coco Festival (Coconut Festival)',
    dates: 'January 9 – 15 (annually)',
    description:
      "San Pablo's signature festival celebrating its coconut heritage. Features street dancing with coconut-themed costumes, float parade, Coco Trade Fair, and the Mutya at Lakan ng San Pablo pageant. Culminates on January 15 — the Feast Day of St. Paul the First Hermit. First held in 1996.",
  },
  {
    name: 'Semana Santa (Holy Week)',
    dates: 'Movable — March or April',
    description:
      'Traditional Holy Week observances at the Cathedral and parish churches. Processions, reenactments, and visita iglesia routes.',
  },
  {
    name: 'City Charter Day',
    dates: 'May 7',
    description:
      'Anniversary of the signing of Commonwealth Act No. 520 (1940), granting San Pablo its city charter. Civic ceremonies and cultural events.',
  },
];

interface QuickFact {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const QUICK_FACTS: QuickFact[] = [
  { Icon: Sun, label: 'Best months to visit', value: 'November – February (cool & dry)' },
  { Icon: Bus, label: 'From Manila', value: '~2–3 hours via SLEX bus' },
  { Icon: Car, label: 'From Los Baños', value: '~45 min by jeep / bus' },
  { Icon: Clock, label: 'City Hall hours', value: 'Mon–Fri, 8:00 AM – 5:00 PM' },
];

// ── Page ──────────────────────────────────────────────────────────────

export default function Attractions() {
  return (
    <>
      <SEO
        title="Top Attractions"
        description="A complete guide to visiting San Pablo City, Laguna — the City of Seven Lakes. Discover the lakes, heritage sites, festivals, and how to get there."
        keywords="San Pablo attractions, Seven Lakes, Pandin Lake, Sampaloc Lake, Coco Festival, Mt. Banahaw, tourism"
      />

      <Section className="mb-16">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Attractions', href: '/attractions' },
          ]}
        />

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            <MapPin className="h-3.5 w-3.5" />
            Tourism · San Pablo City
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Top Places to Visit in San Pablo
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600">
            San Pablo City, Laguna — proudly known as the <strong>City of Seven Lakes</strong> —
            offers natural wonders, heritage sites, and one of the country's
            award-winning festivals. This guide is for both residents and visitors planning a trip.
          </p>
        </div>

        {/* ── Quick facts ──────────────────────────────────────────── */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_FACTS.map(fact => {
            const Icon = fact.Icon;
            return (
              <div
                key={fact.label}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-bold text-gray-900">{fact.value}</p>
              </div>
            );
          })}
        </div>

        {/* ── Seven Lakes ──────────────────────────────────────────── */}
        <div id="lakes" className="mb-16 scroll-mt-24">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
              <Waves className="h-3.5 w-3.5" />
              The Seven Lakes
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              San Pablo's Volcanic Crater Lakes
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              Seven freshwater crater lakes formed by ancient volcanic activity along the
              San Pablo Volcanic Field — between Mt. Makiling and Mt. Banahaw.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SEVEN_LAKES.map((lake, idx) => (
              <article
                key={lake.name}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {lake.imageUrl && (
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                      src={lake.imageUrl}
                      alt={lake.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center justify-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-gray-900 shadow">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
                <div className="p-5">
                  {!lake.imageUrl && (
                    <span className="mb-2 inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                      Lake #{idx + 1}
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-gray-900">{lake.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {lake.barangay} · {lake.area}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {lake.highlight}
                  </p>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Activities
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {lake.activities.map(a => (
                        <li
                          key={a}
                          className="flex items-start gap-2 text-xs text-gray-700"
                        >
                          <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-emerald-500" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs">
                    <span className="font-semibold text-gray-500">Fee:</span>
                    <span className="text-gray-700">{lake.fee}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            *Entrance and activity fees are set by lake-community management and may
            change. Always verify with the City Tourism Office before visiting.
          </p>
        </div>

        {/* ── Heritage & cultural sites ────────────────────────────── */}
        <div id="heritage" className="mb-16 scroll-mt-24">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
              <Building2 className="h-3.5 w-3.5" />
              Heritage & Culture
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              Heritage Sites & Cultural Landmarks
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {HERITAGE_SITES.map(site => (
              <article
                key={site.name}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700">
                  {site.type}
                </span>
                <h3 className="mt-3 text-base font-bold text-gray-900">{site.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {site.description}
                </p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {site.address}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Festivals ────────────────────────────────────────────── */}
        <div id="festivals" className="mb-16 scroll-mt-24">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-rose-700">
              <Calendar className="h-3.5 w-3.5" />
              Festivals & Events
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              Annual Festivals
            </h2>
          </div>

          <div className="space-y-4">
            {FESTIVALS.map(festival => (
              <article
                key={festival.name}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-gray-900">{festival.name}</h3>
                  <span className="inline-flex items-center gap-1 self-start rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                    <Calendar className="h-3 w-3" />
                    {festival.dates}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {festival.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── How to get there ─────────────────────────────────────── */}
        <div id="how-to-get-there" className="mb-16 scroll-mt-24 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
              <Bus className="h-3.5 w-3.5" />
              How to Get There
            </span>
            <h2 className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl">
              Getting to San Pablo City
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-gray-900">From Metro Manila</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <Bus className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>
                    <strong>By bus:</strong> Take a JAC Liner or DLTB bus from Buendia
                    (Gil Puyat), Pasay, or Alabang terminals bound for "San Pablo City."
                    Travel time: <strong>2–3 hours</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <Car className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>
                    <strong>By car:</strong> Take SLEX southbound, exit at San Pablo
                    City exit. Continue to the city proper.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">From Laguna / Los Baños</h3>
              <ul className="mt-2 space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <Bus className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>
                    Take any jeep / bus along the national highway bound for
                    San Pablo. Travel time: <strong>~45 minutes</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <Car className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600" />
                  <span>Within the city, tricycles, jeeps, and habal-habal reach all lake areas.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Safety reminders ─────────────────────────────────────── */}
        <div id="safety" className="mb-16 scroll-mt-24 rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">Safety Reminders</h2>
          </div>
          <ul className="space-y-2 text-sm text-red-900">
            <li>• <strong>Never swim alone</strong> at the lakes. Most have no lifeguards.</li>
            <li>• <strong>Check weather conditions</strong> before traveling — avoid trips during typhoon advisories.</li>
            <li>• <strong>Use life vests</strong> during bamboo raft rides — operators are required to provide them.</li>
            <li>• <strong>Don't trek alone</strong> at Mt. Banahaw or outer lakes — hire a local guide.</li>
            <li>• <strong>Pack out your trash.</strong> The lakes are protected ecosystems.</li>
            <li>• <strong>Mobile signal can be weak</strong> at outer lakes — download offline maps.</li>
          </ul>

          <h3 className="mt-6 mb-2 text-sm font-bold text-red-900">Emergency hotlines</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href="tel:911"
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <Phone className="h-4 w-4" />
              National Emergency · 911
            </a>
            <a
              href="tel:09985407171"
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <Phone className="h-4 w-4" />
              CDRRMO · 0998 540 7171
            </a>
            <a
              href="tel:0495628765"
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <Phone className="h-4 w-4" />
              PNP San Pablo · (049) 562-8765
            </a>
            <a
              href="tel:0495624321"
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              <Phone className="h-4 w-4" />
              BFP San Pablo · (049) 562-4321
            </a>
          </div>
        </div>

        {/* ── Tourism office ───────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                City Tourism Office
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                For guided tours, activity permits, and tourism inquiries, contact the
                official City Tourism Office at San Pablo City Hall.
              </p>
              <p className="mt-3 text-sm text-gray-700">
                📞 <strong>(049) 562-0111</strong> (City Hall main line) · ✉ <strong>(049) 561-1483</strong> (City Information Office)
              </p>
            </div>
            <a
              href="https://www.sanpablocity.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Visit official site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/services/tourism/visit-the-seven-lakes"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-primary-400 hover:text-primary-600"
            >
              <Camera className="h-3.5 w-3.5" />
              Detailed lake guide
            </Link>
            <Link
              to="/services/tourism/find-local-resorts-and-accommodations"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-primary-400 hover:text-primary-600"
            >
              <Mountain className="h-3.5 w-3.5" />
              Resorts & accommodations
            </Link>
            <Link
              to="/services/tourism/visitor-safety-and-emergency-hotlines"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:border-primary-400 hover:text-primary-600"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Visitor safety
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
