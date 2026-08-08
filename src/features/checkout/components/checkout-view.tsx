import { getTranslations } from 'next-intl/server';
import DeliveryAddressSection from './delivery-address-section';

export default async function CheckoutView() {
  const t = await getTranslations('checkoutPage');

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">

      <h1 className="text-ds-text-plain text-2xl font-bold">{t('title')}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <DeliveryAddressSection />
      </div>

 
    </div>
  );
}
