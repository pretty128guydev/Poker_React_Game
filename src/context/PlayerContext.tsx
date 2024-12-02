import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Player, PlayerContextType } from "./types";

export enum PlayerStatus {
    Idle = 0,
    Turn = 1,
    Fold = 2,
    AllIn = 3
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>(
        Array.from({ length: 9 }, (_, index) => ({
            index,
            balance: 200,
            status: PlayerStatus.Idle, //? thinking - 0, fold - 1
            pot: 0,
            place: index + 1
        }))
    );

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [currentDealerIndex, setCurrentDealerIndex] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); const [isTransitioning, setIsTransitioning] = useState(false);

    // Function to update player details
    const updatePlayer = (index: number, updatedPlayer: Player) => {
        setPlayers(prev => prev.map(player => (player.index === index ? updatedPlayer : player)));
        console.log(updatePlayer)
    };

    const initialStart = (index: number) => {
        console.log("GAME START")
        const updatedPlayers = [...players];
        updatedPlayers[index] = { ...updatedPlayers[index], status: PlayerStatus.Turn };
        updatedPlayers[7] = { ...updatedPlayers[7], pot: 2 };
        updatedPlayers[8] = { ...updatedPlayers[8], pot: 4 };
        setPlayers(updatedPlayers);

        // Clear any existing timer to avoid overlap
        if (timer) clearTimeout(timer);

        // Start a 30-second timer for the current player
        const newTimer = setTimeout(() => {
            moveToNextPlayer(index, updatedPlayers);
        }, 30000); // 30 seconds
        setTimer(newTimer);
    }

    const startThinking = (index: number, updatedPlayers: Player[]) => {
        console.log("START!!!!!", index, players)

        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        updatedPlayers[index] = { ...updatedPlayers[index], status: PlayerStatus.Turn };
        console.log(updatedPlayers)
        setPlayers(updatedPlayers);

        console.log(`current:`, currentPlayerIndex, "index: ", index)
        // Start a 30-second timer for the current player
        const newTimer = setTimeout(() => {
            // Ensure the timeout only executes if this is still the current player
            moveToNextPlayer(index, updatedPlayers);
        }, 30000); // 30 seconds
        setTimer(newTimer);
    };

    const handleStatusChange = (index: number, newStatus: number, updatedPlayers: Player[]) => {
        console.log(`newStatus:`, newStatus)
        // Clear the current timer
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }

        // Update the player's status
        updatedPlayers[index] = { ...updatedPlayers[index], status: newStatus };
        console.log(updatedPlayers)
        // Immediately update state 
        setPlayers(updatedPlayers);
        console.log(index, currentPlayerIndex)

        // Move to the next player if the current player made a status
        moveToNextPlayer(index, updatedPlayers);
    };

    const moveToNextPlayer = (index: number, updatedPlayers: Player[]) => {
        console.log("MoveToNextPlayer")
        // Clear the timer for the current player
        if (timer) {
            clearTimeout(timer);
            setTimer(null); // Reset the timer
        }

        console.log(index)
        console.log(`beforemove`, updatedPlayers[index])
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            status: PlayerStatus.Fold,
        };
        console.log(updatedPlayers)

        let nextIndex = (index + 1) % updatedPlayers.length;
        let attempts = 0;
        while (updatedPlayers[nextIndex].balance === 0 && attempts < updatedPlayers.length) {
            nextIndex = (nextIndex + 1) % updatedPlayers.length;
            attempts++;
        }
        console.log(nextIndex)
        if (attempts === updatedPlayers.length) {
            console.error("No eligible players with a non-zero balance!");
            return; // Exit if all players have balance 0
        }

        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextIndex);

        startThinking(nextIndex, updatedPlayers);
    };

    const setPlayerBalance = (index: number, balance: number) => {
        setPlayers(prev =>
            prev.map(player =>
                player.index === index
                    ? { ...player, balance: balance, status: balance === 0 ? PlayerStatus.Fold : player.status } // Automatically set "fold" if balance is 0
                    : player
            )
        );
    };


    const setPlayerPot = (index: number, pot: number) => {
        setPlayers(prev =>
            prev.map(player =>
                player.index === index
                    ? { ...player, pot: pot } // Automatically set "fold" if pot is 0
                    : player
            )
        );
    };

    const changeToThinkingBeforeTimeout = () => {
        if (timer) {
            clearTimeout(timer); // Stop the current timeout
            setTimer(null); // Reset the timer
        }

        const updatedPlayers = [...players];

        // Fold the current player
        updatedPlayers[currentPlayerIndex] = {
            ...updatedPlayers[currentPlayerIndex],
            status: PlayerStatus.Fold
        };

        // Move to the next player
        let nextIndex = (currentPlayerIndex + 1) % updatedPlayers.length;

        let attempts = 0; // Safety mechanism to avoid infinite loops
        while (updatedPlayers[nextIndex].balance === 0 && attempts < updatedPlayers.length) {
            nextIndex = (nextIndex + 1) % updatedPlayers.length;
            attempts++;
        }

        if (attempts === updatedPlayers.length) {
            console.error("No eligible players with a non-zero balance!");
            return; // Exit if all players have balance 0
        }

        // Set the next player to "thinking"
        updatedPlayers[nextIndex] = {
            ...updatedPlayers[nextIndex],
            status: PlayerStatus.Turn
        };

        // Update state
        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextIndex);
    };

    useEffect(() => {
        initialStart(0);
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                players,
                updatePlayer,
                currentDealerIndex,
                moveToNextPlayer,
                setPlayerBalance,
                changeToThinkingBeforeTimeout,
                setPlayerPot,
                handleStatusChange,
                currentPlayerIndex
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
