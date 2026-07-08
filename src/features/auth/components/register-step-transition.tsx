'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';

interface RegisterStepTransitionProps {
  step: string;
  direction: 'forward' | 'backward';
  children: ReactNode;
}

function RegisterStepTransition({ step, direction, children }: RegisterStepTransitionProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const xOffset = direction === 'forward' ? (isRTL ? -40 : 40) : isRTL ? 40 : -40;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{
          opacity: 0,
          x: xOffset,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{
          opacity: 0,
          x: -xOffset,
        }}
        transition={{
          duration: 0.25,
          ease: 'easeOut',
        }}
        className="w-full max-w-101.5"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default RegisterStepTransition;
