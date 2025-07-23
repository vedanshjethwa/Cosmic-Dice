import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Room as RoomType } from '../../types';
import { Lock, DoorOpen, SkullIcon, AlertTriangle } from 'lucide-react';

interface RoomProps {
  room: RoomType;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  const { enterRoom } = useGame();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleRoomClick = () => {
    enterRoom(room.id);
  };
  
  const getDangerLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Low Risk';
      case 2: return 'Caution';
      case 3: return 'Dangerous';
      case 4: return 'Very Dangerous';
      case 5: return 'Extremely Dangerous';
      default: return 'Safe';
    }
  };
  
  const getDangerColor = (level: number) => {
    switch (level) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-yellow-600';
      case 3: return 'text-orange-500';
      case 4: return 'text-red-500';
      case 5: return 'text-red-700';
      default: return 'text-green-500';
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg border-2 ${
        room.isVisited 
          ? 'border-amber-600' 
          : room.isLocked 
            ? 'border-gray-700' 
            : 'border-gray-600'
      } transition-all duration-300 h-64 cursor-pointer group`}
      onClick={handleRoomClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Room background with parallax effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center h-full w-full transition-transform duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`} 
        style={{ 
          backgroundImage: `url(${room.imageUrl})`,
          filter: room.isVisited ? 'none' : 'brightness(0.4) grayscale(50%)',
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
      
      {/* Room status indicators */}
      <div className="absolute top-2 right-2 flex gap-2">
        {room.isLocked && (
          <div className="bg-gray-900 bg-opacity-75 p-1 rounded-full">
            <Lock className="h-5 w-5 text-red-500" />
          </div>
        )}
        {room.isDangerous && (
          <div className="bg-gray-900 bg-opacity-75 p-1 rounded-full">
            <SkullIcon className={`h-5 w-5 ${getDangerColor(room.dangerLevel)}`} />
          </div>
        )}
        {room.isVisited && (
          <div className="bg-gray-900 bg-opacity-75 p-1 rounded-full">
            <DoorOpen className="h-5 w-5 text-amber-400" />
          </div>
        )}
      </div>
      
      {/* Room info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 bg-opacity-80 transition-all duration-300 group-hover:bg-opacity-90">
        <h3 className="text-lg font-serif text-amber-400 mb-1">{room.name}</h3>
        
        {room.isDangerous && (
          <div className={`flex items-center gap-1 text-sm ${getDangerColor(room.dangerLevel)}`}>
            <AlertTriangle className="h-3 w-3" />
            <span>{getDangerLevelText(room.dangerLevel)}</span>
          </div>
        )}
        
        <p className="text-gray-300 text-sm mt-1 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {room.description}
        </p>
      </div>
      
      {/* Hover effect - light glow */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
        isHovered ? 'opacity-20' : 'opacity-0'
      }`} style={{ 
        background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.8) 0%, transparent 70%)'
      }}></div>
    </div>
  );
};

export default Room;