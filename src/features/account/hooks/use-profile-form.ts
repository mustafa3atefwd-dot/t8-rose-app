'use client';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import type { IUser } from '@/shared/lib/types/user';
import { profileSchema, type ProfileFormValues } from '../lib/schemas/profile.schema';
import { updateProfileAction } from '../lib/actions/account.action';

export function useProfileForm(initialProfile: IUser) {
  const t = useTranslations('account');
  const tValidation = useTranslations('validation');
  const { update: updateSession } = useSession();

  const [originalEmail, setOriginalEmail] = useState(initialProfile.email);
  const [awaitingCode, setAwaitingCode] = useState(false);

  const schema = useMemo(
    () =>
      profileSchema({
        firstName: tValidation('firstName'),
        lastName: tValidation('lastName'),
        invalidEmail: tValidation('invalidEmail'),
        invalidPhone: tValidation('invalidPhone'),
        invalidEgyptPhone: tValidation('invalidEgyptPhone'),
      }),
    [tValidation]
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: initialProfile.firstName,
      lastName: initialProfile.lastName,
      email: initialProfile.email,
      phone: initialProfile.phone || '',
    },
  });

  const mutation = useMutation({
    mutationFn: ({ values, photo }: { values: ProfileFormValues; photo: string | null }) =>
      updateProfileAction({ ...values, gender: initialProfile.gender, photo, originalEmail }),
    onSuccess: async ({ user, emailChangePending }) => {
      await updateSession({ user });
      if (emailChangePending) {
        setAwaitingCode(true);
        toast.success(t('messages.savedVerifyEmail'));
      } else {
        toast.success(t('messages.saved'));
      }
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function saveProfile(values: ProfileFormValues, photo: string | null) {
    mutation.mutate({ values, photo });
  }

  function confirmedEmail(email: string) {
    setAwaitingCode(false);
    setOriginalEmail(email);
  }

  return { form, mutation, saveProfile, awaitingCode, confirmedEmail };
}
