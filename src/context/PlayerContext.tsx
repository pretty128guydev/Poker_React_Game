import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Player, PlayerContextType } from "./types";

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>(
        Array.from({ length: 9 }, (_, index) => ({
            index,
            balance: 0,
            choice: "",
            pot: 0,
            place: index + 1
        }))
    );

    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [currentDealerIndex, setCurrentDealerIndex] = useState<number>(0);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Function to update player details
    const updatePlayer = (index: number, updatedPlayer: Player) => {
        setPlayers(prev => prev.map(player => (player.index === index ? updatedPlayer : player)));
    };

    // Start thinking for the current player
    const startThinking = (index: number) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = { ...updatedPlayers[index], choice: "thinking" };

        setPlayers(updatedPlayers);

        // Start a 30-second timer for the current player
        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            // Ensure the timeout only executes if this is still the current player
            if (index === currentPlayerIndex) {
                // Ensure the player has not been set to fold (balance 0) during the timeout
                if (updatedPlayers[index].balance > 0) {
                    updatedPlayers[index] = { ...updatedPlayers[index], choice: "fold" };
                    setPlayers(updatedPlayers); // Make sure the state is updated after the timeout
                    moveToNextPlayer();
                }
            }
        }, 30000); // 30 seconds
        setTimer(newTimer);
    };

    // Function to move to the next player
    const moveToNextPlayer = () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null); // Clear the timer
        }

        const updatedPlayers = [...players];

        // Set current player's choice to "fold"
        updatedPlayers[currentPlayerIndex] = {
            ...updatedPlayers[currentPlayerIndex],
            choice: "fold"
        };

        let nextIndex = (currentPlayerIndex + 1) % updatedPlayers.length;

        // Find the next eligible player
        let attempts = 0; // Safety mechanism to avoid infinite loops
        while (updatedPlayers[nextIndex].balance === 0 && attempts < updatedPlayers.length) {
            nextIndex = (nextIndex + 1) % updatedPlayers.length;
            attempts++;
        }

        if (attempts === updatedPlayers.length) {
            console.error("No eligible players with a non-zero balance!");
            return; // Exit if all players have balance 0
        }

        // Set the next player's choice to "thinking"
        updatedPlayers[nextIndex] = {
            ...updatedPlayers[nextIndex],
            choice: "thinking"
        };

        // Update state
        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextIndex);
    };

    const setPlayerBalance = (index: number, balance: number) => {
        setPlayers(prev =>
            prev.map(player =>
                player.index === index
                    ? { ...player, balance: balance, choice: balance === 0 ? "fold" : player.choice } // Automatically set "fold" if balance is 0
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
            choice: "fold"
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
            choice: "thinking"
        };

        // Update state
        setPlayers(updatedPlayers);
        setCurrentPlayerIndex(nextIndex);
    };

    // Start the thinking process when the game starts
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
                changeToThinkingBeforeTimeout
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
