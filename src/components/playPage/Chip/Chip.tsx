import React from "react";

type ChipProps = {
    amount: number | undefined;
};

const Chip: React.FC<ChipProps> = ({ amount }) => {
    if (amount && amount > 98) {
        return (
            <div className="relative w-[77px] h-[35px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[20px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[20px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[18px] left-[20px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[18px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[22px] left-[0px]" />

                <img src={`/cards/chiplg.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[10px]" />
                <img src={`/cards/chiplg.svg`} className="absolute w-[20px] h-[auto] bottom-[4px] left-[10px]" />
                {/* <img src={`/cards/chiplg.svg`} className="absolute w-[20px] h-[auto] bottom-[8px] left-[10px]" /> */}

                <span className="absolute top-[6px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 2) {
        return (
            <div className="relative w-[38px] h-[16px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <span className="absolute top-[-4px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 4) {
        return (
            <div className="relative w-[38px] h-[18px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <span className="absolute top-[-3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 8) {
        return (
            <div className="relative w-[38px] h-[27px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 10) {
        return (
            <div className="relative w-[42px] h-[18px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <span className="absolute top-[-2px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 12) {
        return (
            <div className="relative w-[42px] h-[18px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <span className="absolute top-[-2px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 14) {
        return (
            <div className="relative w-[47px] h-[24px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <span className="absolute top-[0px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 16) {
        return (
            <div className="relative w-[42px] h-[24px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[0px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 18) {
        return (
            <div className="relative w-[60px] h-[24px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[20px]" />
                <span className="absolute top-[0px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 20) {
        return (
            <div className="relative w-[47px] h-[18px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <span className="absolute top-[-3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 22) {
        return (
            <div className="relative w-[47px] h-[24px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <span className="absolute top-[1px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 24) {
        return (
            <div className="relative w-[47px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 26) {
        return (
            <div className="relative w-[67px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[20px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 28) {
        return (
            <div className="relative w-[67px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[4px] left-[20px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 30) {
        return (
            <div className="relative w-[47px] h-[24px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <span className="absolute top-[1px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 32) {
        return (
            <div className="relative w-[47px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 34) {
        return (
            <div className="relative w-[67px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[20px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 36) {
        return (
            <div className="relative w-[67px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[4px] left-[20px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 38) {
        return (
            <div className="relative w-[67px] h-[28px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />

                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[0px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[4px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[8px] left-[20px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 40) {
        return (
            <div className="relative w-[47px] h-[27px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 42) {
        return (
            <div className="relative w-[67px] h-[27px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[5px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[20px]" />

                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 44) {
        return (
            <div className="relative w-[67px] h-[27px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[5px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[20px]" />

                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 46) {
        return (
            <div className="relative w-[67px] h-[27px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[5px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[20px]" />

                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 48) {
        return (
            <div className="relative w-[67px] h-[27px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[5px] mb-[10px]">
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[20px]" />
                <img src={`/cards/chipsm.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[20px]" />

                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[6px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[10px] left-[0px]" />
                <img src={`/cards/chipmd.svg`} className="absolute w-[20px] h-[auto] bottom-[14px] left-[0px]" />
                <span className="absolute top-[3px] right-[1px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    } else if (amount && amount == 50) {
        return (
            <div className="relative w-[47px] h-[18px] rounded-tl-3xl rounded-tr-xl rounded-bl-3xl rounded-br-xl bg-[#00000054] flex align-center justify-between ml-[15px] mb-[10px]">
                <img src={`/cards/chiplg.svg`} className="absolute w-[20px] h-[auto] bottom-[2px] left-[0px]" />
                <span className="absolute top-[-2px] right-[0px] text-[#dbd3d3] mr-1">{amount}</span>
            </div>
        );
    }
    // Optional: Return null or some fallback content if amount <= 100 or undefined
    return null;
};

export default Chip;
