import React from 'react';

/**
 * ProgressBar Component
 * Displays current progress of found clues
 */
const ProgressBar = ({ found, total }) => {
  const percentage = (found / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">💕</span>
            <span>Valentine's Scavenger Hunt</span>
          </h2>
          <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
            {found} / {total} Found
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500 h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={found}
            aria-valuemin="0"
            aria-valuemax={total}
            aria-label={`Progress: ${found} out of ${total} clues found`}
          >
            {/* Animated shimmer effect */}
            {percentage > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
