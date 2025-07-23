import { useState, useRef, useEffect } from 'react';
import { History, Trophy, BarChart, X, GripVertical } from 'lucide-react';
import { ProfitGraph } from '../ProfitGraph/ProfitGraph';

interface AnalyticsPanelProps {
  totalProfit: number;
  totalWins: number;
  totalLosses: number;
  betHistory: Array<{
    multiplier: number;
    betAmount: number;
    profit: number;
    isWin: boolean;
    timestamp: number;
  }>;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

const MIN_PANEL_WIDTH = 320;
const MIN_PANEL_HEIGHT = 400;

export function AnalyticsPanel({
  totalProfit,
  totalWins,
  totalLosses,
  betHistory,
}: AnalyticsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(true);
  const [position, setPosition] = useState<Position>({ x: 20, y: 80 });
  const [size, setSize] = useState<Size>({ width: 320, height: 600 });
  const panelRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isResizingRef = useRef(false);
  const dragStartRef = useRef<Position>({ x: 0, y: 0 });
  const initialPosRef = useRef<Position>({ x: 0, y: 0 });
  const initialSizeRef = useRef<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - size.width, initialPosRef.current.x + dx)),
          y: Math.max(0, Math.min(window.innerHeight - size.height, initialPosRef.current.y + dy))
        });
      } else if (isResizingRef.current) {
        const width = Math.max(MIN_PANEL_WIDTH, initialSizeRef.current.width + (e.clientX - dragStartRef.current.x));
        const height = Math.max(MIN_PANEL_HEIGHT, initialSizeRef.current.height + (e.clientY - dragStartRef.current.y));
        
        setSize({ width, height });
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      isResizingRef.current = false;
    };

    if (isDraggingRef.current || isResizingRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [size.width, size.height]);

  const handleDragStart = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPosRef.current = position;
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    isResizingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialSizeRef.current = size;
  };

  const toggleDock = () => {
    setIsDocked(!isDocked);
    if (isDocked) {
      setPosition({
        x: window.innerWidth - size.width - 20,
        y: 80
      });
    }
  };

  return (
    <>
      {/* Analytics Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 bottom-4 z-50 p-3 bg-navy-800 rounded-full shadow-lg hover:bg-navy-700 transition-colors"
        title="Toggle Analytics"
      >
        <BarChart className="w-6 h-6 text-blue-500" />
      </button>

      {/* Analytics Panel */}
      <div
        ref={panelRef}
        style={{
          ...(isDocked
            ? {}
            : {
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }),
        }}
        className={`${
          isDocked
            ? 'fixed left-0 top-0 w-80 h-full'
            : 'fixed'
        } bg-navy-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? (isDocked ? 'translate-x-0' : '') : (isDocked ? '-translate-x-full' : 'hidden')
        }`}
      >
        <div
          className={`absolute inset-0 flex flex-col ${isDocked ? 'pt-20' : 'pt-10'}`}
        >
          {/* Header */}
          <div
            className="px-4 py-2 cursor-move flex items-center justify-between bg-navy-700"
            onMouseDown={!isDocked ? handleDragStart : undefined}
          >
            <div className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold">Analytics</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDock}
                className="p-1.5 hover:bg-navy-600 rounded-lg transition-colors"
                title={isDocked ? "Undock" : "Dock to left"}
              >
                <GripVertical className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-navy-600 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-navy-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Total Profit</div>
                  <div
                    className={`text-xl font-bold ${
                      totalProfit >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    ${totalProfit.toFixed(2)}
                  </div>
                </div>
                <div className="bg-navy-700 rounded-lg p-4">
                  <div className="text-sm text-gray-400">Win Loss</div>
                  <div className="text-xl font-bold">
                    {totalWins}/{totalLosses}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Profit Graph
                </h3>
                <div className="w-full aspect-[2/1]">
                  <ProfitGraph betHistory={betHistory} />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Recent Bets
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {betHistory
                    .slice()
                    .reverse()
                    .map((bet, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded ${
                          bet.isWin ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <div>
                          <div className="text-sm font-bold">
                            {bet.multiplier.toFixed(2)}×
                          </div>
                          <div className="text-xs text-gray-400">
                            ${bet.betAmount.toFixed(2)} bet
                          </div>
                        </div>
                        <div
                          className={`text-sm font-bold ${
                            bet.isWin ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {bet.profit >= 0 ? '+' : ''}
                          {bet.profit.toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resize handle (only when undocked) */}
          {!isDocked && (
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={handleResizeStart}
            >
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Overlay (only when docked) */}
      {isOpen && isDocked && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}