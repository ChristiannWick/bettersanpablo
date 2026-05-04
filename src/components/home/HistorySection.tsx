import { SAN_PABLO_COCONUT_FESTIVAL, SAN_PABLO_HISTORY_TIMELINE } from '../../data/homeContent';
import { Star } from 'lucide-react';

// Assign a color accent per entry to make the timeline visually varied
const ACCENT_COLORS = [
  'bg-blue-600',
  'bg-indigo-600',
  'bg-purple-600',
  'bg-blue-700',
  'bg-emerald-600',
  'bg-orange-500',
  'bg-teal-600',
  'bg-primary-600',
];

export default function HistorySection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <span className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
            History
          </span>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
            A City Shaped by Time
          </h2>
          <p className="mt-3 text-gray-500 text-sm leading-relaxed">
            Important milestones that shaped San Pablo City — from its earliest
            settlement to modern civic life.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Timeline cards — 2/3 width */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SAN_PABLO_HISTORY_TIMELINE.map((entry, idx) => (
                <div
                  key={`${entry.year}-${idx}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Colored accent bar at top */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1 ${ACCENT_COLORS[idx % ACCENT_COLORS.length]}`}
                  />

                  {/* Year badge */}
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white ${ACCENT_COLORS[idx % ACCENT_COLORS.length]}`}
                  >
                    {entry.year}
                  </span>

                  <h3 className="mt-3 text-base font-semibold text-gray-900">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Festival spotlight — 1/3 width */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 p-6 text-white shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 fill-white text-white" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Festival Spotlight
                </span>
              </div>

              <h3 className="text-xl font-bold leading-snug">
                {SAN_PABLO_COCONUT_FESTIVAL.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {SAN_PABLO_COCONUT_FESTIVAL.description}
              </p>

              <ul className="mt-5 space-y-3">
                {SAN_PABLO_COCONUT_FESTIVAL.highlights.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                    <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-white/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
