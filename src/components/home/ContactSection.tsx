import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@bettergov/kapwa/card';

interface ContactCard {
  title: string;
  primary: string;
  secondary: string;
}

const CARD_META = [
  {
    icon: <Phone className="h-6 w-6" />,
    href: 'tel:0495620111',
    external: false,
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    href: 'https://maps.google.com/?q=San+Pablo+City+Hall,+Laguna',
    external: true,
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    href: null as string | null,
    external: false,
    color: 'text-orange-600 bg-orange-50',
  },
  {
    icon: <ExternalLink className="h-6 w-6" />,
    href: 'https://www.sanpablocity.gov.ph',
    external: true,
    color: 'text-purple-600 bg-purple-50',
  },
];

const ContactSection: React.FC = () => {
  const { t } = useTranslation('common');
  const cards = t('contact.cards', { returnObjects: true }) as ContactCard[];

  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {t('contact.title')}
          </h2>
          <p className="mt-2 text-gray-600">{t('contact.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const meta = CARD_META[idx];
            const content = (
              <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex rounded-full p-3 ${meta.color}`}
                  >
                    {meta.icon}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {card.primary}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">{card.secondary}</p>
                </CardContent>
              </Card>
            );

            if (meta.href) {
              return (
                <a
                  key={card.title}
                  href={meta.href}
                  target={meta.external ? '_blank' : undefined}
                  rel={meta.external ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return <div key={card.title}>{content}</div>;
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('contact.emergencyNote')}{' '}
            <a
              href="tel:911"
              className="font-bold text-red-600 hover:underline"
            >
              911
            </a>{' '}
            -{' '}
            <a
              href="/philippines/hotlines"
              className="text-primary-600 hover:underline"
            >
              {t('contact.viewAllHotlines')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
