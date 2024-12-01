import React, { useEffect, useState } from "react";
import { usePlayerContext } from "../../../context/usePlayerContext";

type PlaceAnimationProps = {
    top?: string; // CSS top position
    left?: string; // CSS left position
    index: number; // Index of the player
};

const PlaceAnimation: React.FC<PlaceAnimationProps> = ({ left, top, index }) => {
    const { players } = usePlayerContext();
    const [isThinking, setIsThinking] = useState(false);

    const currentPlayer = players[index];

    useEffect(() => {
        console.log(currentPlayer);
        if (currentPlayer.choice === "thinking") {
            setIsThinking(true);
        } else {
            setIsThinking(false);
        }
    }, [currentPlayer.choice, index]); // React to changes in players or index

    // Only show the animation if the player is thinking
    if (!isThinking) return null;

    return (
        <img
            src="/cards/PlayerAnimation.svg"
            alt="Thinking Animation"
            className="absolute mt-[35px] transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
            style={{
                left: left || "50%",
                top: top || "50%"
            }}
        />
    );
};

export default PlaceAnimation;
