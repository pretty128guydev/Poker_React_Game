import React, { useEffect, useState } from "react";
import { usePlayerContext } from "../../../context/usePlayerContext";

type ProgressBarProps = {
    index: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ index }) => {
    const [progress, setProgress] = useState(0);
    const { players, updatePlayer, moveToNextPlayer } = usePlayerContext();

    const currentPlayer = players[index];

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (currentPlayer.choice === "thinking") {
            setProgress(0); // Reset progress when "thinking" starts

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 30) {
                        clearInterval(interval!); // Stop progress
                        updatePlayer(index, { ...currentPlayer, choice: "fold" }); // Mark as fold
                        moveToNextPlayer(); // Move to the next player
                        return prev;
                    }
                    return prev + 1; // Increment progress
                });
            }, 1000); // Update every second
        }

        // Cleanup interval on component unmount or choice change
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [currentPlayer.choice, index, updatePlayer, moveToNextPlayer]);

    // Only render progress bar if current choice is "thinking"
    if (currentPlayer.choice !== "thinking") return null;

    return (
        <div className={"animate-progress delay-2000 flex items-center w-full h-2 mb-2 mt-auto gap-2"}>
            <span className="ml-2 text-white text-sm w-[15px]">{30 - progress}</span>
            <div className="relative flex-1 mr-[10px] h-full w-[calc(100%-25px)] bg-[#f0f0f030] rounded-md overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-white"
                    style={{
                        width: `${(30 - progress) * 3.333}%`, // 30 seconds to fill 100%
                        transition: "width 1s linear"
                    }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;