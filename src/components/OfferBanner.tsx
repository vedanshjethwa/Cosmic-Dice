import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gift, Star, Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Offer {
  id: number;
  category: string;
  title: string;
  description: string;
  buttonText: string;
  categoryColor: string;
  buttonColor: string;
  icon: React.ReactNode;
  image: string;
}

export function OfferBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const offers: Offer[] = [
    {
      id: 1,
      category: 'COSMIC',
      title: 'Get 10% free on your first recharge',
      description: 'New players get instant bonus on first deposit',
      buttonText: 'Claim Now',
      categoryColor: 'bg-blue-600',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      icon: <Gift className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 2,
      category: 'SPECIAL',
      title: 'Earn 2x points this weekend',
      description: 'Double rewards on all weekend gaming sessions',
      buttonText: 'Claim Now',
      categoryColor: 'bg-purple-600',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      icon: <Star className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 3,
      category: 'LIMITED',
      title: 'Exclusive 50% off on all games',
      description: 'Limited time offer for premium gaming experience',
      buttonText: 'Claim Now',
      categoryColor: 'bg-orange-600',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      icon: <Clock className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&q=80&w=400&h=200'
    },
    {
      id: 4,
      category: 'GIVEAWAY',
      title: 'Win a free game every week',
      description: 'Weekly giveaway for active players',
      buttonText: 'Claim Now',
      categoryColor: 'bg-green-600',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      icon: <Zap className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=200'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(offers.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(offers.length / 4)) % Math.ceil(offers.length / 4));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        {Array.from({ length: 20 }).map((_, i) => (
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

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-bold text-white">Featured Offers</h2>
          </div>
          <button className="text-blue-200 hover:text-white transition-colors flex items-center gap-2 text-lg font-medium">
            View All →
          </button>
        </div>

        {/* Offers Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {/* Category Badge */}
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`${offer.categoryColor} text-white px-3 py-1 text-sm font-bold flex items-center gap-2`}>
                        {offer.icon}
                        {offer.category}
                      </span>
                    </div>
                    
                    {/* Offer Image */}
                    <div className="h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent" />
                      
                      {/* Offer Icon */}
                      <div className="absolute bottom-4 right-4">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white">
                          <span className="text-2xl">🎁</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                      {offer.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {offer.description}
                    </p>
                    
                    {/* Claim Button */}
                    <button className={`w-full ${offer.buttonColor} text-white py-3 font-bold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0`}>
                      {offer.buttonText}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(offers.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}