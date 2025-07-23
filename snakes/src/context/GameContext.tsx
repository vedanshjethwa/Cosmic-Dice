import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Room, Item } from '../types';
import { initialGameState } from '../data/gameData';

// Define action types
type GameAction =
  | { type: 'ENTER_ROOM'; roomId: string }
  | { type: 'CHANGE_FLOOR'; floorIndex: number }
  | { type: 'COLLECT_ITEM'; item: Item }
  | { type: 'USE_ITEM'; itemId: string }
  | { type: 'TAKE_DAMAGE'; amount: number }
  | { type: 'RESTORE_HEALTH'; amount: number }
  | { type: 'LOSE_SANITY'; amount: number }
  | { type: 'RESTORE_SANITY'; amount: number }
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'SPEND_COINS'; amount: number }
  | { type: 'ADD_MESSAGE'; message: string }
  | { type: 'GAME_OVER' }
  | { type: 'GAME_WIN' }
  | { type: 'RESET_GAME' };

// Create context
interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  enterRoom: (roomId: string) => void;
  changeFloor: (floorIndex: number) => void;
  collectItem: (item: Item) => void;
  useItem: (itemId: string) => void;
  takeDamage: (amount: number) => void;
  restoreHealth: (amount: number) => void;
  loseSanity: (amount: number) => void;
  restoreSanity: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => void;
  addMessage: (message: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

// Game reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ENTER_ROOM': {
      const currentFloorData = state.floors[state.currentFloor];
      const roomIndex = currentFloorData.rooms.findIndex(room => room.id === action.roomId);
      
      if (roomIndex === -1) return state;
      
      const room = currentFloorData.rooms[roomIndex];
      
      // Check if room is locked and player has required items
      if (room.isLocked && room.requires) {
        const hasRequiredItems = room.requires.every(itemId => 
          state.player.inventory.some(item => item.id === itemId)
        );
        
        if (!hasRequiredItems) {
          return {
            ...state,
            messageLog: [...state.messageLog, `The ${room.name} is locked. You need specific items to enter.`]
          };
        }
      }
      
      // Update room to visited
      const updatedRooms = [...currentFloorData.rooms];
      updatedRooms[roomIndex] = {
        ...room,
        isVisited: true,
      };
      
      // Update floors
      const updatedFloors = [...state.floors];
      updatedFloors[state.currentFloor] = {
        ...currentFloorData,
        rooms: updatedRooms,
      };
      
      // Process room rewards if any
      let updatedInventory = [...state.player.inventory];
      let message = `You have entered the ${room.name}.`;
      
      if (room.rewards && !room.isVisited) {
        message += ` You found some items!`;
        room.rewards.forEach(itemId => {
          const itemToAdd = initialGameState.floors
            .flatMap(f => f.rooms)
            .flatMap(r => r.rewards || [])
            .find(id => id === itemId);
          
          if (itemToAdd) {
            // This is simplified - in a real implementation, you'd have a proper items database
            const newItem = { 
              id: itemId, 
              name: itemId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
              description: `A ${itemId.replace('_', ' ')}.`,
              type: 'key' as const,
              value: 1
            };
            updatedInventory.push(newItem);
          }
        });
      }
      
      // Apply danger effects
      let healthChange = 0;
      let sanityChange = 0;
      
      if (room.isDangerous && !room.isVisited) {
        healthChange = -5 * room.dangerLevel;
        sanityChange = -3 * room.dangerLevel;
        message += ` This room feels dangerous...`;
      }
      
      return {
        ...state,
        floors: updatedFloors,
        player: {
          ...state.player,
          health: Math.max(0, state.player.health + healthChange),
          sanity: Math.max(0, state.player.sanity + sanityChange),
          inventory: updatedInventory,
          visitedRooms: [...state.player.visitedRooms, room.id],
        },
        messageLog: [...state.messageLog, message],
        isGameOver: state.player.health + healthChange <= 0,
      };
    }
    
    case 'CHANGE_FLOOR': {
      if (action.floorIndex < 0 || action.floorIndex >= state.floors.length) {
        return state;
      }
      
      const targetFloor = state.floors[action.floorIndex];
      
      if (targetFloor.isLocked) {
        return {
          ...state,
          messageLog: [...state.messageLog, `The ${targetFloor.name} is locked. You need to complete the current floor first.`]
        };
      }
      
      return {
        ...state,
        currentFloor: action.floorIndex,
        messageLog: [...state.messageLog, `You have moved to ${targetFloor.name}.`]
      };
    }
    
    case 'COLLECT_ITEM': {
      return {
        ...state,
        player: {
          ...state.player,
          inventory: [...state.player.inventory, action.item],
        },
        messageLog: [...state.messageLog, `You have acquired: ${action.item.name}`]
      };
    }
    
    case 'USE_ITEM': {
      const itemIndex = state.player.inventory.findIndex(item => item.id === action.itemId);
      
      if (itemIndex === -1) return state;
      
      const item = state.player.inventory[itemIndex];
      let updatedHealth = state.player.health;
      let updatedSanity = state.player.sanity;
      let message = `You used: ${item.name}`;
      
      // Apply item effects based on type
      if (item.type === 'health') {
        updatedHealth = Math.min(100, state.player.health + item.value);
        message += ` and restored ${item.value} health.`;
      } else if (item.type === 'light') {
        updatedSanity = Math.min(100, state.player.sanity + item.value * 5);
        message += ` and feel a bit safer with the light.`;
      }
      
      // Remove item from inventory if it's consumable
      const updatedInventory = [...state.player.inventory];
      if (item.type === 'health') {
        updatedInventory.splice(itemIndex, 1);
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          health: updatedHealth,
          sanity: updatedSanity,
          inventory: updatedInventory,
        },
        messageLog: [...state.messageLog, message]
      };
    }
    
    case 'TAKE_DAMAGE': {
      const newHealth = Math.max(0, state.player.health - action.amount);
      return {
        ...state,
        player: {
          ...state.player,
          health: newHealth,
        },
        isGameOver: newHealth <= 0,
        messageLog: [...state.messageLog, `You took ${action.amount} damage!`]
      };
    }
    
    case 'RESTORE_HEALTH': {
      return {
        ...state,
        player: {
          ...state.player,
          health: Math.min(100, state.player.health + action.amount),
        },
        messageLog: [...state.messageLog, `You restored ${action.amount} health.`]
      };
    }
    
    case 'LOSE_SANITY': {
      const newSanity = Math.max(0, state.player.sanity - action.amount);
      return {
        ...state,
        player: {
          ...state.player,
          sanity: newSanity,
        },
        isGameOver: newSanity <= 0,
        messageLog: [...state.messageLog, `Your sanity decreases by ${action.amount}...`]
      };
    }
    
    case 'RESTORE_SANITY': {
      return {
        ...state,
        player: {
          ...state.player,
          sanity: Math.min(100, state.player.sanity + action.amount),
        },
        messageLog: [...state.messageLog, `Your mind feels clearer. Sanity increased by ${action.amount}.`]
      };
    }
    
    case 'ADD_COINS': {
      return {
        ...state,
        player: {
          ...state.player,
          coins: state.player.coins + action.amount,
        },
        messageLog: [...state.messageLog, `You found ${action.amount} coins.`]
      };
    }
    
    case 'SPEND_COINS': {
      if (state.player.coins < action.amount) {
        return {
          ...state,
          messageLog: [...state.messageLog, `You don't have enough coins.`]
        };
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          coins: state.player.coins - action.amount,
        },
        messageLog: [...state.messageLog, `You spent ${action.amount} coins.`]
      };
    }
    
    case 'ADD_MESSAGE': {
      return {
        ...state,
        messageLog: [...state.messageLog, action.message]
      };
    }
    
    case 'GAME_OVER': {
      return {
        ...state,
        isGameOver: true,
        messageLog: [...state.messageLog, `Game Over. The mansion has claimed another victim.`]
      };
    }
    
    case 'GAME_WIN': {
      return {
        ...state,
        isGameWon: true,
        messageLog: [...state.messageLog, `You have escaped the mansion! You win!`]
      };
    }
    
    case 'RESET_GAME': {
      return initialGameState;
    }
    
    default:
      return state;
  }
}

