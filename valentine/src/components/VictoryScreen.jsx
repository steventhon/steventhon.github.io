import React, { useEffect, useState } from 'react';

/**
 * VictoryScreen Component
 * Displayed when all clues are found
 */
const VictoryScreen = ({ victoryData, onRestart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setIsVisible(true), 100);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Optional: Confetti effect could be added here with a library
    // or use canvas to draw confetti

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 animate-gradient" />

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float-up opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '❤️' : '💖'}
          </div>
        ))}
      </div>

      {/* Content card */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-700 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="text-center pt-8 px-6">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 mb-2">
            {victoryData.title}
          </h1>
          <div className="flex justify-center gap-2 text-3xl my-4">
            <span className="animate-pulse">✨</span>
            <span className="animate-pulse delay-100">💖</span>
            <span className="animate-pulse delay-200">✨</span>
          </div>
        </div>

        {/* Media */}
        {victoryData.mediaUrl && (
          <div className="px-6 my-6">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-pink-200">
              <img
                src={victoryData.mediaUrl}
                alt="Victory"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Message */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 p-6 rounded-2xl">
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed text-center whitespace-pre-wrap">
              {victoryData.message}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl p-4">
            <p className="text-center text-gray-700 font-medium">
              ✅ All Clues Found!
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-8 space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Play Again 🔄
          </button>

          <p className="text-center text-sm text-gray-500 pt-2">
            Made with 💕 for Valentine's Day 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default VictoryScreen;
