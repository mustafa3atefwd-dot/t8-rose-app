import { redirect } from "next/navigation";
import { routing } from "@/i18n/routing";

// `/` has no locale segment, so it can't render the localized `[locale]` shell.
// Send guests to the default locale; middleware/auth take over from there.
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
