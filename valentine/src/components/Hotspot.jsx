import React from 'react';

/**
 * Icon components for different hotspot types
 */
const Icons = {
  heart: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  gift: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
  ),
  envelope: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  star: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  flower: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z" />
    </svg>
  )
};

/**
 * Hotspot Component
 * Clickable area on the scene that reveals a clue
 * Only visible when hamster is nearby (isNearby prop)
 */
const Hotspot = ({ clue, onClick, isFound, isNearby }) => {
  const Icon = Icons[clue.iconType] || Icons.heart;

  // Hidden until hamster is nearby
  if (!isNearby && !isFound) {
    return null;
  }

  return (
    <button
      onClick={() => onClick(clue)}
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
        isFound ? 'opacity-50 scale-90 cursor-default' : 'hover:scale-110 cursor-pointer animate-fadeIn'
      }`}
      style={{
        left: `${clue.x}%`,
        top: `${clue.y}%`,
      }}
      disabled={isFound}
      aria-label={`Clue ${clue.id}${isFound ? ' - Already found' : ' - Click to reveal'}`}
    >
      {/* Outer pulse ring - only visible when not found */}
      {!isFound && (
        <>
          <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-75" />
          <div className="absolute inset-0 rounded-full bg-pink-300 animate-pulse" />
        </>
      )}

      {/* Icon container */}
      <div
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isFound
            ? 'bg-gray-300 text-gray-500'
            : 'bg-gradient-to-br from-pink-400 to-rose-500 text-white group-hover:shadow-xl group-hover:from-pink-500 group-hover:to-rose-600'
        }`}
      >
        {isFound ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        ) : (
          Icon
        )}
      </div>

      {/* Sparkle effect on hover */}
      {!isFound && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce" />
      )}

    </button>
  );
};

export default Hotspot;
