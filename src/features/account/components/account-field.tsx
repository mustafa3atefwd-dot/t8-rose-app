import { Input } from '@/shared/components/ui/inputs/input';

export function AccountField({ label, ...props }: React.ComponentProps<typeof Input> & { label: string }) {
  return (
    <label className="text-ds-text-plain grid gap-2 text-sm font-medium">
      {label}
      <Input {...props} />
    </label>
  );
}
