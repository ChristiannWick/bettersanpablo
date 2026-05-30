import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { SAN_PABLO_FEATURED_HIGHLIGHTS } from '../../data/homeContent';

const AUTO_SLIDE_MS = 5500;

interface TranslatedHighlight {
  title: string;
  description: string;
}

export default function HighlightsSection() {
  const { t } = useTranslation('common');
  const items = t('highlights.items', { returnObjects: true }) as TranslatedHighlight[];
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = items.length;

  const activeSlide = useMemo(() => items[activeIndex], [activeIndex, items]);

  const goToNext = useCallback(() => {
    setActiveIndex(current => (current + 1) % slideCount);
  }, [slideCount]);

  const goToPrevious = useCallback(() => {
    setActiveIndex(current => (current - 1 + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    const intervalId = setInterval(goToNext, AUTO_SLIDE_MS);
    return () => clearInterval(intervalId);
  }, [goToNext]);

  return (
    <Section>
      <Heading level={2}>{t('highlights.title')}</Heading>
      <Text className="text-gray-600 mb-6">{t('highlights.subtitle')}</Text>

      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
          {items.map((highlight, index) => {
            // Image metadata still comes from the data file (URLs + alt text are not translated)
            const meta = SAN_PABLO_FEATURED_HIGHLIGHTS[index];
            return (
              <article
                key={`${highlight.title}-${index}`}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeIndex
                    ? 'opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
              >
                <img
                  src={meta?.imageUrl}
                  alt={meta?.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/35 to-transparent" />
                <div className="absolute bottom-0 w-full p-5 text-white sm:p-7 lg:p-8">
                  <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {t('highlights.locationChip')}
                  </div>
                  <h3 className="mt-3 text-xl font-bold sm:text-2xl lg:text-3xl">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm text-slate-100 sm:text-base">
                    {highlight.description}
                  </p>
                </div>
              </article>
            );
          })}

          <button
            type="button"
            onClick={goToPrevious}
            aria-label={t('common.previous')}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label={t('common.next')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="inline-flex items-center gap-2">
            {items.map((highlight, index) => (
              <button
                key={highlight.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-primary-600 animate-pulse'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600">
            {activeIndex + 1} / {slideCount} - {activeSlide?.title}
          </p>
        </div>
      </div>
    </Section>
  );
}
