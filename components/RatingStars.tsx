import { memo } from 'react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

function RatingStars({ rating, reviewCount, size = 'md' }: RatingStarsProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const starSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <svg
            key={i}
            className={`${starSize[size]} text-yellow-400 fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <svg
            key={i}
            className={`${starSize[size]} text-yellow-400`}
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            className={`${starSize[size]} text-gray-300 fill-current`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {renderStars()}
      </div>
      <span className={`${sizeClasses[size]} font-semibold text-gray-700`}>
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className={`${sizeClasses[size]} text-gray-500`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(RatingStars);
