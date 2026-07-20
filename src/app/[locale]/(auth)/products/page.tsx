import Image from "next/image";
import im from '../../../../assets/images/roseLogo.png'
import { HeartPlus, ShoppingCart, Star } from "lucide-react";
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
                    <p>Dreamy White Roses Bouquet</p>

                    <div>
                        <div className="flex">
                            <div>
                                <Star />
                                <div className="flex justify-between">
                                    <p>250.00 EGP 350.00 EGP</p>
                                    <ShoppingCart className=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>
}