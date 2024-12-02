import React from "react";
import Badge from "../Badge/Badge";
import ProgressBar from "../AutoProgressBar/AutoProgressBar";
import { usePlayerContext } from "../../../context/usePlayerContext";

export enum PlayerStatus {
    Idle = 0,
    Turn = 1,
    Fold = 2,
    AllIn = 3
}

type OppositePlayerProps = {
    left?: string; // Front side image source
    top?: string; // Back side image source
    index: number;
    currentIndex: number;
    color?: string;
    status?: number;
};

const OppositePlayer: React.FC<OppositePlayerProps> = ({ left, top, index, color, currentIndex, status }) => {
    const { players, updatePlayer, currentDealerIndex } = usePlayerContext();
    return (
        <div
            key={index}
            className={`${players[index].status && players[index].status === PlayerStatus.Fold ? "opacity-60" : ""}  absolute flex flex-col justify-center text-gray-600 w-[150px] h-[140px] mt-[40px] transform -translate-x-1/2 -translate-y-1/2`}
            style={{
                left: left,
                top: top
            }
            }
        >
            <div className="flex justify-center gap-1">
                <img src={`/cards/Back.svg`} className="w-[35%] h-[auto]" />
                <img src={`/cards/Back.svg`} className="w-[35%] h-[auto]" />
            </div>
            <div className="relative flex flex-col justify-end mt-[-6px] mx-1">
                <div
                    style={{ backgroundColor: color }}
                    className={`b-[0%] mt-[auto] w-full h-[55px]  shadow-[1px_2px_6px_2px_rgba(0,0,0,0.3)] rounded-tl-2xl rounded-tr-2xl rounded-bl-md rounded-br-md shadow-md flex flex-col`}
                >
                    {/* <p className="text-white font-bold text-sm mt-auto mb-1.5 self-center">+100</p> */}
                    <ProgressBar index={index} />
                    {players[index].status && players[index].status === PlayerStatus.Fold ?
                        <span className="text-white animate-progress delay-2000 flex items-center w-full h-2 mb-2 mt-auto gap-2 flex justify-center">FOLD</span> :
                        <></>
                    }
                </div>
                <div className="absolute top-[0%] w-full">
                    <Badge count={index + 1} value={players[index].balance} color={color} />
                </div>
            </div>
        </div >
    );
};

export default OppositePlayer;
