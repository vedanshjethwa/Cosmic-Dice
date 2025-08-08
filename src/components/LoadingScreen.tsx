import React from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0A23] via-[#1a1a3e] to-[#0A0A23] flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Cosmic Rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-blue-500/20 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-purple-500/20 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-pink-500/20 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="text-center relative z-10 max-w-sm mx-auto px-4">
        {/* Animated Cosmic Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            className="relative inline-block"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                'drop-shadow(0 0 30px rgba(147, 51, 234, 0.6))',
                'drop-shadow(0 0 25px rgba(236, 72, 153, 0.5))',
                'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'Orbitron', sans-serif",
                backgroundSize: '200% 200%'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              COSMIC
            </motion.h1>
            
            {/* Glowing Underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mt-3"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Advanced Loading Animation */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative">
            {/* Outer Ring with Cosmic Trail */}
            <motion.div
              className="w-16 h-16 border-3 border-transparent rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8), transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle Ring */}
            <motion.div
              className="absolute inset-2 w-10 h-10 border-2 border-transparent rounded-full"
              style={{
                background: 'conic-gradient(from 180deg, transparent, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8), transparent)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Pulsing Core */}
            <motion.div
              className="absolute inset-4 w-6 h-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                  '0 0 25px rgba(147, 51, 234, 0.7)',
                  '0 0 20px rgba(236, 72, 153, 0.6)',
                  '0 0 10px rgba(59, 130, 246, 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Loading Text with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="space-y-3"
        >
          <motion.p
            className="text-gray-200 text-xl font-semibold"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>

          {/* Loading Progress Dots */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          {/* Loading percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-blue-400 font-mono text-sm"
          >
            Preparing cosmic experience...
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}