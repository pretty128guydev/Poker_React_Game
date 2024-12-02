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
    const [playerIndex, setPlayerIndex] = useState<number>(0);
    const [dealerIndex, setDealerIndex] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Function to update player details
    // const updatePlayer = (index: number, updatedPlayer: Player) => {
    //     setPlayers(prev => prev.map(player => (player.index === index ? updatedPlayer : player)));
    // };

    const nextPlayer = (index: number) => {
        let player = playerIndex;
        while (index) {
            player = (player + 1) % tableSize;
            if (players[player].status === PlayerStatus.Idle) {
                index--;
            }
        }

        return player;
    };

    const newGame = (dealer: number) => {
        console.log("GAME START", playerIndex);
        let updatedPlayers = players;
        updatedPlayers[nextPlayer(1)].pot = 2;
        updatedPlayers[nextPlayer(2)].pot = 4;
        updatedPlayers[nextPlayer(3)].status = PlayerStatus.Turn;
        setLastPot(4);
        setDealerIndex(dealer);
        setPlayers(updatedPlayers);
        setPlayerIndex(nextPlayer(3));

        // Clear any existing timer to avoid overlap
        if (timer) clearTimeout(timer);

        // Start a 30-second timer for the current player
        const newTimer = setTimeout(() => {
            fold();
        }, 30000); // 30 seconds
        setTimer(newTimer);
    };

    const fold = () => {
        console.log("fold", playerIndex, players);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(1);
        updatedPlayers[playerIndex].status = PlayerStatus.Fold;
        updatedPlayers[nextPlayerIndex].status = PlayerStatus.Turn;
        setPlayerIndex(nextPlayerIndex);
    };

    const check = () => {
        console.log("check", playerIndex, players);
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(1);
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
        setPlayerIndex(nextPlayerIndex);
    };

    const raise = (amount: number) => {
        console.log("raise", amount, playerIndex, players);
        if (lastPot >= players[playerIndex].pot + amount || players[playerIndex].balance < amount) {
            console.error("Invalid amount to raise.");
            return;
        }

        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        let updatedPlayers = players;
        const nextPlayerIndex = nextPlayer(1);

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
        setPlayerIndex(nextPlayerIndex);
    };

    useEffect(() => {
        console.log(playerIndex);
        if (playerIndex === 0) {
            console.log("It's your turn.");
            return;
        }

        const randValue = Math.floor(Math.random() * 3);
        setTimeout(() => {
            if (randValue === 0) {
                fold();
            } else if (randValue === 1) {
                check();
            } else {
                raise(Math.floor(Math.random() * 10 + 1));
            }
        }, Math.floor(Math.random() * 5 + 3) * 1000);
    }, [playerIndex]);

    // const startThinking = (index: number, updatedPlayers: Player[]) => {
    //     console.log("START!!!!!", index, players);

    //     if (timer) {
    //         clearTimeout(timer);
    //         setTimer(null);
    //     }

    //     updatedPlayers[index] = { ...updatedPlayers[index], status: PlayerStatus.Turn };
    //     console.log(updatedPlayers);
    //     setPlayers(updatedPlayers);

    //     console.log(`current:`, playerIndex, "index: ", index);
    //     // Start a 30-second timer for the current player
    //     const newTimer = setTimeout(() => {
    //         // Ensure the timeout only executes if this is still the current player
    //         moveToNextPlayer(index, updatedPlayers);
    //     }, 30000); // 30 seconds
    //     setTimer(newTimer);
    // };

    // const handleStatusChange = (index: number, newStatus: number, updatedPlayers: Player[]) => {
    //     console.log(`newStatus:`, newStatus);
    //     // Clear the current timer
    //     if (timer) {
    //         clearTimeout(timer);
    //         setTimer(null);
    //     }

    //     // Update the player's status
    //     updatedPlayers[index] = { ...updatedPlayers[index], status: newStatus };
    //     console.log(updatedPlayers);
    //     // Immediately update state
    //     setPlayers(updatedPlayers);
    //     console.log(index, playerIndex);

    //     // Move to the next player if the current player made a status
    //     moveToNextPlayer(index, updatedPlayers);
    // };

    // const moveToNextPlayer = (index: number, updatedPlayers: Player[]) => {
    //     console.log("MoveToNextPlayer");
    //     // Clear the timer for the current player
    //     if (timer) {
    //         clearTimeout(timer);
    //         setTimer(null); // Reset the timer
    //     }

    //     console.log(index);
    //     console.log(`beforemove`, updatedPlayers[index]);
    //     updatedPlayers[index] = {
    //         ...updatedPlayers[index],
    //         status: PlayerStatus.Fold
    //     };
    //     console.log(updatedPlayers);

    //     let nextIndex = (index + 1) % updatedPlayers.length;
    //     let attempts = 0;
    //     while (updatedPlayers[nextIndex].balance === 0 && attempts < updatedPlayers.length) {
    //         nextIndex = (nextIndex + 1) % updatedPlayers.length;
    //         attempts++;
    //     }
    //     console.log(nextIndex);
    //     if (attempts === updatedPlayers.length) {
    //         console.error("No eligible players with a non-zero balance!");
    //         return; // Exit if all players have balance 0
    //     }

    //     setPlayers(updatedPlayers);
    //     setPlayerIndex(nextIndex);

    //     startThinking(nextIndex, updatedPlayers);
    // };

    // const setPlayerBalance = (index: number, balance: number) => {
    //     setPlayers(prev =>
    //         prev.map(player =>
    //             player.index === index
    //                 ? { ...player, balance: balance, status: balance === 0 ? PlayerStatus.Fold : player.status } // Automatically set "fold" if balance is 0
    //                 : player
    //         )
    //     );
    // };

    // const setPlayerPot = (index: number, pot: number) => {
    //     setPlayers(prev =>
    //         prev.map(player =>
    //             player.index === index
    //                 ? { ...player, pot: pot } // Automatically set "fold" if pot is 0
    //                 : player
    //         )
    //     );
    // };

    // const changeToThinkingBeforeTimeout = () => {
    //     if (timer) {
    //         clearTimeout(timer); // Stop the current timeout
    //         setTimer(null); // Reset the timer
    //     }

    //     const updatedPlayers = [...players];

    //     // Fold the current player
    //     updatedPlayers[playerIndex] = {
    //         ...updatedPlayers[playerIndex],
    //         status: PlayerStatus.Fold
    //     };

    //     // Move to the next player
    //     let nextIndex = (playerIndex + 1) % updatedPlayers.length;

    //     let attempts = 0; // Safety mechanism to avoid infinite loops
    //     while (updatedPlayers[nextIndex].balance === 0 && attempts < updatedPlayers.length) {
    //         nextIndex = (nextIndex + 1) % updatedPlayers.length;
    //         attempts++;
    //     }

    //     if (attempts === updatedPlayers.length) {
    //         console.error("No eligible players with a non-zero balance!");
    //         return; // Exit if all players have balance 0
    //     }

    //     // Set the next player to "thinking"
    //     updatedPlayers[nextIndex] = {
    //         ...updatedPlayers[nextIndex],
    //         status: PlayerStatus.Turn
    //     };

    //     // Update state
    //     setPlayers(updatedPlayers);
    //     setPlayerIndex(nextIndex);
    // };

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
