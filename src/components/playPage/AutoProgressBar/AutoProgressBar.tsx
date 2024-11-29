import React, { useEffect, useState } from "react";

const InfiniteProgressBar: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animation loop for smooth progress updates
        const updateProgress = () => {
            setProgress(prev => (prev + 1) % 30);
        };

        const interval = setInterval(updateProgress, 1000); // Adjust timing for smooth animation
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className="flex items-center w-full h-2 mb-2 mt-auto gap-2">
            {/* Progress number */}
            <span className="ml-2 text-white text-sm w-[15px]">{31 - progress}</span>
            <div className="relative left-[15px] flex-1 h-full w-[calc(100%-15px)] bg-red-500 rounded-md overflow-hidden">
                {/* Progress bar */}
                <div
                    className="absolute top-0 left-0 h-full w-full bg-white"
                    style={{
                        width: `${(30 - progress) * 3.333}%`,
                        transition: "width 1s linear" // Smooth transition for progress
                    }}
                ></div>
            </div>
        </div>
    );
};

export default InfiniteProgressBar;
