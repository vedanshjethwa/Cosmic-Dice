import React from 'react';
import { useGame } from '../../context/GameContext';
import { ArrowUp, ArrowDown } from 'lucide-react';

const FloorNavigation: React.FC = () => {
  const { state, changeFloor } = useGame();
  const { currentFloor, floors } = state;
  
  const goToNextFloor = () => {
    if (currentFloor < floors.length - 1 && !floors[currentFloor + 1].isLocked) {
      changeFloor(currentFloor + 1);
    }
  };
  
  const goToPreviousFloor = () => {
    if (currentFloor > 0) {
      changeFloor(currentFloor - 1);
    }
  };
  
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
      <button
        className={`bg-gray-800 border border-amber-600 p-2 rounded-full shadow-md transition-all ${
          currentFloor < floors.length - 1 && !floors[currentFloor + 1].isLocked
            ? 'hover:bg-gray-700 text-amber-400'
            : 'opacity-50 cursor-not-allowed text-gray-500'
        }`}
        onClick={goToNextFloor}
        disabled={currentFloor >= floors.length - 1 || floors[currentFloor + 1].isLocked}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
      
      <div className="bg-gray-800 border border-amber-600 px-3 py-1 rounded-full text-center text-amber-400">
        {currentFloor + 1}
      </div>
      
      <button
        className={`bg-gray-800 border border-amber-600 p-2 rounded-full shadow-md transition-all ${
          currentFloor > 0
            ? 'hover:bg-gray-700 text-amber-400'
            : 'opacity-50 cursor-not-allowed text-gray-500'
        }`}
        onClick={goToPreviousFloor}
        disabled={currentFloor <= 0}
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </div>
  );
};

export default FloorNavigation;