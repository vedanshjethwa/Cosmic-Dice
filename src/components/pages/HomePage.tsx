import { motion } from 'framer-motion';
import { GameGrid } from '../GameGrid';
import { Footer } from '../Footer';
import { OfferBanner } from '../OfferBanner';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929]">
      {/* Main Content */}
      <div className="min-h-screen">
        {/* Offer Banner */}
        <OfferBanner />
        
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Play & Win Big
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Experience the thrill of premium gaming with our collection of exciting games and massive rewards
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Playing
                </button>
                <button className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-bold transition-all duration-300 hover:scale-105">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* All Games Section */}
        <div className="bg-gradient-to-br from-[#0A1929] via-[#132F4C] to-[#0A1929] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                All Games
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Discover our complete collection of thrilling games
              </p>
            </motion.div>

            <GameGrid />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}