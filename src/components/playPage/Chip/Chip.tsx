import React from "react";

type ChipProps = {
    amount: number | undefined;
};

const Chip: React.FC<ChipProps> = ({ amount }) => {
    return (
        <div className="relative w-[50px] h-[20px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex items-center justify-between">
            <img src={`/cards/chip.svg`} className="absolute w-[20px] h-[auto] " />
            {/* <img src={`/cards/chiplg.svg`} className="absolute w-[20px] h-[auto] bottom-[8px] left-[10px]" /> */}

            <span className="absolute right-[7px] text-[#dbd3d3]">{amount}</span>
        </div>
    );
};

export default Chip;
