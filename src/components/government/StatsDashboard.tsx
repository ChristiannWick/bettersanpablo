import {
  Users,
  MapPin,
  Building,
  Wallet,
  TrendingUp,
  Trees,
  Droplets,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
} from 'recharts';

// ── Verified data sources ─────────────────────────────────────────────
// Population: 2024 POPCEN (Philippine Statistics Authority)
// Budget: COA Annual Audit Report on the City of San Pablo, FY 2022
// Land area, barangays: PSA / Official City Profile

export const POPULATION_HISTORY = [
  { year: '2000', population: 207927 },
  { year: '2010', population: 248890 },
  { year: '2015', population: 266068 },
  { year: '2020', population: 285348 },
  { year: '2024', population: 300166 },
];

export const BUDGET_BREAKDOWN_2022 = [
  { name: 'Personnel Services', value: 612, color: '#3b82f6' },
  { name: 'MOOE', value: 540, color: '#10b981' },
  { name: 'Capital Outlay', value: 332, color: '#f59e0b' },
  { name: '20% Dev Fund', value: 188, color: '#8b5cf6' },
  { name: '5% LDRRMF', value: 75, color: '#ef4444' },
];

export const REVENUE_SOURCES = [
  { name: 'NTA (formerly IRA)', value: 1450, color: '#3b82f6' },
  { name: 'Local Business Tax', value: 220, color: '#10b981' },
  { name: 'Real Property Tax', value: 175, color: '#f59e0b' },
  { name: 'Service Fees', value: 75, color: '#8b5cf6' },
  { name: 'Other Income', value: 40, color: '#ef4444' },
];

export const SEVEN_LAKES = [
  { name: 'Sampaloc', area: 104 },
  { name: 'Palakpakin', area: 43 },
  { name: 'Bunot', area: 30.5 },
  { name: 'Calibato', area: 42 },
  { name: 'Pandin', area: 20.5 },
  { name: 'Yambo', area: 30.5 },
  { name: 'Muhikap', area: 6.5 },
];

export const KEY_FACTS = [
  {
    icon: Users,
    label: 'Population',
    value: '300,166',
    note: '2024 POPCEN',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MapPin,
    label: 'Land Area',
    value: '197.56',
    suffix: ' km²',
    note: 'Largest city in Laguna',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Building,
    label: 'Barangays',
    value: '80',
    note: 'Component barangays',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Wallet,
    label: 'Annual Revenue',
    value: '₱1.96',
    suffix: 'B',
    note: 'FY 2022 (COA)',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: TrendingUp,
    label: 'Income Class',
    value: '1st',
    suffix: ' Class',
    note: 'Component City',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: Droplets,
    label: 'Famous Lakes',
    value: '7',
    note: 'City of Seven Lakes',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Calendar,
    label: 'City Charter',
    value: '1940',
    note: 'May 7 (CA No. 520)',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Trees,
    label: 'Patron Saint',
    value: 'St. Paul',
    note: 'Feast: January 15',
    color: 'bg-rose-50 text-rose-600',
  },
];

const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 500,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

// ── Reusable card wrapper ─────────────────────────────────────────────
function ChartCard({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  footer?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      {children}
      {footer && <p className="mt-2 text-xs text-gray-500">{footer}</p>}
    </div>
  );
}

// ── Individual chart components (also exported for detail pages) ──────

export function KeyFactsCards() {
  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {KEY_FACTS.map(fact => {
        const Icon = fact.icon;
        return (
          <div
            key={fact.label}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <span
              className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${fact.color}`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-2xl font-extrabold text-gray-900">
              {fact.value}
              {fact.suffix && (
                <span className="text-base font-bold text-gray-500">{fact.suffix}</span>
              )}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-700">
              {fact.label}
            </p>
            <p className="mt-0.5 text-[11px] text-gray-500">{fact.note}</p>
          </div>
        );
      })}
    </div>
  );
}

export function PopulationGrowthChart() {
  return (
    <ChartCard
      title="Population Growth"
      subtitle="PSA Census, 2000–2024"
      footer="~44% growth over 24 years (207,927 → 300,166)"
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={POPULATION_HISTORY}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="year" stroke="#6b7280" style={{ fontSize: 11 }} />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: 11 }}
            tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => Number(v).toLocaleString()}
          />
          <Line
            type="monotone"
            dataKey="population"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function BudgetAllocationChart() {
  return (
    <ChartCard
      title="FY 2022 Budget Allocation"
      subtitle="In ₱ millions · Source: COA Annual Audit Report"
    >
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={BUDGET_BREAKDOWN_2022}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ value }) => `₱${value}M`}
            labelLine={false}
            style={{ fontSize: 10, fontWeight: 600 }}
          >
            {BUDGET_BREAKDOWN_2022.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => `₱${v}M`}
          />
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{ fontSize: 11 }}
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function RevenueSourcesChart() {
  return (
    <ChartCard
      title="FY 2022 Revenue Sources"
      subtitle="In ₱ millions · NTA + Local Income"
      footer="Total: ₱1.96B (74% from NTA, 26% local sources)"
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={REVENUE_SOURCES} layout="vertical" margin={{ left: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
          <XAxis
            type="number"
            stroke="#6b7280"
            style={{ fontSize: 11 }}
            tickFormatter={v => `₱${v}M`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#6b7280"
            style={{ fontSize: 10 }}
            width={120}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => `₱${v}M`}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {REVENUE_SOURCES.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SevenLakesChart() {
  return (
    <ChartCard
      title="Seven Lakes by Surface Area"
      subtitle="In hectares · DENR / Wikipedia"
      footer="Sampaloc is the largest at ~104 hectares; Muhikap is the smallest at ~6.5 hectares."
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={SEVEN_LAKES}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: 10 }} />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: 11 }}
            tickFormatter={v => `${v} ha`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v) => `${v} hectares`}
          />
          <Bar dataKey="area" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ── Full dashboard (used on the index page) ───────────────────────────

export default function StatsDashboard() {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">San Pablo at a Glance</h2>
        <p className="mt-1 text-sm text-gray-500">
          Verified data from PSA, COA, and the official City Government of San Pablo.
        </p>
      </div>

      <KeyFactsCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PopulationGrowthChart />
        <BudgetAllocationChart />
        <RevenueSourcesChart />
        <SevenLakesChart />
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        Data sources: Philippine Statistics Authority (PSA) 2024 POPCEN · Commission on Audit
        FY 2022 Annual Audit Report · DENR · Official City Government of San Pablo
      </p>
    </div>
  );
}
