import { DesignSystemPreview } from "@/shared/components/DesignSystemPreview";
import { useTranslations } from "next-intl";


export default function Home() {

  const t = useTranslations();

  return <div className="flex flex-col items-center justify-center min-h-screen">
  <h1 className="text-4xl font-bold text-maroon-400">{t("title")}</h1>
  </div>;
}
