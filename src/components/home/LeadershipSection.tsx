import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';

interface Leader {
  position: string;
  name: string;
  note: string;
  priorities: string[];
}

const LEADER_HREFS = [
  '/government/departments/executive',
  '/government/departments/executive',
];

export default function LeadershipSection() {
  const { t } = useTranslation('common');
  const leaders = t('leadership.items', { returnObjects: true }) as Leader[];

  return (
    <Section className="bg-slate-50">
      <Heading level={2}>{t('leadership.title')}</Heading>
      <Text className="text-gray-600 mb-6 max-w-3xl">{t('leadership.subtitle')}</Text>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {leaders.map((leader, idx) => (
          <Link
            key={`${leader.position}-${leader.name}`}
            to={LEADER_HREFS[idx] ?? '/government/departments/executive'}
            className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          >
            <Card className="h-full border border-gray-200 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary-300 group-hover:shadow-md">
              <CardContent className="p-6">
                <p className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {leader.position}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
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

                <div className="mt-5 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
                  {t('common.viewFullProfile')}
                  <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
