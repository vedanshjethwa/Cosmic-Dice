import React from 'react';
import { useGame } from '../../context/GameContext';
import Room from '../Room/Room';
import { Floor as FloorType } from '../../types';

interface FloorProps {
  floor: FloorType;
  index: number;
}

const Floor: React.FC<FloorProps> = ({ floor, index }) => {
  const { state, changeFloor } = useGame();
  const { currentFloor } = state;
  const isActive = currentFloor === index;

  const handleFloorClick = () => {
    if (!floor.isLocked) {
      changeFloor(index);
    }
  };

  if (!isActive) {
    return (
      <div 
        className={`mb-4 p-4 rounded-lg cursor-pointer transition-all ${
          floor.isLocked 
            ? 'bg-gray-800 opacity-50 pointer-events-none' 
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
        onClick={handleFloorClick}
      >
        <h2 className="text-xl font-serif text-amber-400">
          {floor.isLocked && (
            <span className="mr-2 text-red-500">🔒</span>
          )}
          Floor {floor.level}: {floor.name}
        </h2>
      </div>
    );
  }

  return (
    <div className="mb-8 animate-fadeIn">
      <h2 className="text-2xl font-serif text-amber-400 mb-4">Floor {floor.level}: {floor.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {floor.rooms.map(room => (
          <Room key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Floor;