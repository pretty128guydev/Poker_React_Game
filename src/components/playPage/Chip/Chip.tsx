import React from "react";

type ChipProps = {
    bottom?: string; // Back side image source
    left?: string;
};

const Chip: React.FC<ChipProps> = ({ left, bottom }) => {
    return <img src={`/cards/chip.svg`} className="absolute w-[20px] h-[auto]" style={{ bottom: bottom, left: left }} />;
};

export default Chip;
