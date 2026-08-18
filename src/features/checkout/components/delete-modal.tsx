import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';
import { Trash, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { IDeleteModalProps } from '@/features/checkout/lib/types';

const DeleteModal = ({ deleteDialogOpen, setDeleteDialogOpen, isDeleting, onDelete, address }: IDeleteModalProps) => {
  const t = useTranslations('address');
  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent className={'w-110'}>
        {/* close modal btn */}
        <div className="flex w-full items-end justify-end">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-ds-text-muted focus:ring-ds-ring data-[state=open]:bg-ds-bg-primary data-[state=open]:text-ds-text-inverse rounded-full focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
            onClick={() => setDeleteDialogOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* trash icon */}
        <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 before:absolute before:-z-1 before:h-22 before:w-22 before:rounded-full before:bg-zinc-100 before:content-['']">
          <Trash className="text-ds-text-plain size-7" />
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className={'text-center text-lg font-semibold'}>{t('confirmDelete')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-1/2"
            onClick={() => setDeleteDialogOpen(false)}
          >
            {t('cancel')}
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-1/2"
            size="lg"
            disabled={isDeleting}
            onClick={onDelete}
          >
            {t('delete')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
