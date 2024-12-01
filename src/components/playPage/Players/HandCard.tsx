import React, { useEffect, useState } from "react";
import "./HandCard.css";

type HandCardProps = {
    frontSrc: string; // Front side image source
    backSrc: string; // Back side image source
};

const HandCard: React.FC<HandCardProps> = ({ frontSrc, backSrc }) => {
    const [flipped, setFlipped] = useState(false);

    //!Clickable
    const handleClick = () => {
        setFlipped(!flipped); // Toggle flip state on click
    };

    // useEffect(() => {
    //     // Trigger flip on component mount (initial render)
    //     const timer = setTimeout(() => {
    //         setFlipped(true);
    //     }, 100); // Slight delay to trigger the animation

    //     return () => clearTimeout(timer);
    // }, []);

    return (
        // !Clickable
        <div className={`handcard ${flipped ? "" : "flipped"}`} onClick={handleClick}>
            {/* <div className={`card ${flipped ? "" : "flipped"}`}> */}
            <div className="handcard-inner">
                <div className="handcard-front">
                    <img src={frontSrc} alt="Card Front" />
                </div>
                <div className="handcard-back">
                    <img src={backSrc} alt="Card Back" />
                </div>
            </div>
        </div>
    );
};

export default HandCard;
