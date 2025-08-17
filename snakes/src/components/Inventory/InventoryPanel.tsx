import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Package, X } from 'lucide-react';

const InventoryPanel: React.FC = () => {
  const { state, useItem } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleItemUse = (itemId: string) => {
    useItem(itemId);
  };
  
  const getItemTypeIcon = (type: string) => {
    switch (type) {
      case 'key': return '🔑';
      case 'weapon': return '🗡️';
      case 'health': return '💊';
      case 'light': return '🔦';
      case 'artifact': return '🏺';
      default: return '📦';
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className="fixed right-4 top-16 z-20 bg-gray-800 hover:bg-gray-700 text-amber-400 p-2 rounded-full shadow-lg border border-amber-600 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Package className="h-6 w-6" />}
      </button>
      
      {/* Inventory panel */}
      <div className={`fixed top-0 right-0 h-full w-72 bg-gray-900 border-l border-amber-600 z-10 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto pt-16 pb-36`}>
        <div className="p-4">
          <h2 className="text-xl font-serif text-amber-400 mb-4 border-b border-gray-700 pb-2">Inventory</h2>
          
          {state.player.inventory.length === 0 ? (
            <p className="text-gray-400 italic">Your inventory is empty.</p>
          ) : (
            <div className="space-y-2">
              {state.player.inventory.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-gray-800 border border-gray-700 rounded p-2 hover:bg-gray-700 transition-colors cursor-pointer group"
                  onClick={() => handleItemUse(item.id)}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-2xl">{getItemTypeIcon(item.type)}</div>
                    <div className="flex-1">
                      <h3 className="text-amber-400 font-medium">{item.name}</h3>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                      {item.type === 'health' && (
                        <span className="text-xs text-green-500 mt-1 block">Restores {item.value} health (click to use)</span>
                      )}
                      {item.type === 'light' && (
                        <span className="text-xs text-blue-400 mt-1 block">Increases visibility (click to use)</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InventoryPanel;