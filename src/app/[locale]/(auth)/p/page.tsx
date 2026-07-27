// export default function PPPP() {
//     const [productss, setProductss] = useState<Products[]>([])
//     const [meta, setMeat] = useState<PaginationMetaData>()
//      async function getProducts() {
//         const res = await fetch('https://rose-app.elevate-bootcamp.cloud/api/products')
//         const data:IApiResponse<ResponseProducts> = await res.json()
//         setProductss(data.payload.data)
//         console.log(data);

//          return data
//     }
    

//     return <>
//         <div> 
//             <button className="cursor-pointer" onClick={() => getProducts()}>get</button>
//             {productss.map((pp) =>(
//                 <div key={pp.id}>
//                     <h1>{pp.title}</h1>
//                     <h2>{pp.gallery}</h2>
//                     <h2>{pp.price}</h2>
//                     {/* <h2>{pp.}</h2> */}
//                 </div>
//             ))}

//             {/* <h2>{pp.cover}</h2> */}
//             {/* <Image alt="'" src={pp.cover} width={200} height={200}/> */}
//             <PaginationControl page={meta?.page} totalPages={meta?.totalPages}  />
        
//         </div>
//     </>
// }


'use client'

import { usePathname, useRouter } from "@/i18n/navigation"
import { PaginationControl } from "@/shared/components/ui/pagination"
import { IApiResponse } from "@/shared/lib/types/api"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

interface Products{
     id: string,
        title: string,
        description: string,
        rating: number,
        ratings: number,
        stock: number,
        price: number,
        discountType: null,
        discountValue: null,
        cover: string,
        gallery: [],
        categoryId: string,
        subCategoryId: string,
        immutable: boolean,
        deletedAt: null,
        createdAt: string,
        updatedAt: string,
        category: {
          id: string,
          title: string
        }
}

interface PaginationMetaData{
    page: number,
    limit: number,
    total: number,
    totalPages: number
}

interface ResponseProducts{

    data: Products[],
    metadata: PaginationMetaData

}

async function getProducts(page: number , limit: number): Promise<IApiResponse<ResponseProducts>> {
    const res = await fetch(`https://rose-app.elevate-bootcamp.cloud/api/products?page=${page}&limit=${limit}`)
   
    if(!res.ok){
        throw new Error ('we have Error')
    }

    return await res.json()

}
export default function PPPP() {

    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    const currentPage = Number(searchParams.get('page')) || 1
    const currentLimit = Number(searchParams.get('limit')) || 10


    const ChangeUrl = (newPage: number , newLimit: number)=>{
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        params.set('limit', newLimit.toString())

        router.push(`${pathName}?${params.toString()}`)
    }

    const {data, isLoading} = useQuery({

        queryKey: ['products' , currentPage , currentLimit],
        queryFn: () => getProducts( currentPage , currentLimit)
    })

    const products = data?.status ? data.payload?.data ?? []: []
    const metadata = data?.status ? data.payload?.metadata  : undefined 

    return <>
        <div> 
            {products.map((p) => (
                <div key={p.id}>
                    <h1>{p.title}</h1>
                </div>
            ))}
        </div>


        <PaginationControl 
            page={currentPage} 
            totalPages={metadata?.totalPages ?? 1}   
            onPageChange={(newPage) => ChangeUrl(newPage, currentLimit)}
        /> 
    </>
             }
             
{/* <button className="cursor-pointer" onClick={()=> getProducts(1)}>get</button> */}
{/* <h2>{pp.cover}</h2> */}
{/* <Image alt="'" src={pp.cover} width={200} height={200}/> */}

