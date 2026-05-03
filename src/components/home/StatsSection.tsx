import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { SAN_PABLO_CITY_STATS } from '../../data/homeContent';

export default function StatsSection() {
  return (
    <Section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white">
      <Heading level={2} className="text-white">
        San Pablo at a Glance
      </Heading>
      <Text className="text-blue-200 mb-8">
        Key facts and figures for the City of Seven Lakes.
      </Text>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {SAN_PABLO_CITY_STATS.map(stat => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur-sm"
          >
            <p className="text-2xl font-extrabold text-white leading-tight">
              {stat.value}
            </p>
            <p className="mt-1.5 text-xs font-medium text-blue-200 leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
