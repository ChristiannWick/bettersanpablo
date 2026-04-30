import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { SAN_PABLO_TOP_PLACES } from '../../data/homeContent';

export default function PlacesSection() {
  return (
    <Section className="bg-slate-50">
      <Heading level={2}>Top Places to Visit</Heading>
      <Text className="text-gray-600 mb-6">
        Explore the most visited natural and cultural landmarks across San
        Pablo City.
      </Text>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SAN_PABLO_TOP_PLACES.map(place => (
          <Card
            key={place.title}
            hoverable
            className="h-full overflow-hidden border border-gray-200 transition-transform duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
          >
            <CardContent className="p-0">
              <img
                src={place.imageUrl}
                alt={place.imageAlt}
                loading="lazy"
                className="h-56 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {place.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{place.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
