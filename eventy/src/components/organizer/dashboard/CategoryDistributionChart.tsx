'use client';

import { useTranslations } from 'next-intl';
import { PieChart, Tag } from 'lucide-react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CategoryStats } from '@/lib/types/dashboard-stats.types';

interface CategoryDistributionChartProps {
  categories: CategoryStats[];
}

const COLORS = [
  '#3B82F6', // Blue
  '#EF4444', // Red
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#6B7280', // Gray
  '#14B8A6', // Teal
];

export function CategoryDistributionChart({
  categories,
}: CategoryDistributionChartProps) {
  const t = useTranslations('DashboardPage');

  const chartData = categories.map((category, index) => ({
    name: category.name,
    value: category.eventCount,
    percentage: category.percentage,
    revenue: category.totalRevenue,
    color: COLORS[index % COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-white border border-gray-200 rounded-lg shadow-lg p-3'>
          <p className='font-semibold'>{data.name}</p>
          <p className='text-sm text-gray-600'>
            {t('events')}: {data.value} ({data.percentage}%)
          </p>
          <p className='text-sm text-gray-600'>
            {t('revenue')}: {data.revenue.toLocaleString()} UAH
          </p>
        </div>
      );
    }
    return null;
  };

  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <PieChart className='h-5 w-5' />
            {t('categoryDistribution')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <Tag className='h-12 w-12 text-muted-foreground mx-auto mb-2' />
            <p className='text-muted-foreground'>{t('noCategoriesYet')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <PieChart className='h-5 w-5' />
          {t('categoryDistribution')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-80'>
          <ResponsiveContainer width='100%' height='100%'>
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.percentage}%)`}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Legend */}
        <div className='mt-4 space-y-2'>
          {chartData.map((category, index) => (
            <div
              key={index}
              className='flex items-center justify-between text-sm'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
              </div>
              <div className='flex gap-4 text-muted-foreground'>
                <span>
                  {category.value} {t('events')}
                </span>
                <span>{category.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
