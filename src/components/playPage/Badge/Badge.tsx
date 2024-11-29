import React from 'react';

interface BadgeProps {
  count: number; // The number displayed in the badge
  value: number; // The larger number displayed next to the badge
}

const Badge: React.FC<BadgeProps> = ({ count, value }) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-full px-1 shadow-md mr-7 ml-4">
      <div className="flex items-center justify-center w-5 h-5 bg-red-500 text-white text-sm font-bold rounded-full">
        {count}
      </div>
      <div className="ml-2 text-lg font-semibold text-black flex justify-between ml-auto mr-auto">{value}</div>
    </div>
  );
};

export default Badge;
