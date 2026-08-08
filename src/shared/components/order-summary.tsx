import { MoveRight } from "lucide-react";
import Copuonee from "./copuone";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface readOnly{
    readOnly?: boolean
}

export default function OrderSummary({readOnly = false}: readOnly) {
    const t = useTranslations('cart')
    return <>

            <div className="w-114.5 h-151 gap-6">
                <h3 className="font-semibold text-3xl leading-25 tracking-normal text-black">{t('summary')}</h3>
                {!readOnly && <Copuonee />}
                <div className="w-106.5 h-24 p-2.5 gap-4 ">
                            
                    {!readOnly && 
                                <div className="flex justify-between items-center w-101.5 h-5.5">
                                    <p className="font-medium text-lg leading-25 tracking-normal text-zinc-800">{t('subtotal')}</p>
                                    <p className="font-semibold text-lg leading-25 tracking-normal text-zinc-800">250 EGP</p>
                                </div>
                    }
                            <span className="w-101.5 border border-zinc-300 flex mt-4"></span>
                    <div className="flex justify-between items-center w-101.5 h-5.5 mt-4">
                         <p className="font-bold text-2xl leading-25 tracking-normal text-maroon-600">{t('total')}</p>
                         <p className="font-bold text-2xl leading-25 tracking-normal text-maroon-600">125 EGP</p>
                    </div>
                </div>
             
                            {!readOnly && <Link href="/" className="flex items-center justify-center space-x-2.5 w-full h-17.5 rounded-ds-xl bg-maroon-600 px-4 py-2.5 text-white">
                              <span>{t('checkout')}</span>
                              <MoveRight className="w-6 h-6" />
                              </Link>
                            }
             
             </div>

    </>
}