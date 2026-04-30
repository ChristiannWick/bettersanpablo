import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { SAN_PABLO_HISTORY_TIMELINE } from '../../data/homeContent';
import { Card, CardContent } from '@bettergov/kapwa/card';

export default function HistorySection() {
  return (
    <Section>
      <Heading level={2}>History Timeline</Heading>
      <Text className="text-gray-600 mb-6 max-w-3xl">
        A quick look at how San Pablo evolved from early lakeside settlements
        into today&apos;s City of Seven Lakes.
      </Text>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SAN_PABLO_HISTORY_TIMELINE.map(entry => (
          <Card
            key={entry.period}
            className="h-full border-l-4 border-l-primary-500 border-t-0"
          >
            <CardContent className="p-5">
              <h3 className="text-base font-semibold text-gray-900">
                {entry.period}
              </h3>
              <ul className="mt-3 space-y-2">
                {entry.points.map(point => (
                  <li key={point} className="text-sm text-gray-700">
                    <span className="mr-2 text-primary-600">-</span>
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
