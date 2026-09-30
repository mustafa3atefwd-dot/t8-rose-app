'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceDot, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from '@/shared/components/ui/chart';

import { IDashboardRevenue, IRevenuePoint } from '@/features/dashboard/lib/types/statistics';
import { useTranslations } from 'next-intl';

export const description = 'Revenue area chart';

// ChartContainer exposes this as --color-revenue, so it follows the active theme
const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--ds-bg-primary-saturated)',
  },
} satisfies ChartConfig;

const REVENUE_COLOR = 'var(--color-revenue)';
// Card surface color — used for the hover "cut-out" highlight and dot outlines
const SURFACE_COLOR = 'var(--ds-bg-plain)';

interface IChartAreaAxesProps {
  revenue: IDashboardRevenue;
  weeklyRevenue: IDashboardRevenue | null;
}

const monthKeys = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
] as const;

// Indexed by Date#getUTCDay()
const dayKeys = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

type TDayKey = (typeof dayKeys)[number];

function getDayKey(point: IRevenuePoint): TDayKey | null {
  const date = new Date(point.period);

  if (!Number.isNaN(date.getTime())) return dayKeys[date.getUTCDay()];

  const label = point.label?.toLowerCase();

  return dayKeys.find((day) => day === label) ?? null;
}

export function ChartAreaAxes({ revenue, weeklyRevenue }: IChartAreaAxesProps) {
  const t = useTranslations('dashboard.overview.revenue');

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [view, setView] = useState<'monthly' | 'weekly'>('monthly');

  const chartData =
    view === 'monthly'
      ? revenue.points.map((point) => {
          const monthIndex = Number(point.period.slice(5, 7));
          const monthKey = monthKeys[monthIndex - 1];

          return {
            ...point,
            label: monthKey ? t(`months.${monthKey}`) : '',
          };
        })
      : (weeklyRevenue?.points ?? []).map((point) => {
          const dayKey = getDayKey(point);

          return {
            ...point,
            label: dayKey ? t(`days.${dayKey}`) : point.label,
          };
        });

  const maxRevenue = Math.max(
    ...chartData.map((point) => point.revenue),
    0,
  );

  // Peak marker — only meaningful when there is any revenue at all
  const peakIndex = maxRevenue > 0 ? chartData.findIndex((point) => point.revenue === maxRevenue) : -1;
  const peakPoint = peakIndex >= 0 ? chartData[peakIndex] : null;

  const yAxisMax =
    maxRevenue > 0
      ? Math.ceil((maxRevenue * 1.1) / 1000) * 1000
      : 1000;

  const yAxisTicks = Array.from(
    { length: yAxisMax / 1000 + 1 },
    (_, index) => index * 1000,
  );

  const activeSegmentIndex =
    activeIndex === null
      ? null
      : activeIndex === 0
        ? 0
        : activeIndex - 1;

  const segmentStart =
    activeSegmentIndex === null || chartData.length <= 1
      ? 0
      : (activeSegmentIndex / (chartData.length - 1)) * 100;

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
        <CardTitle className="text-ds-text-plain text-2xl font-semibold">
          {t('title')}
        </CardTitle>

        <CardDescription className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => handleViewChange('monthly')}
            aria-pressed={view === 'monthly'}
            className={`cursor-pointer ${
              view === 'monthly'
                ? 'text-ds-text-primary font-semibold'
                : 'text-ds-text-muted font-normal'
            }`}
          >
            {t('monthly')}
          </button>

          {/* Hidden when the weekly series failed to load */}
          {weeklyRevenue && (
            <button
              type="button"
              onClick={() => handleViewChange('weekly')}
              aria-pressed={view === 'weekly'}
              className={`cursor-pointer ${
                view === 'weekly'
                  ? 'text-ds-text-primary font-semibold'
                  : 'text-ds-text-muted font-normal'
              }`}
            >
              {t('lastWeek')}
            </button>
          )}
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
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={REVENUE_COLOR} stopOpacity={0.5} />
                <stop offset="100%" stopColor={REVENUE_COLOR} stopOpacity={0} />
              </linearGradient>

              {activeSegmentIndex !== null && (
                <linearGradient
                  id="activeRevenueGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor={SURFACE_COLOR} stopOpacity={0} />
                  <stop offset={`${segmentStart}%`} stopColor={SURFACE_COLOR} stopOpacity={0} />
                  <stop offset={`${segmentStart}%`} stopColor={SURFACE_COLOR} stopOpacity={1} />
                  <stop offset={`${segmentEnd}%`} stopColor={SURFACE_COLOR} stopOpacity={1} />
                  <stop offset={`${segmentEnd}%`} stopColor={SURFACE_COLOR} stopOpacity={0} />
                  <stop offset="100%" stopColor={SURFACE_COLOR} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>

            <CartesianGrid horizontal={false} />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, yAxisMax]}
              ticks={yAxisTicks}
            />

            <ChartTooltip
              cursor={false}
              content={() => null}
            />

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
              stroke={REVENUE_COLOR}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              activeDot={(props) => {
                const { cx, cy, payload } = props;

                const revenueValue = payload?.revenue ?? 0;

                return (
                  <g>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={REVENUE_COLOR}
                      stroke={SURFACE_COLOR}
                      strokeWidth={2}
                    />

                    <text
                      x={cx}
                      y={cy! - 18}
                      textAnchor="middle"
                      fill={REVENUE_COLOR}
                      fontSize={12}
                      fontWeight={700}
                      fontFamily="Inter"
                    >
                      {t('value', { value: revenueValue })}
                    </text>
                  </g>
                );
              }}
            />

            {/* Peak marker — its label steps aside while the hover label is shown on the same point */}
            {peakPoint && (
              <ReferenceDot
                x={peakPoint.label}
                y={peakPoint.revenue}
                r={5}
                fill={REVENUE_COLOR}
                stroke={SURFACE_COLOR}
                strokeWidth={2}
                ifOverflow="extendDomain"
                label={
                  activeIndex === peakIndex
                    ? undefined
                    : {
                        value: t('peak', { value: peakPoint.revenue }),
                        position: 'top',
                        offset: 12,
                        fill: REVENUE_COLOR,
                        fontSize: 12,
                        fontWeight: 700,
                      }
                }
              />
            )}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
