import { useEffect, useState } from "react";
import { playerPosition } from "../../utils/PlayerPositionArray";
import Badge from "./Badge/Badge";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { IoMenuSharp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import PokerActionPanel from "../Footer";
import PokerLog from "../PokerLog";
import InfiniteProgressBar from "./AutoProgressBar/AutoProgressBar";

//* Define the interface for the position object
interface PositionArray {
    left: string;
    top: string;
}

function PlayPage() {
    const [selectedValue, setSelectedValue] = useState<number | string>("9");
    const [positionArray, setPositionArray] = useState<PositionArray[]>([]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //TODO: set the number of players
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        //* set the number of players
        switch (selectedValue) {
            case "6":
                setPositionArray(playerPosition.six);
                break;
            case "9":
                setPositionArray(playerPosition.nine);
                break;
            default:
                setPositionArray([]);
        }
    }, [selectedValue]);

    //* Get Randome Card
    function getRandomCard() {
        const ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const suits = ["A", "B", "C", "D"]; // Suits can be interpreted as Spades, Hearts, Clubs, Diamonds
        const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
        const randomSuit = suits[Math.floor(Math.random() * suits.length)];
        return randomRank + randomSuit;
    }

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
            {/*//! BODY + FOOTER */}
            <div className="flex w-full h-[calc(100vh-70px)]">
                {/*//! BODY */}
                <div className="h-full w-[85%]">
                    {/*//! TABLE */}
                    <div className="flex-grow scrollbar-none bg-custom-table h-[75%] flex flex-col justify-center items-center relative pt-10 z-0">
                        <div className="h-[50%] w-[85%] mt-[-10vh] relative text-center block z-[-2] transform translate-y-[30px]">
                            <div className="h-full">
                                <div className="flex absolute gap-2 w-[40%] h-[70%] left-1/2 top-5 transform -translate-x-1/2 text-center z-0 border-[2px] border-[#c9c9c985] rounded-full flex items-center justify-center shadow-[0_7px_13px_rgba(0,0,0,0.3)]">
                                    {/* {//TODO: TABLE} */}
                                    <img src={`/cards/${getRandomCard()}.svg`} className="w-[55px] h-[auto]" />
                                    <img src={`/cards/${getRandomCard()}.svg`} className="w-[55px] h-[auto]" />
                                    <img src={`/cards/${getRandomCard()}.svg`} className="w-[55px] h-[auto]" />
                                    <div className="w-[55px] h-[76px] aspect-square border-[0.5px] border-dashed border-white rounded-[5px]"></div>
                                    <div className="w-[55px] h-[76px] aspect-square border-[0.5px] border-dashed border-white rounded-[5px]"></div>
                                </div>
                            </div>
                            {positionArray.map((position, index) => (
                                <>
                                    {index == 2 || index == 4 ? (
                                        //! Vacant
                                        <div
                                            key={index}
                                            className="absolute flex flex-col justify-center text-gray-600 w-[175px] h-[170px] mt-[40px] transform -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                left: position.left,
                                                top: position.top
                                            }}
                                        >
                                            <div className="flex justify-center gap-4 mb-2">
                                                <FaRegUserCircle color="#f0f0f0" className="w-10 h-10" />
                                            </div>
                                            <div className="text-white">Vacant Seat</div>
                                        </div>
                                    ) : index != 0 ? (
                                        //!Back Card
                                        <div
                                            key={index}
                                            className="absolute flex flex-col justify-center text-gray-600 w-[150px] h-[140px] mt-[40px] transform -translate-x-1/2 -translate-y-1/2"
                                            style={{
                                                left: position.left,
                                                top: position.top
                                            }}
                                        >
                                            <div className="flex justify-center gap-1">
                                                <img src={`/cards/Back.svg`} className="w-[35%] h-[auto]" />
                                                <img src={`/cards/Back.svg`} className="w-[35%] h-[auto]" />
                                            </div>
                                            <div className="relative flex flex-col justify-end mt-[-6px] mx-1">
                                                <div className="b-[0%] mt-[auto] w-full h-[50px] bg-red-500 shadow-[1px_2px_6px_2px_rgba(0,0,0,0.3)] rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl shadow-md flex flex-col">
                                                    {/* <p className="text-white font-bold text-sm mt-auto mb-1.5 self-center">+100</p> */}
                                                    <InfiniteProgressBar />
                                                </div>
                                                <div className="absolute top-[0%] w-full">
                                                    <Badge count={9} value={index * 100} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        //! Mine
                                        <>
                                            <img
                                                src="/cards/PlayerAnimation.svg"
                                                className="absolute mt-[20px] transform -translate-x-1/2 -translate-y-1/2"
                                                style={{
                                                    left: position.left,
                                                    top: position.top
                                                }}
                                            />
                                            <div
                                                key={index}
                                                className="absolute flex flex-col justify-center text-gray-600 w-[150px] h-[140px] mt-[40px] transform -translate-x-1/2 -translate-y-1/2"
                                                style={{
                                                    left: position.left,
                                                    top: position.top
                                                }}
                                            >
                                                <div className="flex justify-center gap-1">
                                                    <img src={`/cards/${getRandomCard()}.svg`} className="w-[35%] h-[auto]" />
                                                    <img src={`/cards/${getRandomCard()}.svg`} className="w-[35%] h-[auto]" />
                                                </div>
                                                <div className="relative flex flex-col justify-end mt-[-6px] mx-1s">
                                                    <div className="b-[0%] mt-[auto] w-full h-[50px] bg-red-500  shadow-[1px_2px_6px_2px_rgba(0,0,0,0.3)] rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl shadow-md flex flex-col">
                                                        {/* <p className="text-white font-bold text-sm mt-auto mb-1.5 self-center">+100</p> */}
                                                        <InfiniteProgressBar />
                                                    </div>
                                                    <div className="absolute top-[0%] w-full">
                                                        <Badge count={9} value={128} />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            ))}
                        </div>
                    </div>
                    {/*//! FOOTER */}
                    <div className="w-full h-[25%] bottom-0 bg-custom-footer top-5 text-center z-0 flex justify-center">
                        {/* <select
                            value={selectedValue}
                            onChange={handleSelectChange}
                            className="p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-5"
                        >
                            <option value="">Select a number</option>
                            <option value={6}>
                                6
                            </option>
                            <option value={9}>
                                9
                            </option>
                        </select>
                        <p className="mt-4 text-xl text-gray-700 font-semibold">Selected Number: {selectedValue}</p> */}
                        <PokerActionPanel />
                    </div>
                </div>
                {/*//! SIDEBAR */}
                <div className="w-[15%] flex bg-custom-header flex-col items-center justify-center p-4">
                    <PokerLog />
                </div>
            </div>
        </div>
    );
}

export default PlayPage;
