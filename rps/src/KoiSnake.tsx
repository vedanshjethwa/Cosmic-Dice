import React, { useState, useEffect, useCallback } from 'react';
import { Fish, Trophy, Gamepad2 } from 'lucide-react';

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

function KoiSnake() {
  const GRID_SIZE = 20;
  const GAME_SPEED = 150;
  const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood();
    setIsPaused(false);
  };

  const checkCollision = (head: Position) => {
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    for (const segment of snake.slice(1)) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }

    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    const head = { ...snake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    const newSnake = [head, ...snake];

    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isPaused, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsPaused(p => !p);
        return;
      }

      if (gameOver) {
        resetGame();
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const renderCell = (x: number, y: number) => {
    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    const isHead = snake[0].x === x && snake[0].y === y;

    return (
      <div
        key={`${x}-${y}`}
        className={`w-full h-full rounded-sm transition-colors duration-100 border border-[#2D3748] ${
          isHead
            ? 'bg-[#FFB800]'
            : isSnake
            ? 'bg-[#FFC933]'
            : isFood
            ? 'bg-red-500'
            : 'bg-[#1F2937]'
        }`}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#0D1117] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Fish className="w-8 h-8 text-[#FFB800]" />
            Koi Snake
            <Fish className="w-8 h-8 text-[#FFB800]" />
          </h1>
          <div className="flex justify-center gap-8 text-white mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FFB800]" />
              Score: {score}
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-[#FFB800]" />
              High Score: {highScore}
            </div>
          </div>
        </div>

        <div className="relative bg-[#0D1117] rounded-lg p-2 shadow-xl aspect-square border border-[#2D3748]">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              return renderCell(x, y);
            })}
          </div>

          {(gameOver || isPaused) && (
            <div className="absolute inset-0 bg-[#0D1117]/90 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {gameOver ? 'Game Over!' : 'Paused'}
                </h2>
                <p className="mb-4">
                  {gameOver
                    ? `Final Score: ${score}`
                    : 'Press Space to resume'}
                </p>
                {gameOver && (
                  <button
                    onClick={resetGame}
                    className="bg-[#FFB800] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#FFC933] transition-colors"
                  >
                    Play Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p className="text-lg mb-2">How to Play:</p>
          <p>Use arrow keys to move • Space to pause • Collect red food to grow</p>
        </div>
      </div>
    </div>
  );
}

export default KoiSnake;