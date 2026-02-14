import React, { useRef, useState, useEffect } from 'react';

/**
 * Joystick Component
 * Mobile-friendly on-screen joystick for hamster movement
 * Supports touch and drag interactions
 */
const Joystick = ({ onMove }) => {
  const joystickRef = useRef(null);
  const knobRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const lastMoveTimeRef = useRef(0);

  // Joystick settings
  const MAX_DISTANCE = 40; // Maximum knob distance from center (pixels)
  const MOVE_THRESHOLD = 10; // Minimum distance to trigger movement
  const MOVE_DELAY = 50; // Milliseconds between movements (reduced for smoother movement)

  /**
   * Calculate joystick direction and trigger movement
   * Throttled to prevent too-frequent movement
   */
  const updateMovement = (x, y) => {
    // Throttle movement - only move every MOVE_DELAY milliseconds
    const now = Date.now();
    if (now - lastMoveTimeRef.current < MOVE_DELAY) {
      return; // Skip this movement, too soon since last move
    }

    // Calculate angle and distance
    const distance = Math.sqrt(x * x + y * y);

    if (distance < MOVE_THRESHOLD) {
      // Too close to center, no movement
      return;
    }

    // Update last move time
    lastMoveTimeRef.current = now;

    // Normalize to get direction
    const angle = Math.atan2(y, x);

    // Determine primary direction (8-way movement)
    let direction = null;
    const angleDeg = (angle * 180 / Math.PI + 360) % 360;

    // Convert angle to direction
    if (angleDeg >= 337.5 || angleDeg < 22.5) {
      direction = 'right';
    } else if (angleDeg >= 22.5 && angleDeg < 67.5) {
      direction = 'down-right';
    } else if (angleDeg >= 67.5 && angleDeg < 112.5) {
      direction = 'down';
    } else if (angleDeg >= 112.5 && angleDeg < 157.5) {
      direction = 'down-left';
    } else if (angleDeg >= 157.5 && angleDeg < 202.5) {
      direction = 'left';
    } else if (angleDeg >= 202.5 && angleDeg < 247.5) {
      direction = 'up-left';
    } else if (angleDeg >= 247.5 && angleDeg < 292.5) {
      direction = 'up';
    } else if (angleDeg >= 292.5 && angleDeg < 337.5) {
      direction = 'up-right';
    }

    if (direction) {
      onMove(direction);
    }
  };

  /**
   * Handle touch/mouse start
   */
  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
  };

  /**
   * Handle touch/mouse move
   */
  const handleMove = (clientX, clientY) => {
    if (!isDragging && !joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate offset from center
    let offsetX = clientX - centerX;
    let offsetY = clientY - centerY;

    // Limit to max distance
    const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
    if (distance > MAX_DISTANCE) {
      const angle = Math.atan2(offsetY, offsetX);
      offsetX = Math.cos(angle) * MAX_DISTANCE;
      offsetY = Math.sin(angle) * MAX_DISTANCE;
    }

    setPosition({ x: offsetX, y: offsetY });

    // Trigger movement callback
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      updateMovement(offsetX, offsetY);
    });
  };

  /**
   * Handle touch/mouse end
   */
  const handleEnd = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleEnd();
  };

  // Mouse event handlers (for testing on desktop)
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Global mouse up listener when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className="fixed bottom-6 right-6 z-50 touch-none">
      {/* Joystick base */}
      <div
        ref={joystickRef}
        className="relative w-32 h-32 bg-gray-800/40 backdrop-blur-sm rounded-full shadow-2xl border-4 border-gray-600/50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Center indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full" />

        {/* Directional guides */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-2 text-white/30 text-xs font-bold">↑</div>
          <div className="absolute bottom-2 text-white/30 text-xs font-bold">↓</div>
          <div className="absolute left-2 text-white/30 text-xs font-bold">←</div>
          <div className="absolute right-2 text-white/30 text-xs font-bold">→</div>
        </div>

        {/* Joystick knob */}
        <div
          ref={knobRef}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg border-4 border-white/50 transition-transform ${
            isDragging ? 'scale-110' : 'scale-100'
          }`}
          style={{
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) ${
              isDragging ? 'scale(1.1)' : 'scale(1)'
            }`,
          }}
        >
          {/* Knob center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 rounded-full" />
        </div>

        {/* Active indicator ring */}
        {isDragging && (
          <div className="absolute inset-0 rounded-full border-4 border-pink-400 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default Joystick;
