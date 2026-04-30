import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { SAN_PABLO_ABOUT_PARAGRAPHS } from '../../data/homeContent';

export default function AboutSection() {
  return (
    <Section className="bg-slate-50">
      <div className="max-w-4xl">
        <span className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
          About San Pablo
        </span>
        <Heading level={2} className="mt-4">
          The City of Seven Lakes
        </Heading>
        {SAN_PABLO_ABOUT_PARAGRAPHS.map(paragraph => (
          <Text key={paragraph} className="text-gray-700">
            {paragraph}
          </Text>
        ))}
      </div>
    </Section>
  );
}
