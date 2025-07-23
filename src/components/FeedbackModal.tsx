import React, { useState } from 'react';
import { X, MessageCircle, Star, Send } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  // Sample feedback data
  const playerFeedbacks = [
    {
      id: 1,
      name: 'Player***',
      rating: 5,
      comment: 'Amazing experience! The games are fair and exciting.',
    },
    {
      id: 2,
      name: 'User***',
      rating: 4,
      comment: 'Great platform, but could use more game variety.',
    },
    {
      id: 3,
      name: 'Gamer***',
      rating: 5,
      comment: "Best gaming site I've used. Highly recommended!",
    },
    {
      id: 4,
      name: 'Guest***',
      rating: 3,
      comment: 'Good but sometimes the site loads slowly.',
    },
    {
      id: 5,
      name: 'VIP***',
      rating: 5,
      comment: 'Fantastic bonuses and excellent customer support.',
    },
    {
      id: 6,
      name: 'Newbie***',
      rating: 4,
      comment: 'Enjoying my time here so far. Easy to use interface.',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0A1929] rounded-2xl w-full max-w-2xl relative overflow-hidden border border-blue-500/20">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Feedback about us</h2>
          </div>

          <p className="text-gray-300 mb-6">
            At Cosmic777.com, we take pride in providing a fair, secure, and
            innovative gaming experience for our players. Your feedback helps us
            improve and continue delivering the best experience possible. We
            appreciate every review you share!
          </p>

          <div className="bg-blue-900/20 p-4 rounded-lg mb-6 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-2">
              Help Us Improve Your Experience
            </h3>
            <p className="text-gray-300 mb-4">
              Leave your impression of Cosmic777 and get rewarded for your
              valuable feedback
            </p>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 transition-colors ${
                      star <= rating
                        ? 'text-yellow-400 hover:text-yellow-300'
                        : 'text-gray-600 hover:text-gray-500'
                    }`}
                  >
                    <Star
                      size={28}
                      fill={star <= rating ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-black/50 text-white border border-blue-500/30 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 min-h-[100px]"
                placeholder="Share your experience of using Cosmic777"
              />
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-4 font-medium transition-colors flex items-center justify-center gap-2 mt-2"
              onClick={() => {
                // Handle feedback submission
                onClose();
              }}
            >
              <Send size={18} />
              <span>Leave a review</span>
            </button>
          </div>

          {/* Player Feedbacks */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Feedback from our players
            </h3>
            <div className="space-y-4">
              {playerFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="bg-black/30 p-3 rounded-lg border border-blue-500/10"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-blue-300">{fb.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < fb.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{fb.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
