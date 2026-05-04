import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Phone, AlertTriangle, Flame, Heart, Shield, Building2 } from 'lucide-react';

interface HotlineEntry {
  label: string;
  number: string;
  note?: string;
  icon: React.ReactNode;
  urgent?: boolean;
}

const SAN_PABLO_HOTLINES: HotlineEntry[] = [
  {
    label: 'PNP San Pablo City Police',
    number: '(049) 562-8765',
    note: 'San Pablo City Police Station',
    icon: <Shield className="h-5 w-5" />,
    urgent: true,
  },
  {
    label: 'BFP San Pablo City Fire',
    number: '(049) 562-4321',
    note: 'Bureau of Fire Protection — San Pablo City',
    icon: <Flame className="h-5 w-5" />,
    urgent: true,
  },
  {
    label: 'CDRRMO Emergency Hotline',
    number: '0998 540 7171',
    note: 'City Disaster Risk Reduction and Management Office',
    icon: <Heart className="h-5 w-5" />,
    urgent: true,
  },
  {
    label: 'CDRRMO Office Line',
    number: '(049) 800-0405',
    note: 'CDRRMO — Non-emergency coordination line',
    icon: <Heart className="h-5 w-5" />,
    urgent: true,
  },
  {
    label: 'City Information Office',
    number: '(049) 561-1483',
    note: 'City Information Office — Official press and announcements',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    label: 'City Administrator\'s Office',
    number: '(049) 521-0307',
    note: 'City Administrator — Administrative concerns',
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    label: 'San Pablo City Hall Main',
    number: '(049) 562-0111',
    note: "City Mayor's Office — General inquiries",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    label: 'SPCWD (Water District)',
    number: '(049) 562-9955',
    note: 'San Pablo City Water District — Maharlika Highway, San Gabriel',
    icon: <Phone className="h-5 w-5" />,
  },
  {
    label: 'Records Office (FOI)',
    number: '(049) 562-1234 loc 205',
    note: 'Freedom of Information document requests',
    icon: <Phone className="h-5 w-5" />,
  },
  {
    label: 'Meralco Customer Care',
    number: '1-800-10-MERALCO',
    note: 'Power / electricity concerns',
    icon: <Phone className="h-5 w-5" />,
  },
];

const NATIONAL_HOTLINES: HotlineEntry[] = [
  {
    label: 'Emergency Hotline',
    number: '911',
    note: 'National emergency number (Police, Fire, Medical)',
    icon: <AlertTriangle className="h-5 w-5" />,
    urgent: true,
  },
  {
    label: 'NDRRMC',
    number: '(02) 8911-5061',
    note: 'National Disaster Risk Reduction and Management Council',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    label: 'DOH Health Emergency',
    number: '(02) 8651-7800 loc 5003-5004',
    note: 'Department of Health hotline',
    icon: <Heart className="h-5 w-5" />,
  },
  {
    label: 'NBI Hotline',
    number: '(02) 8523-8231',
    note: 'National Bureau of Investigation',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    label: 'DSWD Crisis Intervention',
    number: '(02) 8931-8101',
    note: 'Social welfare emergency',
    icon: <Heart className="h-5 w-5" />,
  },
  {
    label: 'PhilHealth',
    number: '(02) 8441-7442',
    note: 'Health insurance inquiries',
    icon: <Phone className="h-5 w-5" />,
  },
];

const HotlineCard: React.FC<{ entry: HotlineEntry }> = ({ entry }) => (
  <Card
    className={`border ${entry.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}
  >
    <CardContent className="p-5 flex items-start gap-4">
      <div
        className={`mt-0.5 rounded-full p-2 ${entry.urgent ? 'bg-red-100 text-red-600' : 'bg-primary-100 text-primary-600'}`}
      >
        {entry.icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">{entry.label}</p>
        <a
          href={`tel:${entry.number.replace(/[^0-9+]/g, '')}`}
          className={`text-lg font-bold ${entry.urgent ? 'text-red-600' : 'text-primary-600'} hover:underline`}
        >
          {entry.number}
        </a>
        {entry.note && (
          <p className="text-xs text-gray-500 mt-0.5">{entry.note}</p>
        )}
      </div>
    </CardContent>
  </Card>
);

const Hotlines: React.FC = () => {
  return (
    <>
      <SEO
        title="Emergency Hotlines"
        description="Emergency and important hotlines for San Pablo City, Laguna — police, fire, ambulance, city hall, and national emergency contacts."
        keywords="San Pablo City hotlines, emergency numbers, PNP, BFP, CDRRMO, Laguna"
      />
      <Section>
        <div className="max-w-4xl">
          <Heading level={2}>Emergency Hotlines</Heading>
          <p className="text-gray-600 mb-8">
            Important contact numbers for San Pablo City, Laguna and national
            emergency services. Save these in your phone for quick access.
          </p>

          <div className="mb-10">
            <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              San Pablo City — Local Hotlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SAN_PABLO_HOTLINES.map(entry => (
                <HotlineCard key={entry.label} entry={entry} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary-500" />
              National Hotlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NATIONAL_HOTLINES.map(entry => (
                <HotlineCard key={entry.label} entry={entry} />
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> For life-threatening emergencies, always
              call <strong>911</strong> first. Phone numbers may change — verify
              with the{' '}
              <a
                href="https://www.sanpablocity.gov.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                official city website
              </a>{' '}
              if needed.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Hotlines;
