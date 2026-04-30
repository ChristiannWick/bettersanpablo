import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import {
  SAN_PABLO_COCONUT_FESTIVAL,
  SAN_PABLO_HISTORY_TIMELINE,
} from '../../data/homeContent';
import { Card, CardContent } from '@bettergov/kapwa/card';

export default function HistorySection() {
  return (
    <Section>
      <Heading level={2}>History Timeline</Heading>
      <Text className="text-gray-600 mb-6 max-w-3xl">
        Important milestones that shaped San Pablo City from its early
        settlement era to modern cultural and civic life.
      </Text>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative pl-8">
            <div className="absolute bottom-0 left-3 top-0 w-px bg-gray-300" />
            <div className="space-y-8">
              {SAN_PABLO_HISTORY_TIMELINE.map((entry, index) => (
                <article key={`${entry.year}-${entry.title}-${index}`} className="relative">
                  <span className="absolute -left-[23px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-primary-600 shadow-sm" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">
                    {entry.year}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {entry.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card className="border border-gray-200">
            <CardContent className="p-5">
              <p className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                Festival Spotlight
              </p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {SAN_PABLO_COCONUT_FESTIVAL.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                {SAN_PABLO_COCONUT_FESTIVAL.description}
              </p>

              <ul className="mt-4 space-y-2">
                {SAN_PABLO_COCONUT_FESTIVAL.highlights.map(item => (
                  <li key={item} className="text-sm text-gray-700">
                    <span className="mr-2 text-primary-600">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
