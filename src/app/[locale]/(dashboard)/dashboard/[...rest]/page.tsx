import { notFound } from 'next/navigation';

// Unmatched dashboard URLs render the dashboard not-found inside the dashboard shell
export default function DashboardCatchAllPage() {
  notFound();
}
