import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Badge from "../Badge/Badge";

type OppositePlayerProps = {
    left?: string; // Front side image source
    top?: string; // Back side image source
    index: number;
    color?: string;
};

const OppositePlayer: React.FC<OppositePlayerProps> = ({ left, top, index, color }) => {
    return (
        <div
            key={index}
            className="absolute flex flex-col justify-center text-gray-600 w-[150px] h-[140px] mt-[40px] transform -translate-x-1/2 -translate-y-1/2"
            style={{
                left: left,
                top: top
            }}
        >
            <div className="flex justify-center gap-1">
                <img src={`/cards/Back.svg`} className="w-[35%] h-[auto]" />
                <img src={`/cards/Back.svg`} className="w-[35%] h-[auto]" />
            </div>
            <div className="relative flex flex-col justify-end mt-[-6px] mx-1">
                <div
                    style={{ backgroundColor: color }}
                    className={`b-[0%] mt-[auto] w-full h-[55px] shadow-[1px_2px_6px_2px_rgba(0,0,0,0.3)] rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md shadow-md flex flex-col`}
                >
                    {/* <InfiniteProgressBar /> */}
                </div>
                <div className="absolute top-[0%] w-full">
                    <Badge count={index + 1} value={index * 100} color={color} />
                </div>
            </div>
        </div>
    );
};

export default OppositePlayer;
