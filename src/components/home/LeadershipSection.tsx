import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useState, KeyboardEvent } from 'react';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { SAN_PABLO_CITY_LEADERSHIP } from '../../data/homeContent';

export default function LeadershipSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLeader = (index: number) => setSelectedIndex(index);
  const closeLeader = () => setSelectedIndex(null);

  return (
    <Section className="bg-slate-50">
      <Heading level={2}>City Leadership</Heading>
      <Text className="text-gray-600 mb-6 max-w-3xl">
        Local executive and legislative leadership profiles for San Pablo City.
      </Text>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SAN_PABLO_CITY_LEADERSHIP.map((leader, idx) => {
          const clickable = /mayor/i.test(leader.position);
          return (
            <Card
              key={`${leader.position}-${leader.name}`}
              onClick={clickable ? () => openLeader(idx) : undefined}
              onKeyDown={
                clickable
                  ? (e: KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLeader(idx);
                      }
                    }
                  : undefined
              }
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
              className={`h-full border border-gray-200 transition-transform duration-200 ${
                clickable
                  ? 'cursor-pointer hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm'
                  : 'hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <CardContent className="p-6">
                <p className="inline-flex rounded-full bg-primary-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
                  {leader.position}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leader-dialog-title"
          onClick={closeLeader}
        >
          <div className="mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{SAN_PABLO_CITY_LEADERSHIP[selectedIndex].position}</p>
                <h2 id="leader-dialog-title" className="mt-1 text-xl font-semibold text-gray-900">
                  {SAN_PABLO_CITY_LEADERSHIP[selectedIndex].name}
                </h2>
              </div>
              <button onClick={closeLeader} aria-label="Close" className="ml-4 rounded-md bg-gray-100 p-2 text-gray-700 hover:bg-gray-200">
                ×
              </button>
            </div>

            <p className="mt-4 text-gray-700">{SAN_PABLO_CITY_LEADERSHIP[selectedIndex].note}</p>
            <h3 className="mt-4 text-sm font-semibold text-gray-900">Priorities</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {SAN_PABLO_CITY_LEADERSHIP[selectedIndex].priorities.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  );
}
