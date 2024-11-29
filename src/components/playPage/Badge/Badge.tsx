import React from "react";

interface BadgeProps {
    count: number; // The number displayed in the badge
    value: number; // The larger number displayed next to the badge
}

const Badge: React.FC<BadgeProps> = ({ count, value }) => {
    return (
        <div className="flex items-center bg-gray-200 rounded-full px-1 shadow-[1px_2px_6px_3px_rgba(0,0,0,0.3)]">
            <div className="flex items-center justify-center w-6 h-6 bg-red-500 text-white text-sm font-bold rounded-full">{count}</div>
            <div className="ml-2 text-lg font-semibold text-black flex justify-between ml-auto mr-auto">{value}</div>
        </div>
    );
};

export default Badge;
