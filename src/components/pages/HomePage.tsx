import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Gaming Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover amazing games and start playing today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;