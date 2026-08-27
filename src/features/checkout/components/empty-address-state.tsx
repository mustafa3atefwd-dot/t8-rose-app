import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface IEmptyAddressStateProps {
  onAddAddress: () => void;
}

export default function EmptyAddressState({ onAddAddress }: IEmptyAddressStateProps) {
  const t = useTranslations('checkout');

  return (
    <section
      className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-zinc-300 p-6 py-12 text-center"
      aria-labelledby="empty-address-title"
    >
      {/* Empty state message */}
      <p id="empty-address-title" className="font-medium text-zinc-600">
        {t('shipping.empty.title')}
      </p>

      {/* Add address button */}
      <button
        type="button"
        onClick={onAddAddress}
        className="border-maroon-600 text-maroon-600 hover:bg-maroon-50 focus-visible:ring-maroon-600 inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {/* Add icon */}
        <Plus className="h-4 w-4" aria-hidden="true" />

        {/* Add address button text */}
        {t('shipping.empty.action')}
      </button>
    </section>
  );
}
