import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { SAN_PABLO_CITY_LEADERSHIP } from '../../data/homeContent';

export default function LeadershipSection() {
  return (
    <Section className="bg-slate-50">
      <Heading level={2}>City Leadership</Heading>
      <Text className="text-gray-600 mb-6 max-w-3xl">
        Local executive and legislative leadership profiles for San Pablo City.
      </Text>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SAN_PABLO_CITY_LEADERSHIP.map(leader => (
          <Card
            key={`${leader.position}-${leader.name}`}
            className="h-full border border-gray-200 transition-transform duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
          >
            <CardContent className="p-6">
              <p className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                {leader.position}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {leader.name}
              </h3>
              <p className="mt-2 text-sm text-gray-700">{leader.note}</p>

              <ul className="mt-4 space-y-2">
                {leader.priorities.map(item => (
                  <li key={item} className="text-sm text-gray-700">
                    <span className="mr-2 text-primary-600">-</span>
                    {item}
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
