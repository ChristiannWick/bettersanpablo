import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';
import {
  SAN_PABLO_ABOUT_PARAGRAPHS,
  SAN_PABLO_CITY_STATS,
  SAN_PABLO_HISTORY_TIMELINE,
} from '../data/homeContent';

const About: React.FC = () => {
  return (
    <>
      <SEO
        title="About San Pablo"
        description="Learn about San Pablo City, Laguna, known as the City of Seven Lakes."
        keywords="San Pablo City, Laguna, City of Seven Lakes, history, local government"
      />
      <Section>
        <div className="max-w-4xl mb-8">
          <Heading level={2}>About San Pablo City</Heading>
          {SAN_PABLO_ABOUT_PARAGRAPHS.map(paragraph => (
            <Text key={paragraph} className="text-gray-700">
              {paragraph}
            </Text>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-10">
          {SAN_PABLO_CITY_STATS.map(stat => (
            <Card key={stat.label} className="border border-gray-200">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-primary-700">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-700">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Heading level={3}>History Snapshot</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SAN_PABLO_HISTORY_TIMELINE.map(entry => (
            <Card
              key={`${entry.year}-${entry.title}`}
              className="border border-gray-200"
            >
              <CardContent className="p-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {entry.year} - {entry.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{entry.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;
