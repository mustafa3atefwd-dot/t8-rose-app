import clsx from 'clsx';

interface ISectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: ISectionLabelProps) {
  return (
    <span className={clsx('text-ds-text-secondary mb-2 text-xs font-bold tracking-[3px] uppercase', className)}>
      {children}
    </span>
  );
}
