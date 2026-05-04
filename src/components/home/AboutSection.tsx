import { MapPin, Calendar, Users, Layers } from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { SAN_PABLO_ABOUT_PARAGRAPHS } from '../../data/homeContent';

const QUICK_FACTS = [
  { icon: Users, label: 'Population', value: '300,166' },
  { icon: MapPin, label: 'Province', value: 'Laguna' },
  { icon: Layers, label: 'Barangays', value: '80' },
  { icon: Calendar, label: 'Chartered', value: '1940' },
];

export default function AboutSection() {
  return (
    <Section className="bg-slate-50">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        {/* Left — text */}
        <div>
          <span className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            About San Pablo
          </span>
          <Heading level={2} className="mt-4">
            The City of Seven Lakes
          </Heading>
          {SAN_PABLO_ABOUT_PARAGRAPHS.map(paragraph => (
            <p key={paragraph} className="mt-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right — quick facts cards */}
        <div className="grid grid-cols-2 gap-4">
          {QUICK_FACTS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold text-gray-900">{value}</p>
              <p className="mt-0.5 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
