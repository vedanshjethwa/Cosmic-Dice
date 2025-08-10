import React from 'react';
import { Gamepad2, TrendingUp, Gift, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to GameHub</h1>
            <p className="text-xl opacity-90">Play, Win, and Enjoy Amazing Games</p>
          </div>
        </div>
      </div>

      {/* Featured Games Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <TrendingUp className="mr-2" />
          Featured Games
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Game Cards */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Gamepad2 className="text-purple-400 mr-3" size={24} />
              <h3 className="text-white font-semibold">Rock Paper Scissors</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">Classic game with modern twist</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Gamepad2 className="text-blue-400 mr-3" size={24} />
              <h3 className="text-white font-semibold">Dice Game</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">Roll the dice and win big</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Play Now
            </button>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300">
            <div className="flex items-center mb-4">
              <Gamepad2 className="text-green-400 mr-3" size={24} />
              <h3 className="text-white font-semibold">Card Game</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">Strategic card battles</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
              Play Now
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center text-white">
            <Users className="mx-auto mb-2 text-purple-400" size={32} />
            <h3 className="text-2xl font-bold">10,000+</h3>
            <p className="text-gray-300">Active Players</p>
          </div>
          
          <div className="text-center text-white">
            <Gift className="mx-auto mb-2 text-blue-400" size={32} />
            <h3 className="text-2xl font-bold">$50,000+</h3>
            <p className="text-gray-300">Prizes Won</p>
          </div>
          
          <div className="text-center text-white">
            <Gamepad2 className="mx-auto mb-2 text-green-400" size={32} />
            <h3 className="text-2xl font-bold">15+</h3>
            <p className="text-gray-300">Games Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;