import Image from 'next/image'
import boxImg from '../../../../public/boxxx.png'
import separator from '../../../../public/separator-1 1.png'
import ToggleSwitched from '@/features/components/language-toggle'
import { ThemeToggle } from '@/features/components/toggle-icon'

export default function AuthLayout({children}: {children: React.ReactNode}){
    return <>
        <div className='flex justify-between w-full min-h-screen overflow-hidden'>

            {/* left */}
            <div className='flex flex-col w-full gap-10 md:w-1/2 bg-white dark:bg-zinc-800 sm:justify-center sm:items-center'>

                <div className='w-101.5 h-5.5 pr-4 pl-4 gap-2.5 absolute top-0 bottom-6'>
                    <ToggleSwitched/>
                </div>

                    {/* <ThemeToggle/> */}
                    <div className='w-full max-w-md gap-3 flex flex-col items-center'>
                        
                         <Image className='w-70 h-auto mt-10 ml-15.5 mr-15.5 dark:invert' src={separator} width={100} height={100} alt="" />

                        <div className='w-101.5 h-9 border-b pb-4 gap-2.5 mt-10 border-zinc-200 dark:border-zinc-600 flex justify-center items-center'>
                            <p className='w-51 h-14 font-normal text-5xl leading-[100%] tracking-normal align-middle text-maroon-700 whitespace-nowrap font-script text-center dark:text-soft-pink-300'>Welcome back!</p>
                        </div>

                            {children}

                            <Image className='w-70 h-11 mt-8 ml-15.5 mr-15.5 rotate-180' src={separator} width={100} height={100} alt="" />
                    </div>

            </div>


            {/* rigth */}
            <div className='w-185 h-[1,024px] overflow-hidden hidden md:block'>
                <Image className='object-cover w-185 h-138.5' src={boxImg} width={300} height={500} alt="" />
            </div>
        </div>

      
    </>
}

