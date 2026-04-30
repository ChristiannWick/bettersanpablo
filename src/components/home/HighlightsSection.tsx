import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { SAN_PABLO_FEATURED_HIGHLIGHTS } from '../../data/homeContent';

const AUTO_SLIDE_MS = 5500;

export default function HighlightsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = SAN_PABLO_FEATURED_HIGHLIGHTS.length;

  const activeSlide = useMemo(
    () => SAN_PABLO_FEATURED_HIGHLIGHTS[activeIndex],
    [activeIndex]
  );

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
      <Heading level={2}>Featured City Highlights</Heading>
      <Text className="text-gray-600 mb-6">
        A visual tour of San Pablo, Laguna with more destinations, stories, and
        city landmarks.
      </Text>

      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="relative h-[22rem] sm:h-[26rem] lg:h-[30rem]">
          {SAN_PABLO_FEATURED_HIGHLIGHTS.map((highlight, index) => (
            <article
              key={`${highlight.title}-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
            >
              <img
                src={highlight.imageUrl}
                alt={highlight.imageAlt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/35 to-transparent" />
              <div className="absolute bottom-0 w-full p-5 text-white sm:p-7 lg:p-8">
                <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  San Pablo, Laguna
                </div>
                <h3 className="mt-3 text-xl font-bold sm:text-2xl lg:text-3xl">
                  {highlight.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-slate-100 sm:text-base">
                  {highlight.description}
                </p>
              </div>
            </article>
          ))}

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous highlight"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next highlight"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="inline-flex items-center gap-2">
            {SAN_PABLO_FEATURED_HIGHLIGHTS.map((highlight, index) => (
              <button
                key={highlight.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-primary-600 animate-pulse'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600">
            {activeIndex + 1} / {slideCount} - {activeSlide.title}
          </p>
        </div>
      </div>
    </Section>
  );
}
