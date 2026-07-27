'use client'
import Image from "next/image";
import im from '../../../../assets/images/roseLogo.png'
import { HeartPlus, ShoppingCart, Star } from "lucide-react";
import { PaginationControl } from "@/shared/components/ui/pagination";
export default function Products() {
    return <>

        {/* parent */}
        <div className="w-238.5 h-full grid grid-cols-3">
            <div className="w-75.5 h-91 rounded-2xl gap-4">
                <div className="bg-amber-300 flex flex-col-reverse">
                    <Image className="w-75.5 h-68 rounded-xl p-2.5" src={im} alt="d" width={200} height={200}/>

                    <div className="flex justify-between ">
                        <span className="w-7.5 h-7.5 rounded-full pr-1.5 pl-1.5 gap-1.5 bg-white flex justify-center items-center">
                            <HeartPlus className="w-4.5 h-4.5 text-red-900"/>  
                        </span>

                        <span className="w-10.5 h-4 rounded-full pt-0.5 pr-2 pb-0.5 pl-2 gap-2.5 bg-zinc-100 flex justify-center items-center">
                            <p className="font-medium text-xs leading-[100%] tracking-normal text-zinc-700">NEW</p>
                        </span>
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-lg leading-[100%] tracking-normal align-middle text-ds-text-primary mt-4.5">Dreamy White Roses Bouquet</p>

                    <div className="mt-3">
                        <div className="flex">
                            <div className="flex items-center space-x-14">
                                <div className="space-y-4">
                                    <Star className="w-3.5 h-3.5"/>
                                    <p className="font-medium text-base leading-[100%] tracking-normal align-bottom text-ds-text-primary">250.00 EGP 350.00 EGP</p>
                                </div>

                                <div className="w-10.5 h-10.5 rounded-full bg-maroon-600 flex justify-center items-center">
                                        <ShoppingCart className="w-6 h-6 text-white"/> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <div className="flex justify-center items-center mt-20 mb-2">
                    <PaginationControl  className=""  page={2} totalPages={10} siblingCount={2}/>
                </div>
    </>
}