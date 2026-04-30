import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { SAN_PABLO_CITY_STATS } from '../../data/homeContent';

export default function StatsSection() {
  return (
    <Section className="bg-blue-50">
      <Heading level={2}>San Pablo at a Glance</Heading>
      <Text className="text-gray-600 mb-6">
        Snapshot figures for planning, service delivery, and local context.
      </Text>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SAN_PABLO_CITY_STATS.map(stat => (
          <Card
            key={stat.label}
            className="border border-gray-200 transition-transform duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-primary-700">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-700">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
