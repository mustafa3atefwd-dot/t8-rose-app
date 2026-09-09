import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface ISubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  loadingText: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function SubmitButton({
  isLoading,
  loadingText,
  children,
  disabled,
  className,
  onClick,
  type = 'submit',
  ...props
}: ISubmitButtonProps) {
  return (
    <Button
      type={type}
      variant="secondary"
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'bg-maroon-600 hover:bg-maroon-600/90 dark:bg-soft-pink-300 dark:hover:bg-soft-pink-400 my-9 w-full gap-2.5 text-white dark:text-zinc-800',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          {loadingText}
          <Loader2 className="size-4.5 animate-spin rtl:rotate-180" />
        </>
      ) : (
        children
      )}
    </Button>
  );
}
