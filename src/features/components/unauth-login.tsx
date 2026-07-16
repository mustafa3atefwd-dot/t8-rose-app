'use client'

import { Link } from "@/i18n/navigation"
import { Loader2, User } from "lucide-react"
import { useSession } from "next-auth/react"

export default function UnAuthenticatedLogin() {
    const {status } = useSession()
    if(status === 'unauthenticated'){
        return <div className="flex items-center w-24 h-13 border-r pr-4 pl-4 gap-1.5"><User /><Link href={'auth/login'}>Login</Link></div>
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
    </>
}