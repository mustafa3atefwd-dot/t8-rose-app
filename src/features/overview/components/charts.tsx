import { IDashboardOrderStatus, IDashboardRevenue } from "@/features/dashboard/lib/types/statistics";
import { ChartPieDonut } from "./chart-pie-donut";
import { ChartAreaAxes } from "./area-chart";

// Component props
interface IChartsOverviewProps {
  ordersStatus: IDashboardOrderStatus;
  revenue: IDashboardRevenue;
}
export default function Charts({ordersStatus, revenue}: IChartsOverviewProps) {  
  return (
    <div className='flex gap-6'>
        {/* order status */}
        <div className="flex-1 bg-ds-bg-plain rounded-2xl">
            <ChartPieDonut ordersStatus={ordersStatus}/>
        </div>
        {/* revenue */}
        <div className="bg-ds-bg-plain flex-3 rounded-2xl">
          <ChartAreaAxes revenue={revenue}/>
        </div>
    </div>
  )
}
