'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  bgColor,
  trend,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-medium text-muted-foreground'>{title}</p>
            <div className='space-y-1'>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              {subtitle && (
                <p className='text-sm text-muted-foreground'>{subtitle}</p>
              )}
              {trend && (
                <div className='flex items-center space-x-1'>
                  <span
                    className={`text-xs font-medium ${
                      trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {trend.isPositive ? '+' : ''}
                    {trend.value}%
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    vs last month
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
