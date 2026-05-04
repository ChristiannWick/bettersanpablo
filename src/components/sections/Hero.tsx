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

      <div className="container relative mx-auto px-4 py-10 md:py-14">
        <div ref={ref} className="max-w-3xl">

          {/* Location badge */}
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-100">
            {locationLabel}
          </span>

          {/* Heading */}
          <h1
            className={`mt-3 text-4xl font-extrabold leading-tight tracking-tight transition-all duration-600 sm:text-5xl lg:text-6xl ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            {heading}
          </h1>

          {/* Subtitle — kept short */}
          <p
            className={`mt-3 max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base transition-all duration-600 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visible ? '80ms' : '0ms' }}
          >
            {subtitle}
          </p>

          {/* CTA row + city chips on same line (desktop) */}
          <div
            className={`mt-5 flex flex-wrap items-center gap-3 transition-all duration-600 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visible ? '160ms' : '0ms' }}
          >
            <Link
              to={primaryCtaHref}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
            >
              {primaryCtaLabel}
            </Link>
            <Link
              to={secondaryCtaHref}
              className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {secondaryCtaLabel}
            </Link>
            <span className="hidden sm:inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              1st Class City · 300,166 residents
            </span>
          </div>

          {/* Quick access chips */}
          {quickAccessItems.length > 0 && (
            <div
              className={`mt-4 flex flex-wrap gap-2 transition-all duration-600 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: visible ? '220ms' : '0ms' }}
            >
              <span className="text-xs text-blue-200 self-center mr-1">Quick:</span>
              {quickAccessItems.map(item => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-blue-50 transition hover:bg-white/20"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* ── Search box ── */}
          <div
            className={`mt-6 transition-all duration-600 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: visible ? '300ms' : '0ms' }}
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <label htmlFor="hero-search" className="sr-only">
                Search services and departments
              </label>

              {/* Input wrapper — dropdown is child of this, NOT clipped by section */}
              <div ref={wrapperRef} className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  ref={inputRef}
                  id="hero-search"
                  type="text"
                  autoComplete="off"
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => query.length >= 2 && setDropdownOpen(true)}
                  placeholder={searchPlaceholder}
                  className="w-full rounded-lg border-0 bg-white py-3 pl-10 pr-9 text-sm text-slate-900 shadow-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/70"
                />
                {query.length > 0 && (
                  <button
                    type="button"
                    onClick={() => { setQuery(''); setDropdownOpen(false); inputRef.current?.focus(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}

                {/* ── Live dropdown ── rendered inside relative wrapper, NOT clipped ── */}
                {showDropdown && (
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-[9999] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
                    <ul role="listbox">
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
                              <div className="flex flex-wrap items-center gap-2">
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
                            <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-300" />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Footer — view all */}
                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        <span>See all results for &ldquo;{query.trim()}&rdquo;</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-900"
              >
                Search
              </button>
            </form>

            <p className="mt-2 text-xs text-blue-200">
              Try: <button type="button" className="underline hover:text-white" onClick={() => { setQuery('permit'); setDropdownOpen(true); }}>permit</button>
              {', '}
              <button type="button" className="underline hover:text-white" onClick={() => { setQuery('health'); setDropdownOpen(true); }}>health</button>
              {', '}
              <button type="button" className="underline hover:text-white" onClick={() => { setQuery('senior'); setDropdownOpen(true); }}>senior</button>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
