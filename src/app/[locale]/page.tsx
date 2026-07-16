import DropdownMenuNotifications from "@/features/notifications/components/dropdown-menu-notifications";
import { useTranslations } from "next-intl";


export default function Home() {

  const t = useTranslations();

  return <>
     <DropdownMenuNotifications/>
  </>
}
