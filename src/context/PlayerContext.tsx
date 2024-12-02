import React, { createContext, useState, ReactNode, useEffect, useMemo, useCallback, useRef } from "react";
import { Player, PlayerContextType } from "./types";

export enum PlayerStatus {
    Idle = 0,
    Turn = 1,
    Fold = 2,
    AllIn = 3
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isInitialized = useRef(false);
    const [players, setPlayers] = useState<Player[]>(
        Array.from({ length: 9 }, (_, index) => ({
            index,
            balance: 200,
            status: PlayerStatus.Idle,
            pot: 0
        }))
    );
    const [lastPot, setLastPot] = useState<number>(0);
    const [tableSize, setTableSize] = useState<number>(9);
    const [playerIndex, setPlayerIndex] = useState<number>(-1);
    const [dealerIndex, setDealerIndex] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Function to update player details
    // const updatePlayer = (index: number, updatedPlayer: Player) => {
    //     setPlayers(prev => prev.map(player => (player.index === index ? updatedPlayer : player)));
    // };

    const nextPlayer = (turn: number, amount: number) => {
        let player = turn;
        while (amount) {
            player = (player + 1) % tableSize;
            if (players[player].status === PlayerStatus.Idle) {
                amount--;
            }
        }

        return player;
    };

    const newGame = (dealer: number) => {
        console.log("GAME START", playerIndex);
        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(dealer, 3);
        updatedPlayers[nextPlayer(dealer, 1)].pot = 2;
        updatedPlayers[nextPlayer(dealer, 2)].pot = 4;
        updatedPlayers[nextPlayerIndex].status = PlayerStatus.Turn;
        setLastPot(4);
        setDealerIndex(dealer);
        setPlayers([...updatedPlayers]);
        setPlayerIndex(nextPlayerIndex);
    };

    const fold = () => {
        console.log("fold", playerIndex, players);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(playerIndex, 1);
        updatedPlayers[playerIndex].status = PlayerStatus.Fold;
        updatedPlayers[nextPlayerIndex].status = PlayerStatus.Turn;
        setPlayers([...updatedPlayers]);
        setPlayerIndex(nextPlayerIndex);

        return true;
    };

    const check = () => {
        console.log("check", playerIndex, players);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(playerIndex, 1);
        const checkPot = lastPot - updatedPlayers[playerIndex].pot;

        if (updatedPlayers[playerIndex].balance <= checkPot) {
            updatedPlayers[playerIndex].status = PlayerStatus.AllIn;
            updatedPlayers[playerIndex].pot += updatedPlayers[playerIndex].balance;
            updatedPlayers[playerIndex].balance = 0;
        } else {
            updatedPlayers[playerIndex].status = PlayerStatus.Idle;
            updatedPlayers[playerIndex].balance -= checkPot;
            updatedPlayers[playerIndex].pot = lastPot;
        }

        updatedPlayers[nextPlayerIndex].status = PlayerStatus.Turn;
        setPlayers([...updatedPlayers]);
        setPlayerIndex(nextPlayerIndex);

        return true;
    };

    const raise = (amount: number) => {
        console.log("raise", amount, playerIndex, players);
        if (lastPot >= players[playerIndex].pot + amount || players[playerIndex].balance < amount) {
            console.error("Invalid amount to raise.");
            return false;
        }

        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(playerIndex, 1);

        if (updatedPlayers[playerIndex].balance === amount) {
            updatedPlayers[playerIndex].status = PlayerStatus.AllIn;
            updatedPlayers[playerIndex].pot += updatedPlayers[playerIndex].balance;
            updatedPlayers[playerIndex].balance = 0;
        } else {
            updatedPlayers[playerIndex].status = PlayerStatus.Idle;
            updatedPlayers[playerIndex].balance -= amount;
            updatedPlayers[playerIndex].pot += amount;
        }

        updatedPlayers[nextPlayerIndex].status = PlayerStatus.Turn;
        setPlayers([...updatedPlayers]);
        setPlayerIndex(nextPlayerIndex);
        return true;
    };

    useEffect(() => {
        if (playerIndex < 0) return;
        console.log("useEffect", playerIndex);
        if (playerIndex === 0) {
            console.log("It's your turn.");

            // Clear any existing timer to avoid overlap
            if (timer) clearTimeout(timer);

            // Start a 30-second timer for the current player
            const newTimer = setTimeout(() => {
                fold();
            }, 30000); // 30 seconds
            setTimer(newTimer);
            return;
        }

        setTimeout(() => {
            let isSuccess = false;
            do {
                const randValue = Math.floor(Math.random() * 3);
                if (randValue === 0) {
                    isSuccess = fold();
                } else if (randValue === 1) {
                    isSuccess = check();
                } else {
                    isSuccess = raise(Math.floor(Math.random() * 10 + 1));
                }
            } while (!isSuccess);
        }, Math.floor(Math.random() * 5 + 3) * 1000);
    }, [playerIndex]);

    useEffect(() => {
        if (!isInitialized.current) {
            newGame(0);
            isInitialized.current = true;
        }
    }, []);

    const contextValue = useMemo(
        () => ({
            players,
            tableSize,
            playerIndex,
            dealerIndex,
            fold,
            raise,
            check
        }),
        [players, tableSize, playerIndex, dealerIndex, fold, raise, check]
    );

    return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};
