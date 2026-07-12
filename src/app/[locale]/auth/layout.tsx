import Image from 'next/image'
import boxImg from '../../../../public/boxxx.png'
import LanguageSwitch from '@/features/components/toggle-language'
import { ThemeToggle } from '@/features/components/toggle-icon'
import { WelcomeArt } from '@/features/components/toggle-image'
import { useTranslations } from 'next-intl'
import DynamicTitle from '@/features/components/dynamic-title'


export default function AuthLayout({children}: {children: React.ReactNode}){
    const t = useTranslations()
    return <>
        <div className='flex justify-between w-full min-h-screen overflow-hidden'>
            {/* left */}
            <div className='flex flex-col justify-center items-center w-full gap-10 md:w-1/2 bg-ds-plain'>
                <ThemeToggle/>
                <div className='w-101.5 h-5.5 pr-4 pl-4 gap-2.5 absolute top-0 bottom-6 left-0'>
                    {/* <LanguageSwitch/> */}
                </div>
                    <div className='w-full max-w-md gap-3 flex flex-col items-center'>
                         <WelcomeArt className='w-70 h-auto mt-10 ml-15.5 mr-15.5'/>
                             <div className='w-101.5 h-18 border-b pb-4 gap-2.5 mt-10 flex justify-center items-center'>
                                    <DynamicTitle/>
                             </div>
                             
                                {children}
                         <WelcomeArt className='w-70 h-11 mt-2 ml-15.5 mr-15.5 rotate-180'/>
                    </div>
            </div>
            {/* rigth */}
            <div className='hidden md:block md:w-1/2 h-screen'>
                <Image className='object-cover w-185' src={boxImg} width={300} height={300} alt="" />
            </div>
        </div>

      
    </>
}

