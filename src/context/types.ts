// types.ts
export interface Player {
    index: number; // Unique identifier for the player
    balance: number; // Player's current balance
    choice: string; // Player's current choice (e.g., "fold", "call")
    pot: number; // Player's contribution to the pot
    place: number; // Player's position/place in the game
}

export interface PlayerContextType {
    players: Player[];
    updatePlayer: (index: number, updatedPlayer: Player) => void;
    setPlayerBalance: (index: number, balance: number) => void;
    moveToNextPlayer: () => void;
    changeToThinkingBeforeTimeout: () => void;
    currentDealerIndex: number;
}
