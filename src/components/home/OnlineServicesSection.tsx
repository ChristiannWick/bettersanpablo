import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface OfficialPortal {
  title: string;
  description: string;
  badge: string;
}

const PORTAL_META = [
  {
    url: 'https://realpropertytax.sanpablocity.gov.ph',
    badgeColor: 'bg-blue-100 text-blue-700',
    icon: '🏠',
  },
  {
    url: 'https://bplo.sanpablocity.gov.ph',
    badgeColor: 'bg-green-100 text-green-700',
    icon: '🏢',
  },
  {
    url: 'https://elgu-city-of-san-pablo-laguna.e.gov.ph',
    badgeColor: 'bg-purple-100 text-purple-700',
    icon: '💻',
  },
  {
    url: 'https://www.spcwd.org.ph',
    badgeColor: 'bg-cyan-100 text-cyan-700',
    icon: '💧',
  },
];

export default function OnlineServicesSection() {
  const { t } = useTranslation('common');
  const portals = t('onlinePortals.items', { returnObjects: true }) as OfficialPortal[];

  return (
    <section className="border-t border-b border-gray-100 bg-white py-14">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
              {t('onlinePortals.badge')}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t('onlinePortals.title')}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {t('onlinePortals.subtitle')}{' '}
              <a
                href="https://www.sanpablocity.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                sanpablocity.gov.ph ↗
              </a>
            </p>
          </div>
          <a
            href="https://www.sanpablocity.gov.ph/services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary-400 hover:text-primary-600"
          >
            {t('onlinePortals.allOfficialServices')}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Portal cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {portals.map((portal, idx) => {
            const meta = PORTAL_META[idx];
            return (
              <a
                key={portal.title}
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-md"
              >
                {/* Icon + badge row */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-3xl" role="img" aria-hidden="true">
                    {meta.icon}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badgeColor}`}>
                    {portal.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {portal.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-gray-500">
                  {portal.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary-600">
                  {t('onlinePortals.visitPortal')}
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          {t('onlinePortals.disclaimer')}
        </p>
      </div>
    </section>
  );
}
