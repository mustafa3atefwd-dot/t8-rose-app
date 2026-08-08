import { CouponsQuery } from "../types/coupons";

export default async function getCoupons(query: CouponsQuery) {
    const params = new URLSearchParams({
        search: query.search,
        isActive: String(query.isActive)
    })
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupons?${params.toString()}` );

    return response.json()

}