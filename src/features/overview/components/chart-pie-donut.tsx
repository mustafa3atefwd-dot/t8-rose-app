'use client';

import { useEffect, useState } from 'react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { ChartContainer, type ChartConfig } from '@/shared/components/ui/chart';

import { IDashboardOrderStatus } from '@/features/dashboard/lib/types/statistics';
import { useTranslations } from 'next-intl';

export const description = 'Orders status donut chart';

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

const renderCustomLabel = ({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, value = 0 }: CustomLabelProps) => {
  const RADIAN = Math.PI / 180;

  // المسافة بين الدونات والدائرة
  const radius = outerRadius + 8;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <circle cx={x} cy={y} r={16} fill="#FAFAFA" stroke="#e5e7eb" strokeWidth={1} />

      <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight={600} fill="#000">
        {value}%
      </text>
    </g>
  );
};

const chartConfig = {
  completed: {
    label: 'Completed',
    color: 'var(--ds-bg-success)',
  },
  inProgress: {
    label: 'In Progress',
    color: 'var(--ds-bg-info)',
  },
  canceled: {
    label: 'Canceled',
    color: 'var(--ds-bg-danger)',
  },
} satisfies ChartConfig;

export function ChartPieDonut({ ordersStatus }: IChartPieDonutProps) {
  // Translation
  const t = useTranslations('dashboard.overview.ordersStatus');
  const { canceled, completed, inProgress } = ordersStatus;

  const [outerRadius, setOuterRadius] = useState(60);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile
        setOuterRadius(55);
      } else if (width < 1024) {
        // sm → md
        setOuterRadius(65);
      } else if (width < 1280) {
        // lg
        setOuterRadius(75);
      } else {
        // xl+
        setOuterRadius(80);
      }
    };

    updateRadius();

    window.addEventListener('resize', updateRadius);

    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  const chartData = [
    {
      status: 'completed',
      count: completed.count,
      percent: completed.percent,
      fill: 'var(--ds-bg-success)',
    },
    {
      status: 'inProgress',
      count: inProgress.count,
      percent: inProgress.percent,
      fill: 'var(--ds-bg-info)',
    },
    {
      status: 'canceled',
      count: canceled.count,
      percent: canceled.percent,
      fill: 'var(--ds-bg-danger)',
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-start px-4 pb-0">
        <CardTitle className="font-inter text-ds-text-plain text-2xl font-semibold">{t('title')}</CardTitle>
      </CardHeader>

      <div className="flex flex-row items-center px-3 pt-2 pb-6 xl:flex-col xl:gap-y-8">
        <CardContent className="w-[48%] px-4 xl:w-full xl:px-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[220px] overflow-visible sm:max-w-[260px] lg:max-w-[280px] xl:max-w-[300px]"
          >
            <PieChart
              margin={{
                top: 25,
                right: 25,
                bottom: 25,
                left: 25,
              }}
            >
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                innerRadius={outerRadius * 0.44}
                outerRadius={outerRadius}
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

        <CardFooter className="w-[52%] p-0 xl:w-full">
          <ul className="text-ds-text-plain font-inter w-full space-y-3.5 text-xs leading-none">
            {/* Completed */}
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-1.25">
                <span className="bg-ds-bg-success size-2.5 rounded-full" />

                <span className="font-semibold">{t('completed')}</span>
              </div>

              <span className="font-bold">
                {completed.count} ({completed.percent}%)
              </span>
            </li>

            {/* In Progress */}
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-1.25">
                <span className="bg-ds-bg-info size-2.5 rounded-full" />

                <span className="font-semibold">{t('inProgress')}</span>
              </div>

              <span className="font-bold">
                {inProgress.count} ({inProgress.percent}%)
              </span>
            </li>

            {/* Canceled */}
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-1.25">
                <span className="bg-ds-bg-danger size-2.5 rounded-full" />

                <span className="font-semibold">{t('canceled')}</span>
              </div>

              <span className="font-bold">
                {canceled.count} ({canceled.percent}%)
              </span>
            </li>
          </ul>
        </CardFooter>
      </div>
    </Card>
  );
}
