export enum PlayerStatus {
    Idle = 0,
    Turn = 1,
    Fold = 2,
    AllIn = 3
}

// types.ts
export interface Player {
    index: number; // Unique identifier for the player
    balance: number; // Player's current balance
    status: PlayerStatus; // Player's current choice (e.g., "fold", "call")
    pot: number; // Player's contribution to the pot
    place: number; // Player's position/place in the game
}

export interface PlayerContextType {
    players: Player[];
    updatePlayer: (index: number, updatedPlayer: Player) => void;
    setPlayerBalance: (index: number, balance: number) => void;
    setPlayerPot: (index: number, balance: number) => void;
    handleStatusChange: (index: number, choice: number, updatedPlayers: Player[]) => void;
    moveToNextPlayer: (index: number, updatedPlayers: Player[]) => void;
    changeToThinkingBeforeTimeout: () => void;
    currentDealerIndex: number;
    currentPlayerIndex: number;
}
