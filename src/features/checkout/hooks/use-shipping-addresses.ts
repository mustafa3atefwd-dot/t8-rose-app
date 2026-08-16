import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useUserAddresses } from './use-user-addresses';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { CHECKOUT_STEPS } from '../lib/constants';
import { CheckoutStep, ICheckoutFormSchema } from '../lib/types';

interface IUseShippingAddressesProps {
  methods: UseFormReturn<ICheckoutFormSchema>;
  setCurrentStep: Dispatch<SetStateAction<CheckoutStep>>;
}

export function useShippingAddresses({ methods, setCurrentStep }: IUseShippingAddressesProps) {
  // Fetch user addresses.
  const { data, isLoading, isError } = useUserAddresses();

  const addresses = data?.payload?.addresses ?? [];

  // Get form methods and state.
  const { getValues, setValue } = methods;

  // Translations
  const t = useTranslations('checkout');

  /**
   * When user load the page, we set the primary address as default value for the address field.
   * If no primary address, we set the first address as default value.
   */
  useEffect(() => {
    // No addresses to set.
    if (!addresses?.length) return;

    const currentAddressId = getValues('addressId');

    // Address is already set.
    if (currentAddressId) return;

    // Get primary address.
    const primaryAddress = addresses.find((address) => address.isPrimary);

    // No primary address to set.
    if (!primaryAddress) return;

    // Set primary address as default value.
    setValue('addressId', primaryAddress.id, {
      shouldValidate: true,
      shouldDirty: false,
    });
  }, [addresses, getValues, setValue]);

  // Go to the next step.
  async function handleNextStep(): Promise<void> {
    // Validate address before moving to payment step.
    const valid = await methods.trigger(['addressId']);

    console.log({
      valid,
      value: methods.getValues('addressId'),
      error: methods.formState.errors,
    });

    if (valid) setCurrentStep(CHECKOUT_STEPS.PAYMENT);
  }

  // Go back to the previous step.
  function handleBackStep(): void {
    setCurrentStep(CHECKOUT_STEPS.SHIPPING);
  }

  return {
    addresses,
    isLoading,
    isError,
    handleNextStep,
    handleBackStep,
  };
}
