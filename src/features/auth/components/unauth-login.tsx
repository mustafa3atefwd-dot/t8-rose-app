'use client'

import { Link } from "@/i18n/navigation"
import { Loader2, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import UserDropdown from "./User-Dropdown"

export default function UnAuthenticatedLogin() {
    const t = useTranslations('homeHeader')
    const {status } = useSession()
    if(status === 'unauthenticated'){
        return <div className="flex items-center h-13 border-r pe-2 ps-2 gap-1.5 whitespace-nowrap">
        <User />
        <Link href={'auth/login'}>{t('login')}</Link>
      </div>

    }

    if(status === 'loading'){
        return (
            <div className="flex items-center w-24 h-13 border-r pr-4 pl-4 gap-1.5 justify-center">
                 <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
             </div>
        )
    }
    return <>
            {/* dropdwon menw */}
            <div className="mt-2">
                <UserDropdown/>
            </div>

    </>
}