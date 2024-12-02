import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Player, PlayerContextType } from "./types";

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>(
        Array.from({ length: 9 }, (_, index) => ({
            index,
            balance: 2,
            choice: -1, //? thinking - 0, fold - 1
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

    const startThinking = (index: number) => {
        console.log("START!!!!!", index, players)
        const updatedPlayers = [...players];
        updatedPlayers[index] = { ...updatedPlayers[index], choice: 0 };
        console.log(updatedPlayers)
        setPlayers(updatedPlayers);

        // Clear any existing timer to avoid overlap
        if (timer) clearTimeout(timer);

        // Start a 30-second timer for the current player
        const newTimer = setTimeout(() => {
            // Ensure the timeout only executes if this is still the current player
            if (index === currentPlayerIndex) {
                moveToNextPlayer(index);
            }
        }, 30000); // 30 seconds
        setTimer(newTimer);
    };

    const handleChoiceChange = (index: number, newChoice: number) => {
        const updatedPlayers = [...players];
        console.log(`newChoice:`, newChoice)
        // Update the player's choice
        updatedPlayers[index] = { ...updatedPlayers[index], choice: newChoice };
        console.log(updatedPlayers)
        // Immediately update state 
        setPlayers(updatedPlayers);
        console.log(index, currentPlayerIndex)
        if (index === currentPlayerIndex) {
            // Clear the current timer
            if (timer) clearTimeout(timer);

            // Move to the next player if the current player made a choice
            moveToNextPlayer(index);
        }
    };

    const moveToNextPlayer = (index: number) => {
        console.log("MoveToNextPlayer")
        // Clear the timer for the current player
        if (timer) {
            clearTimeout(timer);
            setTimer(null); // Reset the timer
        }

        const updatedPlayers = [...players];
        console.log(index)
        console.log(`beforemove`, updatedPlayers[index])
        updatedPlayers[index] = {
            ...updatedPlayers[index],
            choice: updatedPlayers[index].choice === 0 ? 1 : updatedPlayers[index].choice,
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

        updatedPlayers[nextIndex] = {
            ...updatedPlayers[nextIndex],
            choice: 0,
        };

        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextIndex);

        startThinking(nextIndex);
    };

    const setPlayerBalance = (index: number, balance: number) => {
        setPlayers(prev =>
            prev.map(player =>
                player.index === index
                    ? { ...player, balance: balance, choice: balance === 0 ? 1 : player.choice } // Automatically set "fold" if balance is 0
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
            choice: 1
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
            choice: 0
        };

        // Update state
        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextIndex);
    };

    useEffect(() => {
        startThinking(currentPlayerIndex);
    }, [currentPlayerIndex]);

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
                handleChoiceChange,
                currentPlayerIndex
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
