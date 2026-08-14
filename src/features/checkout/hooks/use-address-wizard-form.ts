'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/shared/components/ui/toast';
import { addressSchema, AddressSchema } from '../lib/schemas';
import { Address, CreateAddressPayload } from '../lib/types';
import { useCreateAddress } from './use-create-address';
import { useUpdateAddress } from './use-update-address';

export type WizardStep = 'details' | 'location';

export const WIZARD_STEPS: WizardStep[] = ['details', 'location'];

interface IUseAddressWizardFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
}

export function useAddressWizardForm({ mode, address, onSuccess }: IUseAddressWizardFormProps) {
  // Translation
  const t = useTranslations('validation');
  const tAddress = useTranslations('address');

  // State
  const [currentStep, setCurrentStep] = useState<WizardStep>('details');
  const [pinError, setPinError] = useState(false);

  // Memo
  const schema = useMemo(
    () =>
      addressSchema({
        required: t('required'),
        invalidPhone: t('invalidPhone'),
      }),
    [t]
  );

  // Form
  const form = useForm<AddressSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: address?.title ?? '',
      city: address?.city ?? '',
      street: address?.street ?? '',
      phone: { phone: address?.phone ?? '', country: '' },
      latitude: address?.latitude != null ? String(address.latitude) : '',
      longitude: address?.longitude != null ? String(address.longitude) : '',
    },
  });

  // Mutations
  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();
  const isPending = mode === 'create' ? createMutation.isPending : updateMutation.isPending;

  // Functions
  async function goNext() {
    const isValid = await form.trigger(['city', 'street', 'phone']);
    if (isValid) {
      setCurrentStep('location');
    }
  }

  function goBack() {
    setCurrentStep('details');
  }

  function setPosition(lat: number, lng: number) {
    form.setValue('latitude', String(lat), { shouldDirty: true });
    form.setValue('longitude', String(lng), { shouldDirty: true });
    setPinError(false);
  }

  function onSubmit(values: AddressSchema) {
    if (!values.latitude || !values.longitude) {
      setPinError(true);
      return;
    }

    const payload: CreateAddressPayload = {
      // The API requires a non-empty title; fall back to city if the user left the label blank.
      title: values.title?.trim() || values.city,
      city: values.city,
      street: values.street,
      phone: values.phone.phone,
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
    };

    // Callers only ever pass mode: 'edit' together with an address (see AddressWizardForm).
    const request =
      mode === 'create'
        ? createMutation.mutateAsync(payload)
        : updateMutation.mutateAsync({ id: address!.id, payload });

    request
      .then(() => {
        toast.success(mode === 'create' ? tAddress('added') : tAddress('updated'));
        onSuccess();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  }

  return {
    form,
    currentStep,
    goNext,
    goBack,
    setPosition,
    onSubmit,
    isPending,
    pinError,
  };
}
