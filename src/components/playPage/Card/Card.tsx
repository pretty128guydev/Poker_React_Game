import React, { useEffect, useState } from "react";
import "./Card.css";

type CardProps = {
    frontSrc: string; // Front side image source
    backSrc: string; // Back side image source
};

const Card: React.FC<CardProps> = ({ frontSrc, backSrc }) => {
    const [flipped, setFlipped] = useState(false);

    //!Clickable
    // const handleClick = () => {
    //     setFlipped(!flipped); // Toggle flip state on click
    // };

    useEffect(() => {
        // Trigger flip on component mount (initial render)
        const timer = setTimeout(() => {
            setFlipped(true);
        }, 100); // Slight delay to trigger the animation

        return () => clearTimeout(timer);
    }, []);

    return (
        //!Clickable <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
        <div className={`card ${flipped ? "" : "flipped"}`}>
            <div className="card-inner">
                <div className="card-front">
                    <img src={frontSrc} alt="Card Front" />
                </div>
                <div className="card-back">
                    <img src={backSrc} alt="Card Back" />
                </div>
            </div>
        </div>
    );
};

export default Card;
