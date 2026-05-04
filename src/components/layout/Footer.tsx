import React, { useEffect, useState } from 'react';
import { Facebook, Github, ExternalLink, Eye, Heart, Code2, Globe } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import betterSanPabloLogo from '../../assets/bettersanpablo-logo3.png';

// ── Project transparency data ─────────────────────────────────────────────────
// Cost to the people of San Pableños = ₱0
const PROJECT_COSTS = [
  { label: 'Hosting', value: '₱0 / yr', note: 'Cloudflare Pages (free tier)' },
  { label: 'Domain', value: '₱840 / yr', note: 'bettersanpablo.org (~$15/yr)' },
  { label: 'To the Public', value: '₱0', note: 'Free for all San Pableños', highlight: true },
];

// ── Visit counter — counterapi.dev (free, no signup, CORS-enabled) ────────────
function useVisitCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = 'bsp_counted';

    const fetchCount = async () => {
      try {
        const alreadyCounted = sessionStorage.getItem(sessionKey);
        // counterapi.dev: /up increments, /get just reads
        const endpoint = alreadyCounted
          ? 'https://api.counterapi.dev/v1/bettersanpablo/visits'
          : 'https://api.counterapi.dev/v1/bettersanpablo/visits/up';

        const res = await fetch(endpoint, { mode: 'cors' });
        if (!res.ok) throw new Error('counter unavailable');
        const data = await res.json();
        // counterapi.dev returns { count: N }
        const value = data.count ?? data.value ?? null;
        setCount(value);
        if (!alreadyCounted) sessionStorage.setItem(sessionKey, '1');
      } catch {
        // Fallback: try countapi.xyz
        try {
          const alreadyCounted = sessionStorage.getItem(sessionKey);
          const fallback = alreadyCounted
            ? 'https://api.countapi.xyz/get/bettersanpablo.org/visits'
            : 'https://api.countapi.xyz/hit/bettersanpablo.org/visits';
          const res2 = await fetch(fallback);
          if (!res2.ok) throw new Error();
          const d2 = await res2.json();
          setCount(d2.value ?? null);
          if (!alreadyCounted) sessionStorage.setItem(sessionKey, '1');
        } catch {
          setCount(null);
        }
      }
    };

    fetchCount();
  }, []);

  return count;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

const Footer: React.FC = () => {
  const visitCount = useVisitCounter();

  return (
    <footer className="bg-gray-950 text-white">

      {/* ── Main nav grid ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-4 inline-block rounded-lg bg-white px-3 py-2">
              <img
                src={betterSanPabloLogo}
                alt="BetterSanPablo.org"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              A free, volunteer-built transparency portal for San Pablo City,
              Laguna — the City of Seven Lakes. Not an official government site.
            </p>
            <div className="flex items-center gap-3">
              {footerNavigation.socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-blue-600 hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              ))}
              <a
                href="https://github.com/ChristiannWick/better-lgu-directory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition hover:bg-gray-600 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav columns — driven by footerNavigation */}
          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(link => {
                  const isExternal = link.href.startsWith('http');
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white"
                        >
                          {link.label}
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-gray-400 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Transparency band ──────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            {/* Project cost table */}
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500">
                <Code2 className="h-3.5 w-3.5" />
                Project Cost &amp; Transparency
              </p>
              {/* Headline: Cost to the People */}
              <p className="mb-3 text-lg font-extrabold text-emerald-400">
                Cost to San Pableños = <span className="text-white">₱0</span>
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 sm:grid-cols-3">
                {PROJECT_COSTS.map(item => (
                  <div key={item.label}>
                    <p className={`text-sm font-bold ${item.highlight ? 'text-emerald-400' : 'text-white'}`}>
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs text-gray-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden h-auto w-px bg-gray-800 lg:block" />

            {/* Visit counter + open source badges */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start lg:flex-col lg:items-end lg:gap-3">

              {/* Visit counter */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-900/50 text-blue-400">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-bold leading-none text-white">
                    {visitCount !== null ? formatCount(visitCount) : '—'}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">Total site visits</p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-800 bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400">
                  <Globe className="h-3 w-3" />
                  Free & Open Source
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-800 bg-pink-900/30 px-3 py-1 text-xs font-medium text-pink-400">
                  <Heart className="h-3 w-3" />
                  Built by volunteers
                </span>
                <a
                  href="https://github.com/ChristiannWick/better-lgu-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
                >
                  <Github className="h-3 w-3" />
                  Contribute on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} BetterSanPablo.org · All content is public domain unless
              otherwise specified. · Not affiliated with the City Government of San Pablo.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/sitemap" className="text-xs text-gray-600 transition hover:text-gray-400">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-xs text-gray-600 transition hover:text-gray-400">
                Accessibility
              </Link>
              <a
                href="https://www.sanpablocity.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 transition hover:text-gray-400"
              >
                Official City Site ↗
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
