"use client";

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"

import {
  ChartContainer,
  type ChartConfig,
} from "@/shared/components/ui/chart"

export const description = "A donut chart"

const chartData = [
  {
    browser: "chrome",
    visitors: 275,
    fill: "rgb(0,255,200)",
  },
  {
    browser: "safari",
    visitors: 200,
    fill: "rgb(0,255,0)",
  },
  {
    browser: "firefox",
    visitors: 187,
    fill: "rgb(255,0,0)",
  },
  {
    browser: "edge",
    visitors: 173,
    fill: "rgb(0,0,255)",
  },
  {
    browser: "other",
    visitors: 90,
    fill: "rgb(100,70,10)",
  },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

type CustomLabelProps = {
  cx?: number
  cy?: number
  midAngle?: number
  outerRadius?: number
  value?: number
}

const renderCustomLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  value = 0,
}: CustomLabelProps) => {
  const RADIAN = Math.PI / 180

  // المسافة بين الدونات والدائرة
  const radius = outerRadius + 5

  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      {/* الدائرة */}
      <circle
        cx={x}
        cy={y}
        r={16}
        fill="#FAFAFA"
        stroke="#e5e7eb"
        strokeWidth={1}
      />

      {/* الرقم داخل الدائرة */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={11}
        fontWeight={600}
        fill="#000"
      >
        {value}%
      </text>
    </g>
  )
}

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle className="text-2xl font-semibold text-ds-text-plain font-inter">Orders Status</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={40}
              outerRadius={90}
              label={renderCustomLabel}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col">

        <ul className="leading-none text-ds-text-plain font-inter text-xs space-y-3.5">
          <li className="flex justify-between items-center">
            <div className="flex gap-1.25 items-center">
              <span className="size-2.5 rounded-full bg-ds-bg-success"></span>
              <span className="font-semibold">completed</span>
            </div>
            <span className="font-bold">
              216 (33%)
            </span>
          </li>
                    <li className="flex justify-between items-center">
            <div className="flex gap-1.25 items-center">
              <span className="size-2.5 rounded-full bg-ds-bg-info"></span>
              <span className="font-semibold">In progress</span>
            </div>
            <span className="font-bold">
              216 (33%)
            </span>
          </li>
                    <li className="flex justify-between items-center">
            <div className="flex gap-1.25 items-center">
              <span className="size-2.5 rounded-full bg-ds-bg-danger"></span>
              <span className="font-semibold">Canceled</span>
            </div>
            <span className="font-bold">
              216 (33%)
            </span>
          </li>
        </ul>
      </CardFooter>
    </Card>
  )
}
