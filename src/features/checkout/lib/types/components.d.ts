import { UseFormReturn } from 'react-hook-form';
import { AddressSchema } from '../schemas';
import { Address } from './api';

export type ModalView = { view: 'list' } | { view: 'form'; mode: 'create' | 'edit'; address?: Address };

export interface IAddressBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAddress: (address: Address) => void;
}

export interface IAddressCardProps {
  address: Address;
  onSelect: () => void;
  selected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
}

export interface IAddressListProps {
  onSelect: (address: Address) => void;
  onAdd: () => void;
  onEdit: (address: Address) => void;
}

export interface IAddressStep1FieldsProps {
  form: UseFormReturn<AddressSchema>;
  onNext: () => void;
  onCancel: () => void;
}

export interface IAddressStep2MapProps {
  form: UseFormReturn<AddressSchema>;
  onBack: () => void;
  onPositionChange: (lat: number, lng: number) => void;
  isPending: boolean;
  pinError: boolean;
  submitLabel: string;
}

export interface IAddressWizardFormProps {
  mode: 'create' | 'edit';
  address?: Address;
  onSuccess: () => void;
  onCancel: () => void;
}

export interface ICheckoutStepperProps<T extends string> {
  steps: T[];
  currentStep: T;
  className?: string;
}

export interface IDeleteModalProps {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  isDeleting: boolean;
  onDelete: () => void;
  address: { title: string };
}

export interface IMapPickerProps {
  latitude: string;
  longitude: string;
  onPositionChange: (lat: number, lng: number) => void;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}
