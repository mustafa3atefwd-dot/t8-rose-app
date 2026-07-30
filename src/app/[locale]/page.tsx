import Header from "@/shared/components/header-page";
import { useTranslations } from "next-intl";
import Products from "./(auth)/productss/page";
import PPPP from "./(auth)/p/page";
import ProductsPage from "./(pages)/products/page";
import ProductsPagee from "./(auth)/p/page";


export default function Home() {

  // const t = useTranslations();
  
  return <>
  
      <div>
        <ProductsPagee/>
      </div>
  </>
  // <div className="flex flex-col items-center justify-center min-h-screen">
  // <h1 className="text-4xl font-bold text-maroon-400">{t("title")}</h1>
  //   </div>;
}

// import BestSelling from '@/features/home/components/best-selling';
// import MostPopular from '@/features/home/components/most-popular';

// export const revalidate = 60;

// export default function Home() {
//   return (
//     <>
//       <BestSelling />
//       <MostPopular />
//     </>
//   );
// }
