import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ScratchCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScratchCard({ isOpen, onClose }: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [reward] = useState(() => {
    // Random reward between ₹10 and ₹20
    return Math.floor(Math.random() * 11) + 10;
  });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up initial scratch layer
    ctx.fillStyle = 'linear-gradient(45deg, #silver, #golden)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle cosmic pattern
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for (let i = 0; i < canvas.width; i += 30) {
      for (let j = 0; j < canvas.height; j += 30) {
        ctx.fillText('✧', i, j);
      }
    }

    // Add faint Cosmic text
    ctx.font = '24px Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.textAlign = 'center';
    ctx.fillText('Cosmic', canvas.width / 2, canvas.height / 2);
  }, [isOpen]);

  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) transparentPixels++;
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchedPercentage(percentage);

    if (percentage > 60 && !isScratched) {
      setIsScratched(true);
      new Audio('/scratch-sound.mp3').play().catch(() => {});
    }
  };

  const handleClose = () => {
    if (!isClaimed && isScratched) {
      setShowWarning(true);
      return;
    }
    onClose();
  };

  const handleClaim = () => {
    setIsClaimed(true);
    // Add reward to wallet logic here
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl w-full max-w-md relative overflow-hidden border border-golden/20">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent animate-pulse">
            Scratch to Reveal Your Reward
          </h2>

          <div className="relative aspect-[2/1] mb-6">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="w-full h-full rounded-lg cursor-pointer"
              onMouseDown={() => setIsDrawing(true)}
              onMouseUp={() => setIsDrawing(false)}
              onMouseMove={(e) => isDrawing && handleScratch(e)}
              onTouchStart={() => setIsDrawing(true)}
              onTouchEnd={() => setIsDrawing(false)}
              onTouchMove={(e) => isDrawing && handleScratch(e)}
            />
            
            {isScratched && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                <div className="text-3xl font-bold text-green-400">
                  You Won ₹{reward} Bonus!
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-gray-400 mb-4">
            You have 1 scratch left
          </div>

          {isScratched && !isClaimed && (
            <button
              onClick={handleClaim}
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-lg py-3 px-4 font-medium hover:from-[#FFA500] hover:to-[#FFD700] transition-all duration-300"
            >
              Claim Reward
            </button>
          )}

          {isClaimed && (
            <div className="text-center text-green-400 animate-bounce">
              Reward Added to Wallet! ✨
            </div>
          )}
        </div>

        {showWarning && (
          <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-6">
            <div className="text-center">
              <p className="text-red-400 mb-4">
                You will lose the reward if you don't claim it!
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowWarning(false)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
                >
                  Close Anyway
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}