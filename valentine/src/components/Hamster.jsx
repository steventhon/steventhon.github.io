import React from 'react';

/**
 * Hamster Component
 * The player-controlled character that explores the scene
 * Moves with WASD or Arrow keys
 */
const Hamster = ({ x, y, facing = 'right' }) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear z-30"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      aria-label="Hamster character - Use WASD or arrow keys to move"
    >
      {/* Hamster container with bounce animation */}
      <div className="relative animate-bounce-gentle">
        {/* Shadow */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm" />

        {/* Hamster emoji */}
        <div
          className={`text-5xl transform transition-transform duration-200 ${
            facing === 'left' ? 'scale-x-[-1]' : ''
          }`}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          }}
        >
          🐹
        </div>

        {/* Movement indicator (subtle glow) */}
        <div className="absolute inset-0 -z-10 animate-pulse">
          <div className="w-full h-full bg-yellow-300/30 rounded-full blur-md" />
        </div>
      </div>

    </div>
  );
};

export default Hamster;
