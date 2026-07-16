import Image from "next/image";
import Logo from '../../../../public/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png'
import { Input } from "@/shared/components/ui/input";
import { Bell, ClipboardList, Gift, Headset, Heart, House, Info, PartyPopper, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitch from "@/features/components/toggle-language";

export default function Header() {
    return <>
        {/* parent */}
        <div className="">
            {/* up */}
            <div className=" h-22 pt-4.5 pr-9 pb-4.5 pl-9 gap-4 flex  items-center">
                {/* image */}

                        <Image className="w-20.5 h-20 " src={Logo} alt="" width={200} height={200}/>

                {/* search */}
                <div className="w-242 h-13 rounded-ds-xl border p-4 gap-2 border-zinc-300 flex items-center max-sm:w-20 md:w-3/5">
                        <Search className=""/>
                        <Input className="w-[969px] ml-2 border-none" placeholder="What awesome gift are you looking for?" />
                </div>

                {/* login */}
                <div className="flex">
                    <div className="flex items-center w-24 h-13 border-r pr-4 pl-4 gap-1.5">
                        <User />
                        <Link href={'auth/login'}>Login</Link>
                    </div>

                    {/* icons */}
                    <div className="w-31 h-13 border-r pr-4 pl-4 gap-2.5 flex">
                        <button><Heart/></button>
                        <button><ShoppingCart/></button>
                        <button><Bell/></button>
                    </div>

                    {/* language */}
                    <div className="w-15 h-13 border-l pl-4 gap-2.5 flex items-center ">
                        <LanguageSwitch/>
                    </div>
                </div>
            </div>


            {/* dwon */}
            <div className="h-11 flex justify-center items-center space-x-4 bg-ds-primary text-white dark:text-maroon-800">
                <div className="flex items-center p-3 gap-2">
                    <House className="w-5 h-5"/>
                    <Link href={'/home'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">Home</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <Gift className="w-5 h-5"/>
                    <Link href={'/products'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">Products</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <ClipboardList className="w-5 h-5"/>
                    <Link href={'/categories'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">Categories</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <PartyPopper className="w-5 h-5"/>
                    <Link href={'/occasions'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">Occasions</Link>
                </div>

                <div className="flex items-center p-3 gap-2">
                    <Headset className="w-5 h-5"/>
                    <Link href={'/contact'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">Contact</Link>
                </div>
                <div className="flex items-center p-3 gap-2">
                    <Info className="w-5 h-5"/>
                    <Link href={'/about'} className="font-medium text-base leading-[100%] tracking-normal align-middle cursor-pointer">About</Link>
                </div>
            </div>
        </div>
    </>
}