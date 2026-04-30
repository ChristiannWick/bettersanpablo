import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

type QuickAccessItem = {
  label: string;
  href: string;
};

interface HeroProps {
  locationLabel?: string;
  heading?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  quickAccessItems?: QuickAccessItem[];
}

const DEFAULT_QUICK_ACCESS: QuickAccessItem[] = [
  { label: 'National ID', href: '/services?q=National%20ID' },
  { label: 'Birth Certificate', href: '/services?q=Birth%20Certificate' },
  {
    label: 'Business Registration',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
];

export default function Hero({
  locationLabel = 'SAN PABLO CITY, LAGUNA',
  heading = 'BetterSanPablo.org',
  subtitle = 'A community portal for San Pablo City, Laguna, connecting residents to local government services, permits, records, and public information. Built for a 1st class city serving around 285,000 people.',
  searchPlaceholder = 'Search services, departments...',
  primaryCtaLabel = 'View All Services',
  primaryCtaHref = '/services',
  secondaryCtaLabel = 'Government',
  secondaryCtaHref = '/government',
  quickAccessItems = DEFAULT_QUICK_ACCESS,
}: HeroProps) {
  const [query, setQuery] = useState('');
  const [heroReady, setHeroReady] = useState(false);
  const navigate = useNavigate();
  const hasQuickAccessItems = quickAccessItems.length > 0;

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setHeroReady(true);
    }, 320);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      navigate('/services');
      return;
    }

    const searchParams = new URLSearchParams({ q: trimmedQuery });
    navigate(`/services?${searchParams.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-14 md:py-20">
        <div className="max-w-4xl">
          <span className="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-50">
            {locationLabel}
          </span>

          <h1
            className={`mt-4 text-4xl font-extrabold leading-tight tracking-tight transition-opacity duration-500 sm:text-5xl lg:text-6xl ${
              heroReady ? 'opacity-100' : 'animate-pulse opacity-70'
            }`}
          >
            {heading}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-blue-50 sm:text-lg">
            {subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs sm:text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1.5 font-medium text-blue-50">
              1st Class Component City
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1.5 font-medium text-blue-50">
              Population: 285,348 (2020 Census)
            </span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to={primaryCtaHref}
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              to={secondaryCtaHref}
              className="inline-flex items-center justify-center rounded-md border border-white/50 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {secondaryCtaLabel}
            </Link>
          </div>

          {hasQuickAccessItems && (
            <div className="mt-6 flex flex-wrap gap-2">
              {quickAccessItems.map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-medium text-blue-50 transition hover:bg-white/20 sm:text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-7 rounded-xl border border-white/30 bg-white/10 p-3 backdrop-blur-sm sm:p-4">
            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <label htmlFor="hero-service-search" className="sr-only">
                Search services and departments
              </label>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="hero-service-search"
                  type="search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-md border border-white/20 bg-white px-10 py-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
