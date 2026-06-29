import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Cover from "@/assets/images/Cover.svg";
import flourish from "@/assets/images/flourish.png";
import { LanguageToggle } from "@/features/auth/components/LanguageToggle";
import { cn } from "@/shared/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
}

// CSS mask so the ornament inherits a themeable fill (maroon in light mode,
// soft-pink in dark mode) instead of being a fixed-color image.
const flourishMaskStyle = {
  WebkitMaskImage: `url(${flourish.src})`,
  maskImage: `url(${flourish.src})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

function Flourish({
  flip = false,
  className,
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={flourishMaskStyle}
      className={cn(
        "bg-background-primary-saturated mx-auto block h-12 w-full max-w-[280px]",
        flip && "-scale-y-100",
        className,
      )}
    />
  );
}

/**
 * Branded two-column shell shared by every auth screen.
 *
 * Column order follows the document `dir` (set on <html> from the locale):
 * LTR renders the form on the left and the decorative cover on the right,
 * RTL flips both. The cover column is hidden below `lg` so the form takes the
 * full width on mobile. Background, ornaments and text all rely on semantic
 * tokens, so light/dark mode is handled without per-element overrides.
 */
export async function AuthLayout({ children }: AuthLayoutProps) {
  const t = await getTranslations("auth");

  return (
    <div className="bg-background text-foreground flex min-h-screen w-full">
      {/* Form column — start side (left in LTR, right in RTL) */}
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-1/2">
        <section
          aria-label={t("pageTitle")}
          className="mx-auto w-full max-w-[400px]"
        >
          <div className="flex justify-end">
            <LanguageToggle />
          </div>

          {/* Decorative separator — top of the form panel */}
          <Flourish className="mt-10" />

          <div className="py-8">{children}</div>

          {/* Decorative separator — bottom of the form panel (mirrored) */}
          <Flourish flip />
        </section>
      </div>

      {/* Decorative image column — hidden on mobile, end side */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <Image
          src={Cover}
          alt=""
          fill
          priority
          unoptimized
          sizes="(min-width: 1024px) 50vw, 0px"
          className="w-full object-fill"
        />
      </div>
    </div>
  );
}
