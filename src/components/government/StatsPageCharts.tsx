import {
  KeyFactsCards,
  PopulationGrowthChart,
  BudgetAllocationChart,
  RevenueSourcesChart,
  SevenLakesChart,
} from './StatsDashboard';

interface Props {
  documentSlug: string;
}

/**
 * Injects relevant charts at the top of specific Reports & Statistics
 * detail pages so each page shows the data it actually describes.
 */
export default function StatsPageCharts({ documentSlug }: Props) {
  switch (documentSlug) {
    case 'city-profile':
      return (
        <div className="mb-8">
          <KeyFactsCards />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PopulationGrowthChart />
            <SevenLakesChart />
          </div>
        </div>
      );

    case 'demographics-and-population':
      return (
        <div className="mb-8">
          <KeyFactsCards />
          <PopulationGrowthChart />
        </div>
      );

    case 'financial-and-performance-reports':
    case 'city-budget-summary':
      return (
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BudgetAllocationChart />
          <RevenueSourcesChart />
        </div>
      );

    case 'development-and-infrastructure-statistics':
      return (
        <div className="mb-8">
          <KeyFactsCards />
        </div>
      );

    default:
      return null;
  }
}
