import React, { useEffect, useState } from "react";
import "./Card.css";

type CardProps = {
    frontSrc: string; // Front side image source
    backSrc: string; // Back side image source
    flipped: boolean
};

const Card: React.FC<CardProps> = ({ frontSrc, backSrc, flipped }) => {

    return (
        // !Clickable
        <div className={`card ${flipped ? "" : "flipped"}`}>
            {/* <div className={`card ${flipped ? "" : "flipped"}`}> */}
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
