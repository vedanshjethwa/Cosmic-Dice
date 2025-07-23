import React, { useEffect, useState } from 'react';
import { MessageSquare, Star, Send } from 'lucide-react';
export function maskUsername(username: string): string {
  if (!username) return '';
  if (username.length <= 3) return username + '***';
  return username.slice(0, -3) + '***';
}
interface Feedback {
  id: string;
  created_at: string;
  username: string;
  review: string;
  rating: number;
}

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [review, setReview] = useState('');
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const fetchFeedback = async () => {
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review.trim()) {
      return;
    }

    if (!username.trim()) {
      return;
    }

    setLoading(true);
    setSubmitStatus('submitting');

    try {
      setSubmitStatus('success');
      setReview('');
      setUsername('');
      setRating(5);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen text-white">
      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            <h1 className="text-4xl font-bold">Feedback about us</h1>
          </div>
          <p className="text-[#8899AC] text-lg">
            At Cosmic777.com, we take pride in providing a fair, secure, and
            innovative gaming experience for our players. Your feedback helps us
            improve and continue delivering the best experience possible. We
            appreciate every review you share!{' '}
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-[#131E2B] rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-2">
            Help Us Improve Your Experience
          </h2>
          <p className="text-[#8899AC] mb-8">
            Leave your impression of Cosmic777 and get rewarded for your
            valuable feedback
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#8899AC] mb-2"
              >
                Your Name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B1622] rounded-xl border border-[#1a2634] focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-white"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-[#8899AC] mb-2"
              >
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className={`p-2 rounded-lg transition-all ${
                      rating >= value ? 'text-yellow-400' : 'text-[#1a2634]'
                    }`}
                  >
                    <Star
                      className="w-6 h-6"
                      fill={rating >= value ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="review"
                className="block text-sm font-medium text-[#8899AC] mb-2"
              >
                Your Feedback
              </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full h-[120px] px-4 py-3 bg-[#0B1622] rounded-xl border border-[#1a2634] focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none resize-none text-white"
                placeholder="Share your experience of using Cosmic777"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-500/10 text-green-400 px-4 py-3 rounded-xl">
                Your feedback has been submitted successfully! Thank you for sharing your experience.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-xl">
                There was an error submitting your feedback. Please try again.
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#3B82F6] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                {loading ? 'Submitting...' : 'Leave a review'}
              </button>
            </div>
          </form>
        </div>

        {/* Feedback Display */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Feedback from our players</h2>
          <div className="space-y-6">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-[#131E2B] rounded-xl p-6 hover:bg-[#1a2634] transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-lg font-semibold">
                      {feedback.username[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#8899AC]">
                        {maskUsername(feedback.username)}
                      </h3>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: feedback.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#8899AC]">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[#8899AC] leading-relaxed">
                  {feedback.review}
                </p>
              </div>
            ))}
            {feedbacks.length === 0 && (
              <div className="text-center text-[#8899AC] py-12 bg-[#131E2B] rounded-xl">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-400 opacity-50" />
                <p className="text-xl">
                  No feedback yet. Be the first to leave a review!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;