import { MapPin, Calendar, Users, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';

const QUICK_FACT_ICONS = [Users, MapPin, Layers, Calendar];

interface QuickFact {
  label: string;
  value: string;
}

export default function AboutSection() {
  const { t } = useTranslation('common');
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[];
  const quickFacts = t('about.quickFacts', { returnObjects: true }) as QuickFact[];

  return (
    <Section className="bg-slate-50">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">
        {/* Left — text */}
        <div>
          <span className="inline-flex rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            {t('about.badge')}
          </span>
          <Heading level={2} className="mt-4">
            {t('about.title')}
          </Heading>
          {paragraphs.map(paragraph => (
            <p key={paragraph} className="mt-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Right — quick facts cards */}
        <div className="grid grid-cols-2 gap-4">
          {quickFacts.map((fact, idx) => {
            const Icon = QUICK_FACT_ICONS[idx] ?? Users;
            return (
              <div
                key={fact.label}
                className="flex flex-col items-start rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-bold text-gray-900">{fact.value}</p>
                <p className="mt-0.5 text-sm text-gray-500">{fact.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
