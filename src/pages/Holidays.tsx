import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Calendar } from 'lucide-react';

interface HolidayEntry {
  date: string;
  name: string;
  type: 'regular' | 'special-nonworking' | 'special-working';
}

const HOLIDAYS_2025: HolidayEntry[] = [
  { date: 'January 1', name: "New Year's Day", type: 'regular' },
  { date: 'January 29', name: 'Chinese New Year', type: 'special-nonworking' },
  { date: 'February 25', name: 'EDSA People Power Revolution Anniversary', type: 'special-nonworking' },
  { date: 'April 9', name: 'Araw ng Kagitingan (Day of Valor)', type: 'regular' },
  { date: 'April 17', name: 'Maundy Thursday', type: 'regular' },
  { date: 'April 18', name: 'Good Friday', type: 'regular' },
  { date: 'April 19', name: 'Black Saturday', type: 'special-nonworking' },
  { date: 'May 1', name: 'Labor Day', type: 'regular' },
  { date: 'June 12', name: 'Independence Day', type: 'regular' },
  { date: 'August 21', name: 'Ninoy Aquino Day', type: 'special-nonworking' },
  { date: 'August 25', name: 'National Heroes Day', type: 'regular' },
  { date: 'November 1', name: "All Saints' Day", type: 'special-nonworking' },
  { date: 'November 2', name: "All Souls' Day", type: 'special-nonworking' },
  { date: 'November 30', name: "Bonifacio Day", type: 'regular' },
  { date: 'December 8', name: "Feast of the Immaculate Conception", type: 'special-nonworking' },
  { date: 'December 24', name: "Christmas Eve", type: 'special-nonworking' },
  { date: 'December 25', name: "Christmas Day", type: 'regular' },
  { date: 'December 30', name: "Rizal Day", type: 'regular' },
  { date: 'December 31', name: "Last Day of the Year", type: 'special-nonworking' },
];

const SAN_PABLO_LOCAL_HOLIDAYS: HolidayEntry[] = [
  { date: 'January 15', name: 'Feast of St. Paul the First Hermit (City Fiesta)', type: 'special-nonworking' },
  { date: 'January 9–15', name: 'Coco Festival Week', type: 'special-nonworking' },
  { date: 'March 30', name: 'San Pablo City Charter Anniversary', type: 'special-nonworking' },
];

const TYPE_CONFIG = {
  regular: {
    label: 'Regular Holiday',
    classes: 'bg-red-50 border-red-200 text-red-700',
    dot: 'bg-red-500',
  },
  'special-nonworking': {
    label: 'Special Non-Working',
    classes: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    dot: 'bg-yellow-500',
  },
  'special-working': {
    label: 'Special Working',
    classes: 'bg-blue-50 border-blue-200 text-blue-700',
    dot: 'bg-blue-500',
  },
};

const HolidayCard: React.FC<{ entry: HolidayEntry }> = ({ entry }) => {
  const config = TYPE_CONFIG[entry.type];
  return (
    <Card className={`border ${config.classes}`}>
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${config.dot}`} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">{entry.name}</p>
          <p className="text-xs text-gray-500">
            {entry.date} · {config.label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Holidays: React.FC = () => {
  return (
    <>
      <SEO
        title="Public Holidays 2025"
        description="Official Philippine public holidays and San Pablo City local holidays for 2025."
        keywords="Philippine holidays 2025, San Pablo City holidays, public holidays, special non-working days"
      />
      <Section>
        <div className="max-w-4xl">
          <Heading level={2}>Public Holidays 2025</Heading>
          <p className="text-gray-600 mb-6">
            Official national holidays and San Pablo City local holidays
            declared for 2025. Verify the latest proclamations at the{' '}
            <a
              href="https://www.officialgazette.gov.ph"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Official Gazette
            </a>
            .
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-8">
            {Object.values(TYPE_CONFIG).map(config => (
              <div key={config.label} className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${config.dot}`} />
                <span className="text-sm text-gray-600">{config.label}</span>
              </div>
            ))}
          </div>

          {/* San Pablo Local */}
          <div className="mb-10">
            <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary-500" />
              San Pablo City — Local Holidays
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SAN_PABLO_LOCAL_HOLIDAYS.map(entry => (
                <HolidayCard key={entry.name} entry={entry} />
              ))}
            </div>
          </div>

          {/* National */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary-500" />
              Philippine National Holidays
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOLIDAYS_2025.map(entry => (
                <HolidayCard key={entry.name} entry={entry} />
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> This list is for reference only.
              Official holiday dates are declared via Presidential Proclamations
              and may be adjusted. Always confirm with the{' '}
              <a
                href="https://www.officialgazette.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                Official Gazette of the Philippines
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Holidays;
