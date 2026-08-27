import { unauthorized } from 'next/navigation';

export default function DashboardPage() {
  // For test error boundary
  // throw new Error('Something went wrong');

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
