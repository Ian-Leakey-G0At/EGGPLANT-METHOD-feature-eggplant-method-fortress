import React from 'react';

const Star = ({ filled, half }: { filled: boolean; half: boolean }) => {
  if (half) {
    return (
      <svg className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12.585l-2.939 1.545.561-3.272-2.378-2.318 3.284-.478L10 5.165V15l-1.44-2.415z" />
        <path d="M10 5.165l1.44 2.897 3.284.478-2.378 2.318.561 3.272L10 12.585V5.165z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (filled) {
    return (
      <svg className="w-4 h-4 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
};

const StarRating = () => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star key={i} filled={i < 4} half={i === 4} />
    ))}
  </div>
);

export default StarRating;
