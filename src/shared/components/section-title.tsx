type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className = '' }: SectionTitleProps) {
  return (
    <h2
      className={`text-ds-text-primary before:bg-ds-bg-secondary-faint after:bg-soft-pink-600 dark:after:bg-soft-pink-500 relative mx-auto mt-2 w-fit text-xl font-bold before:absolute before:inset-s-0 before:bottom-0 before:z-[-1] before:h-4 before:w-3/4 before:content-[''] after:absolute after:inset-s-0 after:bottom-0 after:h-0.5 after:w-1/3 after:content-[''] sm:text-2xl lg:text-3xl xl:text-4xl ltr:before:rounded-r-[20px] rtl:before:rounded-l-[20px] dark:before:bg-zinc-700 ${className} `}
    >
      {children}
    </h2>
  );
}
