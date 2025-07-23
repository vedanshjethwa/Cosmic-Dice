import React from 'react';
import { useGame } from '../context/GameContext';
import StatusBar from '../components/UI/StatusBar';
import MessageLog from '../components/UI/MessageLog';
import Floor from '../components/Floor/Floor';
import InventoryPanel from '../components/Inventory/InventoryPanel';
import GameOver from '../components/Game/GameOver';
import GameWin from '../components/Game/GameWin';
import FloorNavigation from '../components/Navigation/FloorNavigation';

const GamePage: React.FC = () => {
  const { state } = useGame();
  
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <StatusBar />
      
      <main className="container mx-auto p-4 pt-16 pb-36">
        <h1 className="text-4xl font-serif text-amber-400 mb-8 text-center mt-4">
          <span className="block text-xl mb-1 text-amber-600">The Haunted</span>
          Mansion of Despair
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {state.floors.map((floor, index) => (
            <Floor 
              key={floor.id} 
              floor={floor} 
              index={index} 
            />
          ))}
        </div>
      </main>
      
      <InventoryPanel />
      <FloorNavigation />
      <MessageLog />
      <GameOver />
      <GameWin />
    </div>
  );
};

export default GamePage;