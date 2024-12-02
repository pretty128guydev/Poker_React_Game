import { useEffect, useState } from "react";
import { playerPosition, chipPosition, dealerPosition } from "../../utils/PositionArray";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { IoMenuSharp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import PokerActionPanel from "../Footer";
import PokerLog from "../PokerLog";
import OppositePlayerCards from "./Card/OppositePlayerCards";
import VacantPlayer from "./Players/VacantPlayer";
import OppositePlayer from "./Players/OppositePlayer";
import Player from "./Players/Player";
import Dealer from "./reusable/Dealer";
import Chip from "./reusable/Chip";
import { usePlayerContext } from "../../context/usePlayerContext";
import { PlayerStatus } from "../../context/types";
import TurnAnimation from "./TurnAnimation/TurnAnimation";

//* Define the interface for the position object
interface PositionArray {
    left?: string;
    top?: string;
    bottom?: string;
    right?: string;
    color?: string;
}

const calculateZoom = () => {
    const baseWidth = 1800;
    const baseHeight = 950;
    const scaleWidth = window.innerWidth / baseWidth; // Scale relative to viewport width
    const scaleHeight = window.innerHeight / baseHeight; // Scale relative to viewport height
    return Math.min(scaleWidth, scaleHeight);
};

function PlayPage() {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [playerPositionArray, setPlayerPositionArray] = useState<PositionArray[]>([]);
    const [chipPositionArray, setChipPositionArray] = useState<PositionArray[]>([]);
    const [dealerPositionArray, setDealerPositionArray] = useState<PositionArray[]>([]);
    const [zoom, setZoom] = useState(calculateZoom());
    const [flipped1, setFlipped1] = useState(false);
    const [flipped2, setFlipped2] = useState(false);
    const [flipped3, setFlipped3] = useState(false);

    function threeCardsTable() {
        setTimeout(() => {
            setFlipped1(true);
        }, 1000);
        setTimeout(() => {
            setFlipped2(true);
        }, 1100);
        setTimeout(() => {
            setFlipped3(true);
        }, 1200);
    }

    useEffect(() => {
        threeCardsTable();
    }, []);

    const { players, dealerIndex, tableSize, openOneMore, openTwoMore } = usePlayerContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex === 2) {
                    // Handle case where prevIndex is 2 (e.g., no change or custom logic)
                    return prevIndex + 2; // For example, keep it the same
                } else if (prevIndex === 4) {
                    // If prevIndex is 4, increment by 2
                    return prevIndex + 2;
                } else if (prevIndex === 9) {
                    // If prevIndex is 4, increment by 2
                    return prevIndex - 8;
                } else {
                    // Otherwise, just increment by 1
                    return prevIndex + 1;
                }
            });
        }, 30000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, [currentIndex]);

    useEffect(() => {
        const handleResize = () => setZoom(calculateZoom());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        //* set the number of players
        switch (tableSize) {
            case 6:
                setPlayerPositionArray(playerPosition.six);
                setChipPositionArray(chipPosition.six);
                setDealerPositionArray(dealerPosition.six);
                break;
            case 9:
                setPlayerPositionArray(playerPosition.nine);
                setChipPositionArray(chipPosition.nine);
                setDealerPositionArray(dealerPosition.nine);
                break;
            default:
                setPlayerPositionArray([]);
                setChipPositionArray([]);
                setDealerPositionArray([]);
        }
    }, [tableSize]);

    return (
        <div className="h-screen">
            {/*//! HEADER */}
            <div className="w-[100vw] h-[70px] bottom-0 bg-gray-800 top-5 text-center z-0 flex items-center justify-between border-b border-gray-400 px-4 z-0">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
                        <IoMenuSharp />
                    </div>
                    {/* <span className="text-white text-sm font-medium"></span> */}
                </div>

                {/* Middle Section */}
                <div className="flex items-center space-x-4">
                    <div className="w-24 h-12 border border-gray-600 flex items-center justify-center rounded-md white">
                        <HiOutlinePlusCircle color="#f0f0f0" />
                    </div>
                    <div className="w-24 h-12 border border-gray-600 flex items-center justify-center rounded-md">
                        <HiOutlinePlusCircle color="#f0f0f0" />
                    </div>
                    <div className="w-24 h-12 border border-gray-600 flex items-center justify-center rounded-md">
                        <HiOutlinePlusCircle color="#f0f0f0" />
                    </div>
                    <div className="w-24 h-12 border border-gray-600 flex items-center justify-center rounded-md white">
                        <HiOutlinePlusCircle color="#f0f0f0" />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full">
                        <CiCalendar color="#f0f0f0" />
                    </div>
                </div>
            </div>
            {/*//! BODY */}
            <div className="flex w-full h-[calc(100%-70px)]">
                {/*//! TABLE + FOOTER */}
                <div className="h-full flex flex-col justify-between w-[calc(100%-250px)]">
                    {/*//! TABLE */}
                    <div className="flex flex-col align-center justify-center h-[calc(100%-190px)]">
                        <div className="zoom-container h-[400px] w-[800px] m-[auto]" style={{ zoom }}>
                            <div className="flex-grow scrollbar-none bg-custom-table h-full flex flex-col justify-center items-center relative z-0">
                                <div className="w-[800px] h-[400px] relative text-center block z-[-2] transform translate-y-[30px]">
                                    <div className="h-full flex align-center justify-center">
                                        <div className="relative flex flex-col absolute w-[800px] h-[300px] left-1/2 top-5 transform -translate-x-1/2 text-center z-0 border-[2px] border-[#c9c9c985] rounded-full flex items-center justify-center shadow-[0_7px_13px_rgba(0,0,0,0.3)]">
                                            {/* //! Table */}
                                            <div className="w-[140px] h-[25px] rounded-full bg-[#00000054] flex align-center justify-center">
                                                <span className="text-[#dbd3d3] mr-2">Total Pot: 50</span>
                                            </div>
                                            <div className="w-[130px] h-[21px] rounded-full bg-[#00000054] flex align-center justify-center mt-2">
                                                <span className="text-[#dbd3d3] mr-2">Main Pot: 50</span>
                                            </div>
                                            <div className="flex gap-2 mt-8">
                                                <div className="card animate-fall delay-200">
                                                    <OppositePlayerCards frontSrc={`/cards/10B.svg`} backSrc="/cards/back.svg" flipped={flipped1} />
                                                </div>
                                                <div className="card animate-fall delay-400">
                                                    <OppositePlayerCards frontSrc={`/cards/JD.svg`} backSrc="/cards/back.svg" flipped={flipped2} />
                                                </div>
                                                <div className="card animate-fall delay-600">
                                                    <OppositePlayerCards frontSrc={`/cards/8B.svg`} backSrc="/cards/back.svg" flipped={flipped3} />
                                                </div>
                                                {openOneMore ? <div className="card animate-fall delay-600">
                                                    <OppositePlayerCards frontSrc={`/cards/6B.svg`} backSrc="/cards/back.svg" flipped={flipped3} />
                                                </div> : <div className="w-[100px] h-[137px] aspect-square border-[0.5px] border-dashed border-white rounded-[5px]"></div>}
                                                {openTwoMore ? <div className="card animate-fall delay-600">
                                                    <OppositePlayerCards frontSrc={`/cards/8A.svg`} backSrc="/cards/back.svg" flipped={flipped3} />
                                                </div> : <div className="w-[100px] h-[137px] aspect-square border-[0.5px] border-dashed border-white rounded-[5px]"></div>}
                                            </div>
                                            {/*//! CHIP */}
                                            {chipPositionArray.map((position, index) => {
                                                return (
                                                    <div
                                                        key={`key-${index}`} // Make sure to add a unique key
                                                        style={{
                                                            left: position.left,
                                                            bottom: position.bottom
                                                        }}
                                                        className="absolute"
                                                    >
                                                        <Chip amount={players[index].pot} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {playerPositionArray.map((position, index) => {
                                        const playerData = players[index];
                                        return (
                                            <div key={index}>
                                                {playerData.status === PlayerStatus.SeatOff ? (
                                                    <VacantPlayer
                                                        index={index}
                                                        left={position.left}
                                                        top={position.top}
                                                    />
                                                ) : index != 0 ? (
                                                    <OppositePlayer
                                                        index={index}
                                                        currentIndex={currentIndex}
                                                        left={position.left}
                                                        top={position.top}
                                                        color={position.color}
                                                        status={players[index]?.status}
                                                    />
                                                ) : (
                                                    <Player
                                                        index={index}
                                                        currentIndex={currentIndex}
                                                        left={position.left}
                                                        top={position.top}
                                                        color={position.color}
                                                        status={players[index]?.status}
                                                    />
                                                )}
                                                <div>
                                                    <TurnAnimation left={position.left} top={position.top} index={index} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {/*//! Dealer */}
                                    <div
                                        style={{
                                            top: dealerPositionArray[dealerIndex]?.top,
                                            left: dealerPositionArray[dealerIndex]?.left,
                                            transition: "top 1s ease, left 1s ease"
                                        }}
                                        className="absolute"
                                    >
                                        <Dealer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*//! FOOTER */}
                    <div className="mb-[0] w-full h-[190px] bottom-0 bg-custom-footer top-5 text-center z-0 flex justify-center">
                        <PokerActionPanel />
                    </div>
                </div>
                {/*//! SIDEBAR */}
                <div className="w-[250px] h-full flex bg-custom-header flex-col items-center justify-center p-4">
                    <PokerLog />
                </div>
            </div>
        </div>
    );
}

export default PlayPage;
