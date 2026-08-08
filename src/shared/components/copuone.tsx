'use client'
import applayCoupon from "@/features/coupons/lib/servies/coupon-actions"
import { useRouter } from "@/i18n/navigation"
import { TicketPercent } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useState } from "react"



export default function Copuonee() {
    const [copuone, setCopuone] = useState('')
    const [message, setMessage] = useState('No coupons applied')
    const [saveCopuone, setSaveCopuone] = useState('')
    const searchParam = useSearchParams()
    const router = useRouter()
    const t = useTranslations('cart')

    async function handleCopune() {
        const params = new URLSearchParams(searchParam.toString())
        params.set('search', copuone)
        params.set('isActive', 'true')
        router.push(`?${params.toString()}`)
        try {
            const result = await applayCoupon({
                search: copuone,
                isActive: true
            })


            if (result.payload.data != [].length > 0) {
                setMessage("Coupon is valid");
                setSaveCopuone(copuone);
                console.log(copuone);

            } else {
                setMessage('coupon not valid')


            }
        } catch (error) {
            console.error(error);
        }


    }

    function handleRemoveCoupon() {
        setSaveCopuone("");
        setMessage("No coupons applied");
        setCopuone("");
    }


    return <>

        <div className="w-114.5 h-90 p-4 gap-2.5">

            <div className="w-106.5 h-12 gap-2.5 space-x-2.5 flex">
                <input
                    type="text"
                    value={copuone}
                    onChange={(e) => setCopuone(e.target.value)}
                    placeholder={t('couponPlaceholder')}
                    className="w-64 h-12 border border-zinc-300 rounded-ds-xl p-4 gap-2"
                />

                <div className="flex items-center relative ">
                    <span className="absolute mt-1 mb-0 right-0 left-4 pointer-events-none"><TicketPercent className="w-6 h-6 text-white" /></span>
                    <button onClick={() => handleCopune()} className="bg-maroon-600 w-39.5 h-12 rounded-ds-xl pt-2.5 pb-2.5 pl-4 gap-2.5 text-white font-semibold text-sm tracking-normal cursor-pointer">{t('applyCoupon')}</button>
                </div>
            </div>

            <div className="w-106.5 h-65 mt-2.5 border border-zinc-300 rounded-ds-base p-2.5 gap-2.5 flex justify-center items-center">
                {saveCopuone ? (
                    <div className="w-full flex justify-between items-center">
                        <p>{saveCopuone}</p>

                        <button
                            className="text-red-500 cursor-pointer"
                            onClick={handleRemoveCoupon}
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <p className="text-base leading-25 tracking-normal text-zinc-400">
                        {message}
                    </p>)}
            </div>
        </div>


    </>
}