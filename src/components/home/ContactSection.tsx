import { Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@bettergov/kapwa/card';

const CONTACT_CARDS = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Call City Hall',
    primary: '(049) 562-0111',
    secondary: "City Mayor's Office",
    href: 'tel:0495620111',
    external: false,
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Visit Us',
    primary: 'Mabini Extension, San Pablo City',
    secondary: 'Laguna, Philippines 4000',
    href: 'https://maps.google.com/?q=San+Pablo+City+Hall,+Laguna',
    external: true,
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Office Hours',
    primary: 'Mon – Fri, 8:00 AM – 5:00 PM',
    secondary: 'Closed on public holidays',
    href: null,
    external: false,
    color: 'text-orange-600 bg-orange-50',
  },
  {
    icon: <ExternalLink className="h-6 w-6" />,
    title: 'Official Website',
    primary: 'sanpablocity.gov.ph',
    secondary: 'For official government transactions',
    href: 'https://www.sanpablocity.gov.ph',
    external: true,
    color: 'text-purple-600 bg-purple-50',
  },
];

const ContactSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Contact San Pablo City Hall
          </h2>
          <p className="mt-2 text-gray-600">
            Reach us directly or visit during office hours for in-person
            assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_CARDS.map(card => {
            const content = (
              <Card className="h-full border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex rounded-full p-3 ${card.color}`}
                  >
                    {card.icon}
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

            if (card.href) {
              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.external ? '_blank' : undefined}
                  rel={card.external ? 'noopener noreferrer' : undefined}
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
            For emergency services, call{' '}
            <a
              href="tel:911"
              className="font-bold text-red-600 hover:underline"
            >
              911
            </a>{' '}
            or view all{' '}
            <a
              href="/philippines/hotlines"
              className="text-primary-600 hover:underline"
            >
              emergency hotlines →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
