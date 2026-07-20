import Header from "@/shared/components/header-page";
import { useTranslations } from "next-intl";
import Products from "./(auth)/products/page";


export default function Home() {

  // const t = useTranslations();
  
  return <Products/>
  // <div className="flex flex-col items-center justify-center min-h-screen">
  // <h1 className="text-4xl font-bold text-maroon-400">{t("title")}</h1>
  //   </div>;
}
