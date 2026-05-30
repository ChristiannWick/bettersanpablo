import { useTranslation } from 'react-i18next';

interface Stat {
  value: string;
  label: string;
}

const STAT_ACCENTS = ['👥', '🏘️', '🌊', '🗺️', '🏙️', '⭐'];

export default function StatsSection() {
  const { t } = useTranslation('common');
  const stats = t('stats.items', { returnObjects: true }) as Stat[];

  return (
    <section className="bg-blue-950 py-14">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t('stats.title')}
          </h2>
          <p className="mt-2 text-blue-300 text-sm">{t('stats.subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <span className="mb-2 text-2xl" role="img" aria-hidden="true">
                {STAT_ACCENTS[idx] ?? '📌'}
              </span>
              <p className="text-2xl font-extrabold text-white leading-tight sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-blue-300 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
