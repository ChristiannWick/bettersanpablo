import React, { useState } from 'react';
import { Facebook, Github, ExternalLink, Eye, Heart, Globe } from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import betterSanPabloLogo from '../../assets/bettersanpablo-logo3.png';

// ── Visit counter ────────────────────────────────────────────────────────────
// Disabled: the previously used third-party counters
//   - api.counterapi.dev → blocked by most ad-blockers
//   - api.countapi.xyz   → domain no longer resolves
// Both produced visible errors in DevTools Network/Console. Returning `null`
// hides the counter chip in the bottom bar until a self-hosted endpoint
// (`/api/visits`) is implemented. See CLAUDE.md "Pending / Known Gaps".
function useVisitCounter() {
  const [count] = useState<number | null>(null);
  return count;
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

const Footer: React.FC = () => {
  const visitCount = useVisitCounter();
  const { t } = useTranslation('common');

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
                loading="lazy"
                decoding="async"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              {t('footer.brandDescription')}
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
                {t(`footer.sections.${section.title}`, section.title)}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map(link => {
                  const isExternal = link.href.startsWith('http');
                  const label = t(`footer.links.${link.label}`, link.label);
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white"
                        >
                          {label}
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-gray-400 transition hover:text-white"
                        >
                          {label}
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

      {/* ── Cost banner ────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 rounded-xl border border-green-800 bg-green-900/20 px-6 py-3">
            <Globe className="h-4 w-4 text-green-400 shrink-0" />
            <span className="text-sm font-semibold text-green-400">{t('footer.costLabel')}</span>
            <span className="text-2xl font-black text-yellow-300">₱0</span>
            <span className="hidden sm:inline text-xs text-gray-500">{t('footer.costNote')}</span>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-gray-600">
              {t('footer.copyright', { year: new Date().getFullYear() })}{' '}
              <span className="inline-flex items-center gap-1">
                <Heart className="h-3 w-3 text-pink-600" />
                {t('footer.builtByVolunteers')}
              </span>
            </p>
            <div className="flex items-center gap-4">
              {visitCount !== null && (
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Eye className="h-3.5 w-3.5" />
                  {formatCount(visitCount)} {t('footer.visits')}
                </span>
              )}
              <Link to="/sitemap" className="text-xs text-gray-600 transition hover:text-gray-400">
                {t('common.sitemap')}
              </Link>
              <Link to="/accessibility" className="text-xs text-gray-600 transition hover:text-gray-400">
                {t('common.accessibility')}
              </Link>
              <a
                href="https://www.sanpablocity.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-600 transition hover:text-gray-400"
              >
                {t('common.officialCitySite')} ↗
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
