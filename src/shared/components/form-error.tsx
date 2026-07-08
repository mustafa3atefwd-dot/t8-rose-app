import { CircleX } from 'lucide-react';
import { memo } from 'react';
import { cn } from '@/shared/lib/utils';

interface FormErrorProps {
  message?: string;
  className?: string;
}

function FormError({ message, className = '' }: FormErrorProps) {
  // Don't render anything if there's no error message
  if (!message) return null;

  return (
    <div className={cn('mt-7 w-full md:mt-10', className)}>
      {/* ===== Error Container ===== */}
      <p className="relative border border-red-600 bg-red-50 py-2.5 text-center text-sm text-red-500">
        {message}

        {/* Error Icon */}
        <CircleX className="absolute -top-2.5 right-1/2 h-5 w-5 -translate-x-1/2 bg-white" />
      </p>
    </div>
  );
}

export default memo(FormError);
