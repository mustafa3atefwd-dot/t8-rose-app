import Image from "next/image";
import roseLogo from '../../assets/images/roseLogo.png'
import { Bell, ClipboardList, Gift, Headset, Heart, House, Info, PartyPopper, Search, ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LanguageToggle } from "@/features/auth/components/LanguageToggle";
import { Input } from "./ui/inputs";
import { useTranslations } from "next-intl";
import UnAuthenticatedLogin from "@/features/auth/components/unauth-login";
import { ThemeToggle } from "./ThemeToggle";
import NotificationsMenu from "@/features/notifications/components/notifications-menu";
import UserAddress from "./user-address";


export default function Header() {
    const t = useTranslations('homeHeader')

    return <>
        {/* parent */}
        <div className="">
            {/* up */}
            <div className="h-22 pt-4.5 pr-9 pb-4.5 pl-9 gap-4 flex items-center">
                {/* image */}

                        <Image className="w-20.5 h-20" src={roseLogo} alt="" width={200} height={200}/>

                {/* user address */}
                <UserAddress/>
                {/* search */}
                <div dir="ltr" className="relative flex items-center max-sm:w-20 md:w-3/5">
                        <Input type="text" className="peer w-full h-13 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-ds-xl border p-4 gap-2 border-zinc-300 placeholder:text-zinc-400 placeholder:pl-6 rtl:placeholder:pl-113" placeholder={t('inputPlaceholder')} />
                        <Search className="rtl:ml-170 w-4.5 h-4.5 absolute ml-4 peer-focus:hidden"/>
                </div>

                {/* login */}
                <div className="flex">
                    <div>
                        <UnAuthenticatedLogin/>
                    </div>

                    {/* icons */}
                    <div className="w-31 h-13 border-r pr-4 pl-4 gap-2.5 flex items-center rtl:mr-7">
                        <Link href={'/favorite'}><Heart/></Link>
                        <Link href={'/cart'}><ShoppingCart/></Link>
                        <div className="mt-2"><NotificationsMenu/></div>
                    </div>

                    {/* language */}
                    <div className="w-15 h-13 border-l pl-4 gap-2.5 flex items-center rtl:ml-2 border-l-ds-bg-muted mr-2 rtl:mr-1">
                        <LanguageToggle/>
                    </div>

                    {/* theme toggle */}
                    <ThemeToggle/>
                </div>
            </div>


            {/* dwon */}
            <div className="h-11 flex justify-center items-center space-x-4 bg-ds-bg-primary text-white dark:text-maroon-800">
                <div className="flex items-center p-3 gap-2">
                    <House className="w-5 h-5"/>
                    <Link href={'/home'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">{t('home')}</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <Gift className="w-5 h-5"/>
                    <Link href={'/products'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">{t('products')}</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <ClipboardList className="w-5 h-5"/>
                    <Link href={'/categories'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">{t('categories')}</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <PartyPopper className="w-5 h-5"/>
                    <Link href={'/occasions'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">{t('occasions')}</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <Headset className="w-5 h-5"/>
                    <Link href={'/contact'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">{t('contact')}</Link>
                </div>
                <div className="flex items-center p-3 gap-2">
                    <Info className="w-5 h-5"/>
                    <Link href={'/about'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">{t('about')}</Link>
                </div>
            </div>
        </div>
    </>
}