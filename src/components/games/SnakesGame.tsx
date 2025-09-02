import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { Footer } from '../Footer';
import { useGameStore } from '../../../snakes/src/store/gameStore';
import GameGrid from '../../../snakes/src/components/GameGrid';
import GameControls from '../../../snakes/src/components/GameControls';
import StatusBar from '../../../snakes/src/components/StatusBar';
import GameHistory from '../../../snakes/src/components/GameHistory';

export default function SnakesGame() {
  const { user, wallet } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F1A] via-[#1a2332] to-[#0B0F1A] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Game Controls */}
          <div className="lg:col-span-1 space-y-6">
            <StatusBar />
            <GameControls />
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2">
            <GameGrid />
          </div>

          {/* Right Sidebar - Game History */}
          <div className="lg:col-span-1">
            <GameHistory />
          </div>
        </div>

        {/* Game Info Section */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm p-6 border border-slate-600/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-6 text-blue-400">🐍</div>
            <h3 className="text-xl font-bold text-white">How to Play Cosmic Snakes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 p-4 border border-slate-600/50">
              <h4 className="font-bold text-blue-400 mb-2">Game Rules</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Set your bet and snake count</li>
                <li>• Roll dice to move 1-3 steps</li>
                <li>• Avoid snakes on the path</li>
                <li>• Cash out anytime for current multiplier</li>
                <li>• Reach the end for maximum reward</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 p-4 border border-slate-600/50">
              <h4 className="font-bold text-green-400 mb-2">Strategy Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Start with fewer snakes</li>
                <li>• Cash out early for safety</li>
                <li>• More snakes = higher multipliers</li>
                <li>• Watch your position carefully</li>
                <li>• Don't get too greedy</li>
              </ul>
            </div>
            <div className="bg-slate-700/50 p-4 border border-slate-600/50">
              <h4 className="font-bold text-purple-400 mb-2">Risk Levels</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Low (1-5 snakes): Safe play</li>
                <li>• Medium (6-15 snakes): Balanced</li>
                <li>• High (16+ snakes): High risk/reward</li>
                <li>• Each safe step increases multiplier</li>
                <li>• Maximum potential: 25x+</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}