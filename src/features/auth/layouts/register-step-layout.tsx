import { ReactNode } from 'react';

interface IRegisterStepLayoutProps {
  headingId: string;
  children: ReactNode;
}

function RegisterStepLayout({ headingId, children }: IRegisterStepLayoutProps) {
  // Layout
  return (
    <section aria-labelledby={headingId} className="w-full max-w-101.5">
      {children}
    </section>
  );
}

// Compound components
function Header({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Title({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-2xl font-bold text-zinc-800 lg:text-3xl dark:text-zinc-50">
      {children}
    </h2>
  );
}

function Subtitle({ children }: { children: ReactNode }) {
  return <h3 className="text-ds-text-primary mt-4 text-xl font-semibold">{children}</h3>;
}

function Description({ children }: { children: ReactNode }) {
  return <p className="text-ds-text-plain mt-1 mb-4">{children}</p>;
}

function Actions({ children }: { children: ReactNode }) {
  return <div className="flex items-center justify-between gap-4">{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return <div className="mx-auto mt-5 w-fit text-sm font-medium text-zinc-800 dark:text-zinc-50">{children}</div>;
}

// Attach compound components
RegisterStepLayout.Header = Header;
RegisterStepLayout.Title = Title;
RegisterStepLayout.Subtitle = Subtitle;
RegisterStepLayout.Description = Description;
RegisterStepLayout.Actions = Actions;
RegisterStepLayout.Footer = Footer;

export default RegisterStepLayout;
