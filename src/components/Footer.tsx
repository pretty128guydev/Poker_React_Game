import React, { useEffect, useState } from "react";
import { usePlayerContext } from "../context/usePlayerContext";

const PokerActionPanel: React.FC = () => {
    const [raiseAmount, setRaiseAmount] = useState(24);
    const { players, changeToThinkingBeforeTimeout, setPlayerBalance, setPlayerPot, currentPlayerIndex, handleStatusChange } = usePlayerContext();

    const handleRaiseChange = (newAmount: number) => {
        setRaiseAmount(newAmount);
    };

    const setBalance1 = () => {
        setPlayerBalance(3, 44);
        console.log(players);
    };

    const setBalance2 = () => {
        setPlayerPot(3, 2);
    };
    console.log(`CURRENT PALYER INDEX: `, currentPlayerIndex)

    const start = () => {
        handleStatusChange(currentPlayerIndex, 1, players);
    };

    return (
        <div className="flex flex-col justify-center rounded-lg w-[600px] h-full text-white space-y-6 mb-2">
            {/* Action Buttons */}
            <div className="flex justify-between gap-2">
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-4 py-2 rounded-lg w-full border-[1px] border-gray-400" onClick={start}>
                    FOLD
                </button>
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-4 py-2 rounded-lg w-full border-[1px] border-gray-400" onClick={setBalance1}>
                    CALL 10
                </button>
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-4 py-2 rounded-lg w-full border-[1px] border-gray-400" onClick={setBalance2}>
                    RAISE TO {raiseAmount}
                </button>
            </div>

            {/* Slider and Controls */}
            <div className="flex items-center space-x-4">
                <button
                    className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] py-1 px-4 rounded-lg  border-[1px] border-gray-400"
                    onClick={() => handleRaiseChange(Math.max(raiseAmount - 1, 0))}
                >
                    -
                </button>
                <input type="range" min="0" max="100" value={raiseAmount} onChange={e => handleRaiseChange(Number(e.target.value))} className="flex-1" />
                <button
                    className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] py-1 px-4 rounded-lg  border-[1px] border-gray-400"
                    onClick={() => handleRaiseChange(raiseAmount + 1)}
                >
                    +
                </button>
            </div>

            {/* Additional Options */}
            <div className="flex justify-between gap-2">
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-2 py-2 rounded-lg w-full border-[1px] border-gray-400">1 / 4 Pot</button>
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-2 py-2 rounded-lg w-full border-[1px] border-gray-400">1 / 2 Pot</button>
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-2 py-2 rounded-lg w-full border-[1px] border-gray-400">3 / 4 Pot</button>
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-2 py-2 rounded-lg w-full border-[1px] border-gray-400">Pot</button>
                <button className="bg-[#0c0c0c80] hover:bg-[#0c0c0c] px-2 py-2 rounded-lg w-full border-[1px] border-gray-400">ALL-IN</button>
            </div>
        </div>
    );
};

export default PokerActionPanel;
