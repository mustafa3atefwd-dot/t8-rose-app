import { IDashboardOrderStatus } from "@/features/dashboard/lib/types/statistics";
import { ChartPieDonut } from "./chart-pie-donut";

// Component props
interface IChartsOverviewProps {
  ordersStatus: IDashboardOrderStatus;
}
export default function Charts({ordersStatus}: IChartsOverviewProps) {  
  return (
    <div className='flex gap-6'>
        {/* order status */}
        <div className="flex-1 bg-ds-bg-plain rounded-2xl">
            <ChartPieDonut ordersStatus={ordersStatus}/>
        </div>
        {/* revenue */}
        <div className="bg-red-700 flex-3"></div>
    </div>
  )
}
