import React from "react";

type PlaceAnimationProps = {
    top?: string; // Back side image source
    left?: string;
};

const PlaceAnimation: React.FC<PlaceAnimationProps> = ({ left, top }) => {
    return (
        <img
            src="/cards/PlayerAnimation.svg"
            className="absolute mt-[35px] transform -translate-x-1/2 -translate-y-1/2"
            style={{
                left: left,
                top: top
            }}
        />
    );
};

export default PlaceAnimation;