// Provider component
interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  
  const enterRoom = (roomId: string) => {
    dispatch({ type: 'ENTER_ROOM', roomId });
  };
  
  const changeFloor = (floorIndex: number) => {
    dispatch({ type: 'CHANGE_FLOOR', floorIndex });
  };
  
  const collectItem = (item: Item) => {
    dispatch({ type: 'COLLECT_ITEM', item });
  };
  
  const useItem = (itemId: string) => {
    dispatch({ type: 'USE_ITEM', itemId });
  };
  
  const takeDamage = (amount: number) => {
    dispatch({ type: 'TAKE_DAMAGE', amount });
  };
  
  const restoreHealth = (amount: number) => {
    dispatch({ type: 'RESTORE_HEALTH', amount });
  };
  
  const loseSanity = (amount: number) => {
    dispatch({ type: 'LOSE_SANITY', amount });
  };
  
  const restoreSanity = (amount: number) => {
    dispatch({ type: 'RESTORE_SANITY', amount });
  };
  
  const addCoins = (amount: number) => {
    dispatch({ type: 'ADD_COINS', amount });
  };
  
  const spendCoins = (amount: number) => {
    dispatch({ type: 'SPEND_COINS', amount });
  };
  
  const addMessage = (message: string) => {
    dispatch({ type: 'ADD_MESSAGE', message });
  };
  
  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };
  
  return (
    <GameContext.Provider value={{
      state,
      dispatch,
      enterRoom,
      changeFloor,
      collectItem,
      useItem,
      takeDamage,
      restoreHealth,
      loseSanity,
      restoreSanity,
      addCoins,
      spendCoins,
      addMessage,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  
  return context;
};