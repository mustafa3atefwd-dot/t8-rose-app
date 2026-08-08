'use server'

import { CouponsQuery } from "../types/coupons";
import getCoupons from "./get.coupons";

export default async function applayCoupon(query: CouponsQuery) {
    return await getCoupons(query)
}