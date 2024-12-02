import { useContext, useEffect, useState } from "react";
import { playerPosition, chipPosition, dealerPosition } from "../../utils/PositionArray";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { IoMenuSharp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import PokerActionPanel from "../Footer";
import PokerLog from "../PokerLog";
import Card from "./Card/Card";
import VacantPlayer from "./Players/VacantPlayer";
import OppositePlayer from "./Players/OppositePlayer";
import Player from "./Players/Player";
import Dealer from "./Dealer/Dealer";
import Chip from "./Chip/Chip";
import PlaceAnimation from "./PlaceAnimation/PlaceAnimation";
import { PlayerContext } from "../../context/PlayerContext";
import { usePlayerContext } from "../../context/usePlayerContext";

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
    const [selectedValue, setSelectedValue] = useState<number | string>("9");
    const [currentDealer, setCurrentDealer] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const [currentChip, setCurrentChip] = useState<number>(0);
    const [playerPositionArray, setPlayerPositionArray] = useState<PositionArray[]>([]);
    const [chipPositionArray, setChipPositionArray] = useState<PositionArray[]>([]);
    const [dealerPositionArray, setDealerPositionArray] = useState<PositionArray[]>([]);
    const [zoom, setZoom] = useState(calculateZoom());
    const [flipped1, setFlipped1] = useState(false);
    const [flipped2, setFlipped2] = useState(false);
    const [flipped3, setFlipped3] = useState(false);

    function threeCardsTable() {
        setTimeout(() => {
            setFlipped1(true)
        }, 1000);
        setTimeout(() => {
            setFlipped2(true)
        }, 1100);
        setTimeout(() => {
            setFlipped3(true)
        }, 1200);
    }

    useEffect(() => {
        threeCardsTable();
    }, [])


    const { players, updatePlayer, currentDealerIndex } = usePlayerContext();
    const playerStatuses = players.map(player => player.status);

    const start = () => {
        if (players[2].balance !== 0) {
            updatePlayer(2, { ...players[2], balance: 0 });
        }
        if (players[4].balance !== 0) {
            updatePlayer(4, { ...players[4], balance: 0 });
        }
        console.log(players);
    };

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

    //* Get Randome Card
    function getRandomCard() {
        const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const suits = ["A", "B", "C", "D"]; // Suits can be interpreted as Spades, Hearts, Clubs, Diamonds
        const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        return randomRank + randomSuit;
    }

    useEffect(() => {
        //* set the number of players
        switch (selectedValue) {
            case "6":
                setPlayerPositionArray(playerPosition.six);
                setChipPositionArray(chipPosition.six);
                setDealerPositionArray(dealerPosition.six);
                break;
            case "9":
                setPlayerPositionArray(playerPosition.nine);
                setChipPositionArray(chipPosition.nine);
                setDealerPositionArray(dealerPosition.nine);
                break;
            default:
                setPlayerPositionArray([]);
                setChipPositionArray([]);
                setDealerPositionArray([]);
        }
    }, [selectedValue]);

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
                                                <span className="text-[#dbd3d3] mr-2" onClick={start}>
                                                    Total Pot: 50
                                                </span>
                                            </div>
                                            <div className="w-[130px] h-[21px] rounded-full bg-[#00000054] flex align-center justify-center mt-2">
                                                <span className="text-[#dbd3d3] mr-2">Main Pot: 50</span>
                                            </div>
                                            <div className="flex gap-2 mt-8">
                                                <div className="card animate-fall delay-200">
                                                    <Card frontSrc={`/cards/KB.svg`} backSrc="/cards/back.svg" flipped={flipped1} />
                                                </div>
                                                <div className="card animate-fall delay-400">
                                                    <Card frontSrc={`/cards/JD.svg`} backSrc="/cards/back.svg" flipped={flipped2} />
                                                </div>
                                                <div className="card animate-fall delay-600">
                                                    <Card frontSrc={`/cards/7C.svg`} backSrc="/cards/back.svg" flipped={flipped3} />
                                                </div>
                                                <div className="w-[100px] h-[137px] aspect-square border-[0.5px] border-dashed border-white rounded-[5px]"></div>
                                                <div className="w-[100px] h-[137px] aspect-square border-[0.5px] border-dashed border-white rounded-[5px]"></div>
                                            </div>
                                            {/*//! CHIP */}
                                            {chipPositionArray.map((position, index) => {
                                                return (
                                                    <div
                                                        key={index} // Make sure to add a unique key
                                                        style={{
                                                            left: position.left,
                                                            bottom: position.bottom,
                                                        }}
                                                        className="absolute"
                                                    >
                                                        <Chip amount={players[index].pot} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    {playerPositionArray.map((position, index) => (
                                        <>
                                            {index == 10 ? (
                                                <VacantPlayer key={`vacant-${index}-${position.left}`} index={index} left={position.left} top={position.top} />
                                            ) : index != 0 ? (
                                                <OppositePlayer
                                                    key={`opposite-${index}-${position.color}`}
                                                    index={index}
                                                    currentIndex={currentIndex}
                                                    left={position.left}
                                                    top={position.top}
                                                    color={position.color}
                                                    status={playerStatuses[index]}
                                                />
                                            ) : (
                                                <Player
                                                    key={`mine-${index}-${playerStatuses[index]}`}
                                                    index={index}
                                                    currentIndex={currentIndex}
                                                    left={position.left}
                                                    top={position.top}
                                                    color={position.color}
                                                    status={playerStatuses[index]}
                                                />
                                            )}
                                            <div key={`animation-${index}`}>
                                                <PlaceAnimation left={position.left} top={position.top} index={index} />
                                            </div>
                                        </>
                                    ))}
                                    {/*//! Dealer */}
                                    <div
                                        style={{
                                            top: dealerPositionArray[6]?.top,
                                            left: dealerPositionArray[6]?.left,
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
