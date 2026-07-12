'use client'

import { usePathname } from "@/i18n/navigation"

 export const dynamicTitle: Record<string, string> ={
    '/auth/login': 'Welcome back!',
    '/auth/register': 'Become part of our family!'
}

export default function DynamicTitle(){
    const pathName = usePathname()
    const title = dynamicTitle[pathName] ?? ''

    return(
        <p className='h-14 font-normal text-5xl leading-[100%] tracking-normal align-middle text-ds-text-primary whitespace-nowrap font-script w-fit'>{title}</p> 

    )
}

