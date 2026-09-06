'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

import { ChartContainer, ChartTooltip, type ChartConfig } from '@/shared/components/ui/chart';

import { IDashboardRevenue } from '@/features/dashboard/lib/types/statistics';

export const description = 'Revenue area chart';

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: '#A6252A',
  },
} satisfies ChartConfig;

interface IChartAreaAxesProps {
  revenue: IDashboardRevenue;
}

const weekData = [
  {
    period: '2026-09-01',
    label: 'Sat',
    revenue: 1200,
  },
  {
    period: '2026-09-02',
    label: 'Sun',
    revenue: 2800,
  },
  {
    period: '2026-09-03',
    label: 'Mon',
    revenue: 1800,
  },
  {
    period: '2026-09-04',
    label: 'Tue',
    revenue: 4200,
  },
  {
    period: '2026-09-05',
    label: 'Wed',
    revenue: 3500,
  },
  {
    period: '2026-09-06',
    label: 'Thu',
    revenue: 5100,
  },
  {
    period: '2026-09-07',
    label: 'Fri',
    revenue: 3900,
  },
];

export function ChartAreaAxes({ revenue }: IChartAreaAxesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');

  const chartData = view === 'monthly' ? revenue.points : weekData;

  const maxRevenue = Math.max(...chartData.map((point) => point.revenue), 0);

  const yAxisMax = maxRevenue > 0 ? Math.ceil((maxRevenue * 1.1) / 1000) * 1000 : 1000;

  const yAxisTicks = Array.from({ length: yAxisMax / 1000 + 1 }, (_, index) => index * 1000);

  const activeSegmentIndex = activeIndex === null ? null : activeIndex === 0 ? 0 : activeIndex - 1;

  const segmentStart =
    activeSegmentIndex === null || chartData.length <= 1 ? 0 : (activeSegmentIndex / (chartData.length - 1)) * 100;

  const segmentEnd =
    activeSegmentIndex === null || chartData.length <= 1
      ? 0
      : ((activeSegmentIndex + 1) / (chartData.length - 1)) * 100;

  const handleViewChange = (newView: 'monthly' | 'weekly') => {
    setView(newView);
    setActiveIndex(null);
  };

  return (
    <Card>
      <CardHeader className="font-inter flex items-center justify-between">
        <CardTitle className="text-ds-text-plain text-2xl font-semibold">Revenue</CardTitle>

        <CardDescription className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => handleViewChange('monthly')}
            className={`cursor-pointer ${
              view === 'monthly' ? 'text-maroon-600 font-semibold' : 'text-ds-text-muted font-normal'
            }`}
          >
            Monthly
          </button>

          <button
            type="button"
            onClick={() => handleViewChange('weekly')}
            className={`cursor-pointer ${
              view === 'weekly' ? 'text-maroon-600 font-semibold' : 'text-ds-text-muted font-normal'
            }`}
          >
            Last Week
          </button>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 30,
              top: 20,
            }}
            onMouseMove={(state) => {
              const index = Number(state?.activeTooltipIndex);

              if (!Number.isNaN(index)) {
                setActiveIndex(index);
              }
            }}
            onMouseLeave={() => {
              setActiveIndex(null);
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(166, 37, 42, 0.5)" />

                <stop offset="100%" stopColor="rgba(248, 177, 239, 0)" />
              </linearGradient>

              {activeSegmentIndex !== null && (
                <linearGradient id="activeRevenueGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />

                  <stop offset={`${segmentStart}%`} stopColor="rgba(255, 255, 255, 0)" />

                  <stop offset={`${segmentStart}%`} stopColor="rgba(255, 255, 255, 1)" />

                  <stop offset={`${segmentEnd}%`} stopColor="rgba(255, 255, 255, 1)" />

                  <stop offset={`${segmentEnd}%`} stopColor="rgba(255, 255, 255, 0)" />

                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </linearGradient>
              )}
            </defs>

            <CartesianGrid horizontal={false} />

            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />

            <YAxis tickLine={false} axisLine={false} tickMargin={8} domain={[0, yAxisMax]} ticks={yAxisTicks} />

            <ChartTooltip cursor={false} content={() => null} />

            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#revenueGradient)"
              stroke="none"
              dot={false}
              isAnimationActive={false}
            />

            {activeSegmentIndex !== null && (
              <Area
                dataKey="revenue"
                type="natural"
                fill="url(#activeRevenueGradient)"
                stroke="none"
                dot={false}
                isAnimationActive={false}
              />
            )}

            <Area
              dataKey="revenue"
              type="natural"
              fill="none"
              stroke="#A6252A"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              activeDot={(props) => {
                const { cx, cy, payload } = props;

                const revenueValue = payload?.revenue ?? 0;

                return (
                  <g>
                    <circle cx={cx} cy={cy} r={6} fill="#A6252A" stroke="white" strokeWidth={2} />

                    <text
                      x={cx}
                      y={cy! - 18}
                      textAnchor="middle"
                      fill="#A6252A"
                      fontSize={12}
                      fontWeight={700}
                      fontFamily="Inter"
                    >
                      {revenueValue} EGP
                    </text>
                  </g>
                );
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
