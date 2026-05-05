import { FormEvent, useEffect, useRef, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, X } from 'lucide-react';
import useInView from '../../hooks/useInView';
import { serviceCategories, governmentCategories } from '../../data/yamlLoader';
import { SAN_PABLO_QUICK_SERVICES } from '../../data/homeContent';

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

interface SearchResult {
  title: string;
  description: string;
  href: string;
  type: 'Quick Service' | 'Services' | 'Government';
}

const TYPE_COLORS: Record<SearchResult['type'], string> = {
  'Quick Service': 'bg-blue-100 text-blue-700',
  Services: 'bg-emerald-100 text-emerald-700',
  Government: 'bg-orange-100 text-orange-700',
};

const DEFAULT_QUICK_ACCESS: QuickAccessItem[] = [
  { label: 'National ID', href: '/services?q=National%20ID' },
  { label: 'Birth Certificate', href: '/services?q=Birth%20Certificate' },
  {
    label: 'Business Permit',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: 'Senior / PWD',
    href: '/services/social-welfare/apply-for-senior-citizen-solo-parent-or-pwd-assistance',
  },
];

export default function Hero({
  locationLabel = 'SAN PABLO CITY, LAGUNA',
  heading = 'BetterSanPablo.org',
  subtitle = 'Access local services, permits, and trusted public information for the City of Seven Lakes.',
  searchPlaceholder = 'Search services, departments, offices...',
  primaryCtaLabel = 'All Services',
  primaryCtaHref = '/services',
  secondaryCtaLabel = 'Government',
  secondaryCtaHref = '/government',
  quickAccessItems = DEFAULT_QUICK_ACCESS,
}: HeroProps) {
  const [query, setQuery] = useState('');
  const [heroReady, setHeroReady] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.15, once: false });
  const visible = isInView || heroReady;

  useEffect(() => {
    const id = window.setTimeout(() => setHeroReady(true), 280);
    return () => window.clearTimeout(id);
  }, []);

  // Build searchable index once
  const allItems = useMemo<SearchResult[]>(() => {
    type Cat = { category: string; slug: string; description: string };
    const quick: SearchResult[] = SAN_PABLO_QUICK_SERVICES.map(s => ({
      title: s.title,
      description: s.description,
      href: s.href,
      type: 'Quick Service',
    }));
    const services: SearchResult[] = (serviceCategories.categories as Cat[]).map(c => ({
      title: c.category,
      description: c.description,
      href: `/services/${c.slug}`,
      type: 'Services',
    }));
    const gov: SearchResult[] = (governmentCategories.categories as Cat[]).map(c => ({
      title: c.category,
      description: c.description,
      href: `/government/${c.slug}`,
      type: 'Government',
    }));
    return [...quick, ...services, ...gov];
  }, []);

  // Live suggestions — max 6
  const suggestions = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allItems
      .filter(item => `${item.title} ${item.description}`.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, allItems]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    setDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, suggestions.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, -1)); }
    else if (e.key === 'Escape') { setDropdownOpen(false); setActiveIndex(-1); }
    else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      navigate(suggestions[activeIndex].href);
      setDropdownOpen(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDropdownOpen(false);
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  const showDropdown = dropdownOpen && suggestions.length > 0;

  return (
    // ⚠️ NO overflow-hidden here — that clips the search dropdown.
    // Decorative blobs are clipped inside their own wrapper below.
    <section className="relative bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 text-white">

      {/* Decorative blobs — clipped inside their own div, not the whole section */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-cyan-300/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          {/* ── LEFT COLUMN: Heading, subtitle, CTAs ── */}
          <div ref={ref} className="max-w-lg">

            {/* Location badge */}
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-100">
              {locationLabel}
            </span>

            {/* Heading */}
            <h1
              className={`mt-3 text-4xl font-extrabold leading-tight tracking-tight transition-all duration-600 sm:text-5xl ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              {heading}
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-3 text-sm leading-relaxed text-blue-100 sm:text-base transition-all duration-600 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: visible ? '80ms' : '0ms' }}
            >
              {subtitle}
            </p>

            {/* CTA buttons */}
            <div
              className={`mt-6 flex flex-wrap gap-3 transition-all duration-600 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: visible ? '160ms' : '0ms' }}
            >
              <Link
                to={primaryCtaHref}
                className="inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
              >
                {primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to={secondaryCtaHref}
                className="rounded-md border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {secondaryCtaLabel}
              </Link>
            </div>

          </div>

          {/* ── RIGHT COLUMN: Search card with popular services ── */}
          <div
            className={`transition-all duration-600 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visible ? '240ms' : '0ms' }}
          >
            <div className="rounded-2xl bg-white p-6 shadow-xl">

              {/* Search title */}
              <h2 className="text-lg font-bold text-gray-900">Search Services</h2>

              {/* Search input */}
              <form onSubmit={handleSearch} className="mt-4">
                <label htmlFor="hero-search" className="sr-only">
                  Search services and departments
                </label>

                <div ref={wrapperRef} className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    ref={inputRef}
                    id="hero-search"
                    type="text"
                    autoComplete="off"
                    value={query}
                    onChange={handleQueryChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && setDropdownOpen(true)}
                    placeholder="Search for a service..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  {query.length > 0 && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setDropdownOpen(false); inputRef.current?.focus(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  {/* Dropdown */}
                  {showDropdown && (
                    <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[9999] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                      <ul role="listbox" className="max-h-80 overflow-y-auto">
                        {suggestions.map((item, idx) => (
                          <li key={`${item.type}-${item.title}`}>
                            <Link
                              to={item.href}
                              onClick={() => { setDropdownOpen(false); setQuery(''); }}
                              className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                                idx === activeIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                              } ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {item.title}
                                  </span>
                                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[item.type]}`}>
                                    {item.type}
                                  </span>
                                </div>
                                <p className="mt-0.5 truncate text-xs text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {suggestions.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5">
                          <button
                            type="submit"
                            className="flex w-full items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700"
                          >
                            <span>View all results</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>

              {/* Popular services grid */}
              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Popular Services</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    { icon: '🏢', label: 'Business & Livelihood', href: '/services/business' },
                    { icon: '❤️', label: 'Health Services', href: '/services/health-services' },
                    { icon: '🗑️', label: 'Waste Disposal', href: '/services/environment' },
                    { icon: '🎓', label: 'Education', href: '/services/education' },
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 px-3 py-3 text-center transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs font-medium text-gray-700">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
