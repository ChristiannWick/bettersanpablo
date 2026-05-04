import SEO from '../components/SEO';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';

const Accessibility: React.FC = () => {
  return (
    <>
      <SEO
        title="Accessibility"
        description="Accessibility statement for BetterSanPablo.org — our commitment to making local government information accessible to everyone."
        keywords="accessibility, WCAG, San Pablo City, BetterSanPablo"
      />
      <Section>
        <div className="max-w-3xl">
          <Heading level={2}>Accessibility Statement</Heading>
          <Text className="text-gray-500 text-sm mb-8">
            Last updated: May 2025
          </Text>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Our Commitment
              </h3>
              <Text className="text-gray-700">
                BetterSanPablo.org is committed to ensuring digital
                accessibility for people with disabilities. We continuously
                improve the user experience for everyone and apply relevant
                accessibility standards.
              </Text>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Conformance Status
              </h3>
              <Text className="text-gray-700">
                We aim to meet the Web Content Accessibility Guidelines (WCAG)
                2.1 Level AA standards. These guidelines explain how to make web
                content more accessible to people with disabilities.
              </Text>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Features We Support
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>
                  Keyboard navigation — all pages are navigable via keyboard
                </li>
                <li>
                  Screen reader support — semantic HTML and ARIA labels are
                  used throughout
                </li>
                <li>
                  Text scaling — layouts remain readable at up to 200% zoom
                </li>
                <li>
                  Color contrast — text meets minimum contrast ratios for
                  readability
                </li>
                <li>
                  Skip links — available to bypass repetitive navigation
                </li>
                <li>
                  Descriptive alt text on all informational images
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Known Limitations
              </h3>
              <Text className="text-gray-700">
                Some older PDF documents linked from this site may not fully
                conform to accessibility standards. We recommend requesting
                alternative formats directly from the relevant city department.
              </Text>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Feedback and Contact
              </h3>
              <Text className="text-gray-700">
                If you experience any accessibility barriers on this site,
                please open an issue on our{' '}
                <a
                  href="https://github.com/ChristiannWick/better-lgu-directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  GitHub repository
                </a>
                . We take all feedback seriously and aim to respond within 5
                business days.
              </Text>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <Text className="text-gray-500 text-sm">
                BetterSanPablo.org is a community-run, volunteer-operated
                portal. It is not an official government website. For official
                city services, visit{' '}
                <a
                  href="https://www.sanpablocity.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  sanpablocity.gov.ph
                </a>
                .
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Accessibility;
