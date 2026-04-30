import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { SAN_PABLO_FEATURED_HIGHLIGHTS } from '../../data/homeContent';

export default function HighlightsSection() {
  return (
    <Section>
      <Heading level={2}>Featured City Highlights</Heading>
      <Text className="text-gray-600 mb-6">
        Stories, places, and identities that define San Pablo as the City of
        Seven Lakes.
      </Text>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SAN_PABLO_FEATURED_HIGHLIGHTS.map(highlight => (
          <Card
            key={highlight.title}
            hoverable
            className="h-full overflow-hidden border-t-4 border-primary-500 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <CardContent className="p-0">
              <img
                src={highlight.imageUrl}
                alt={highlight.imageAlt}
                loading="lazy"
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  {highlight.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
