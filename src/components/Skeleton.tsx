import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  count?: number;
}

/**
 * Skeleton component for loading states
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low bg-[length:200%_100%]',
            className
          )}
          style={{
            animation: 'shimmer 2s infinite',
          }}
        />
      ))}
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
};

/**
 * Driver table row skeleton
 */
export const DriverTableSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="hover:bg-surface-container-low transition-colors group border-b border-outline/5">
          {/* Profile Column */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          </td>
          {/* License Column */}
          <td className="px-6 py-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </td>
          {/* Contact Column */}
          <td className="px-6 py-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </td>
          {/* Trip Status Column */}
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          {/* Status Column */}
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          {/* Actions Column */}
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

/**
 * Vehicle table row skeleton
 */
export const VehicleTableSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="hover:bg-surface-container-low transition-colors group border-b border-outline/5">
          {/* Vehicle Column */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          </td>
          {/* Registration Column */}
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-24 rounded" />
          </td>
          {/* Type Column */}
          <td className="px-6 py-4">
            <Skeleton className="h-4 w-28 rounded" />
          </td>
          {/* Location Column */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </td>
          {/* Status Column */}
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          {/* Actions Column */}
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

/**
 * Trip table row skeleton
 */
export const TripTableSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr key={i} className="hover:bg-surface-container-low transition-colors group border-b border-outline/5">
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-5 w-40 rounded" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-28 rounded" />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </td>
          <td className="px-6 py-4">
            <Skeleton className="h-6 w-24 rounded-full" />
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};
