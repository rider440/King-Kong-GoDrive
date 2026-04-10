import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const SkeletonLine: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={cn(
      'animate-pulse bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low bg-[length:200%_100%]',
      className
    )}
    style={{ animation: 'shimmer 2s infinite' }}
  />
);

/**
 * Profile header skeleton
 */
export const SkeletonProfileHeader: React.FC = () => (
  <>
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
    <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 flex flex-col items-center text-center border border-outline/5 space-y-6">
      {/* Profile Image */}
      <div className="w-40 h-40 rounded-full bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low animate-pulse" />
      
      {/* Name */}
      <SkeletonLine className="h-8 w-48 rounded" />
      
      {/* Employee ID */}
      <SkeletonLine className="h-4 w-32 rounded" />
      
      {/* Status badges */}
      <div className="flex gap-3 justify-center">
        <SkeletonLine className="h-8 w-24 rounded-full" />
        <SkeletonLine className="h-8 w-24 rounded-full" />
      </div>
    </section>
  </>
);

/**
 * Details card skeleton
 */
export const SkeletonDetailsCard: React.FC = () => (
  <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6">
    {/* Header */}
    <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
      <SkeletonLine className="w-8 h-8 rounded-lg" />
      <SkeletonLine className="h-4 w-40 rounded" />
    </div>
    
    {/* Content rows */}
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <SkeletonLine className="h-3 w-20 rounded" />
          <SkeletonLine className="h-4 w-full rounded" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * Full driver profile skeleton
 */
export const SkeletonDriverProfile: React.FC = () => (
  <div className="space-y-6 max-w-4xl mx-auto">
    {/* Back button */}
    <SkeletonLine className="h-10 w-32 rounded-lg" />
    
    {/* Profile header */}
    <SkeletonProfileHeader />
    
    {/* Tab navigation */}
    <div className="flex gap-6 border-b border-outline/5 pb-4">
      {[1, 2, 3].map((i) => (
        <SkeletonLine key={i} className="h-6 w-20 rounded" />
      ))}
    </div>
    
    {/* Content grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonDetailsCard />
      <SkeletonDetailsCard />
    </div>
    
    {/* Full width card */}
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 border border-outline/5 space-y-6">
      <div className="flex items-center gap-3 border-b border-outline/5 pb-4">
        <SkeletonLine className="w-8 h-8 rounded-lg" />
        <SkeletonLine className="h-4 w-40 rounded" />
      </div>
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <SkeletonLine className="h-3 w-full rounded" />
            <SkeletonLine className="h-4 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
