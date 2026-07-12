'use client'
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";import { useState } from "react";
;


export default function LanguageSwitch(){
    const [switched, setSwitched] = useState()
    const pathName = usePathname()
    const router = useRouter()
    const locale = useLocale()

    function handelToggelLanguage(){
        const s = locale === 'ar' ? 'en' : 'ar'
        
        router.push(pathName , {locale: s})
        setSwitched()
    }

    return (
        <div>
            <button className="text-xl border rounded-2xl p-2 border-amber-200 cursor-pointer" onClick={handelToggelLanguage}>
                {locale === 'ar' ? 'english' : 'العربية'}
            </button>
        </div>
    )
}