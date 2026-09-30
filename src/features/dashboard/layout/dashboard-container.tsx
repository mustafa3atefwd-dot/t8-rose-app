import { cn } from '@/shared/lib/utils';

export default function DashboardContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('bg-ds-bg-subtle px-4', className)}>{children}</div>;
}
