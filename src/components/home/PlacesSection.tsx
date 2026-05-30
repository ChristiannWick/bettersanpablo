import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SAN_PABLO_TOP_PLACES } from '../../data/homeContent';

interface Place {
  title: string;
  description: string;
}

export default function PlacesSection() {
  const { t } = useTranslation('common');
  const places = t('places.items', { returnObjects: true }) as Place[];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              <MapPin className="h-3 w-3" />
              {t('places.badge')}
            </span>
            <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              {t('places.title')}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{t('places.subtitle')}</p>
          </div>
          <Link
            to="/attractions"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary-400 hover:text-primary-600"
          >
            {t('common.viewAllAttractions')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {places.map((place, idx) => {
            const meta = SAN_PABLO_TOP_PLACES[idx];
            return (
              <div
                key={place.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={meta?.imageUrl}
                    alt={meta?.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                  <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-gray-800 shadow">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <h3 className="text-base font-semibold text-gray-900">
                      {place.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {place.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
