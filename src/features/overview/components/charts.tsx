import { ChartPieDonut } from "./chart-pie-donut";


export default function Charts() {
  return (
    <div className='flex gap-6 bg-amber-400'>
        {/* order status */}
        <div className="flex-1 bg-ds-bg-plain rounded-2xl">
            <ChartPieDonut/>
        </div>
        {/* revenue */}
        <div className="bg-red-700 flex-3"></div>
    </div>
  )
}
