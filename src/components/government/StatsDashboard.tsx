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

const POPULATION_HISTORY = [
  { year: '2000', population: 207927 },
  { year: '2010', population: 248890 },
  { year: '2015', population: 266068 },
  { year: '2020', population: 285348 },
  { year: '2024', population: 300166 },
];

const BUDGET_BREAKDOWN_2022 = [
  { name: 'Personnel Services', value: 612, color: '#3b82f6' },
  { name: 'MOOE', value: 540, color: '#10b981' },
  { name: 'Capital Outlay', value: 332, color: '#f59e0b' },
  { name: '20% Dev Fund', value: 188, color: '#8b5cf6' },
  { name: '5% LDRRMF', value: 75, color: '#ef4444' },
];

const REVENUE_SOURCES = [
  { name: 'NTA (formerly IRA)', value: 1450, color: '#3b82f6' },
  { name: 'Local Business Tax', value: 220, color: '#10b981' },
  { name: 'Real Property Tax', value: 175, color: '#f59e0b' },
  { name: 'Service Fees', value: 75, color: '#8b5cf6' },
  { name: 'Other Income', value: 40, color: '#ef4444' },
];

const SEVEN_LAKES = [
  { name: 'Sampaloc', area: 104 },
  { name: 'Palakpakin', area: 43 },
  { name: 'Bunot', area: 30.5 },
  { name: 'Calibato', area: 42 },
  { name: 'Pandin', area: 20.5 },
  { name: 'Yambo', area: 30.5 },
  { name: 'Muhikap', area: 6.5 },
];

const KEY_FACTS = [
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

// Custom tooltip styling
const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  fontWeight: 500,
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

export default function StatsDashboard() {
  return (
    <div className="mb-12">
      {/* ── Section header ── */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">San Pablo at a Glance</h2>
        <p className="mt-1 text-sm text-gray-500">
          Verified data from PSA, COA, and the official City Government of San Pablo.
        </p>
      </div>

      {/* ── Key fact cards ── */}
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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

      {/* ── Charts grid ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Population growth over time */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Population Growth</h3>
            <p className="text-xs text-gray-500">PSA Census, 2000–2024</p>
          </div>
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
                formatter={(v: number) => v.toLocaleString()}
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
          <p className="mt-2 text-xs text-gray-500">
            ~44% growth over 24 years (207,927 → 300,166)
          </p>
        </div>

        {/* Budget allocation breakdown */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">FY 2022 Budget Allocation</h3>
            <p className="text-xs text-gray-500">In ₱ millions · Source: COA Annual Audit Report</p>
          </div>
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
                formatter={(v: number) => `₱${v}M`}
              />
              <Legend
                verticalAlign="bottom"
                wrapperStyle={{ fontSize: 11 }}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue sources */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">FY 2022 Revenue Sources</h3>
            <p className="text-xs text-gray-500">In ₱ millions · NTA + Local Income</p>
          </div>
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
                formatter={(v: number) => `₱${v}M`}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {REVENUE_SOURCES.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs text-gray-500">
            Total: ₱1.96B (74% from NTA, 26% local sources)
          </p>
        </div>

        {/* Seven Lakes by area */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-900">Seven Lakes by Surface Area</h3>
            <p className="text-xs text-gray-500">In hectares · DENR / Wikipedia</p>
          </div>
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
                formatter={(v: number) => `${v} hectares`}
              />
              <Bar dataKey="area" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-xs text-gray-500">
            Sampaloc is the largest at ~104 hectares; Muhikap is the smallest at ~6.5 hectares.
          </p>
        </div>
      </div>

      {/* ── Sources note ── */}
      <p className="mt-6 text-center text-xs text-gray-400">
        Data sources: Philippine Statistics Authority (PSA) 2024 POPCEN · Commission on Audit
        FY 2022 Annual Audit Report · DENR · Official City Government of San Pablo
      </p>
    </div>
  );
}
