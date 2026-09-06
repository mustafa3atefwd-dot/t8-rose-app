"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  ChartContainer,
  type ChartConfig,
} from "@/shared/components/ui/chart";

import { IDashboardOrderStatus } from "@/features/dashboard/lib/types/statistics";

export const description = "Orders status donut chart";

interface IChartPieDonutProps {
  ordersStatus: IDashboardOrderStatus;
}

type CustomLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  value?: number;
};

const renderCustomLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  value = 0,
}: CustomLabelProps) => {
  const RADIAN = Math.PI / 180;

  // المسافة بين الدونات والدائرة
  const radius = outerRadius + 5;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

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

      {/* النسبة داخل الدائرة */}
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
  );
};

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--ds-bg-success)",
  },
  inProgress: {
    label: "In Progress",
    color: "var(--ds-bg-info)",
  },
  canceled: {
    label: "Canceled",
    color: "var(--ds-bg-danger)",
  },
} satisfies ChartConfig;

export function ChartPieDonut({
  ordersStatus,
}: IChartPieDonutProps) {
  const {
    canceled,
    completed,
    inProgress,
  } = ordersStatus;

  const chartData = [
  {
    status: "completed",
    count: completed.count,
    percent: completed.percent,
    fill: "var(--ds-bg-success)",
  },
  {
    status: "inProgress",
    count: inProgress.count,
    percent: inProgress.percent,
    fill: "var(--ds-bg-info)",
  },
  {
    status: "canceled",
    count: canceled.count,
    percent: canceled.percent,
    fill: "var(--ds-bg-danger)",
  },
];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 text-center">
        <CardTitle className="text-2xl font-semibold text-ds-text-plain font-inter">
          Orders Status
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={40}
              outerRadius={90}
              label={({ cx, cy, midAngle, outerRadius, index }) =>
                renderCustomLabel({
                  cx,
                  cy,
                  midAngle,
                  outerRadius,
                  value: chartData[index]?.percent ?? 0,
                })
              }
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col">
        <ul className="leading-none text-ds-text-plain font-inter text-xs space-y-3.5 w-full">
          {/* Completed */}
          <li className="flex justify-between items-center">
            <div className="flex gap-1.25 items-center">
              <span className="size-2.5 rounded-full bg-ds-bg-success" />
              <span className="font-semibold">
                Completed
              </span>
            </div>

            <span className="font-bold">
              {completed.count} ({completed.percent}%)
            </span>
          </li>

          {/* In Progress */}
          <li className="flex justify-between items-center">
            <div className="flex gap-1.25 items-center">
              <span className="size-2.5 rounded-full bg-ds-bg-info" />
              <span className="font-semibold">
                In Progress
              </span>
            </div>

            <span className="font-bold">
              {inProgress.count} ({inProgress.percent}%)
            </span>
          </li>

          {/* Canceled */}
          <li className="flex justify-between items-center">
            <div className="flex gap-1.25 items-center">
              <span className="size-2.5 rounded-full bg-ds-bg-danger" />
              <span className="font-semibold">
                Canceled
              </span>
            </div>

            <span className="font-bold">
              {canceled.count} ({canceled.percent}%)
            </span>
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
}