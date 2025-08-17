import { useEffect, useRef } from 'react';

interface ProfitGraphProps {
  betHistory: Array<{
    profit: number;
    isWin: boolean;
    timestamp: number;
  }>;
}

export function ProfitGraph({ betHistory }: ProfitGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Draw profit line
    if (betHistory.length > 1) {
      // Calculate cumulative profits for scaling
      const cumulativeProfits = betHistory.reduce((acc, bet) => {
        const lastProfit = acc.length > 0 ? acc[acc.length - 1] : 0;
        acc.push(lastProfit + bet.profit);
        return acc;
      }, [] as number[]);

      const maxProfit = Math.max(...cumulativeProfits);
      const minProfit = Math.min(...cumulativeProfits);
      const profitRange = Math.max(Math.abs(maxProfit), Math.abs(minProfit));

      // Add 10% padding to the range
      const paddedRange = profitRange * 1.1;
      const scale = (height / 2) / paddedRange;

      // Draw zero line
      ctx.beginPath();
      ctx.strokeStyle = '#333333';
      ctx.setLineDash([5, 5]);
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw profit line segments
      let currentProfit = 0;
      const step = width / Math.min(50, betHistory.length);

      betHistory.slice(-50).forEach((bet, index) => {
        const prevProfit = currentProfit;
        currentProfit += bet.profit;

        const x1 = index * step;
        const x2 = (index + 1) * step;
        const y1 = height / 2 - (prevProfit * scale);
        const y2 = height / 2 - (currentProfit * scale);

        ctx.beginPath();
        ctx.strokeStyle = bet.isWin ? '#4CAF50' : '#ef4444';
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Draw profit labels
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      
      // Max profit label
      if (maxProfit > 0) {
        ctx.fillText(`+$${maxProfit.toFixed(2)}`, 10, 20);
      }
      
      // Min profit label
      if (minProfit < 0) {
        ctx.fillText(`-$${Math.abs(minProfit).toFixed(2)}`, 10, height - 10);
      }
    }
  }, [betHistory]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="w-full h-full rounded-lg bg-black"
    />
  );
}