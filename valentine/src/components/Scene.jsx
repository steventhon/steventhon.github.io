import React, { useState, useEffect, useRef } from 'react';
import Hotspot from './Hotspot';
import Hamster from './Hamster';
import Joystick from './Joystick';

/**
 * Calculate distance between two points (in percentage coordinates)
 */
const calculateDistance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

/**
 * Detect if device is mobile/touch-enabled
 */
const isMobileDevice = () => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};

/**
 * Scene Component
 * Displays the background image, hamster character, and hotspots
 * Handles keyboard movement (WASD and Arrow keys) and mobile joystick
 * Reveals hotspots when hamster is nearby
 */
const Scene = ({ backgroundImage, clues, foundClues, onHotspotClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hamsterPos, setHamsterPos] = useState({ x: 50, y: 50 }); // Start center
  const [hamsterFacing, setHamsterFacing] = useState('right');
  const [nearbyClues, setNearbyClues] = useState(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const sceneRef = useRef(null);
  const imageRef = useRef(null);
  const moveIntervalRef = useRef(null);

  // Movement speed (percentage per keypress)
  const MOVE_SPEED = 1.5; // Reduced for smoother movement
  // Detection radius (percentage units)
  const DETECTION_RADIUS = 12;

  // Detect mobile device
  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Preload image and get dimensions
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      setImageLoaded(true);
    };
    img.onerror = () => setImageError(true);
    img.src = backgroundImage;
  }, [backgroundImage]);

  // Track container size for bounds calculation
  useEffect(() => {
    if (!sceneRef.current || !imageLoaded) return;

    const updateContainerSize = () => {
      if (sceneRef.current) {
        const rect = sceneRef.current.getBoundingClientRect();
        setContainerDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [imageLoaded]);

  /**
   * Calculate the actual bounds of the image within the container
   * (accounting for object-contain which adds letterboxing/pillarboxing)
   */
  const getImageBounds = () => {
    if (!imageDimensions.width || !containerDimensions.width) {
      return { xMin: 5, xMax: 95, yMin: 5, yMax: 95 }; // Default bounds
    }

    const imageAspect = imageDimensions.width / imageDimensions.height;
    const containerAspect = containerDimensions.width / containerDimensions.height;

    let xOffset = 0;
    let yOffset = 0;
    let imageWidthPercent = 100;
    let imageHeightPercent = 100;

    if (imageAspect > containerAspect) {
      // Image is wider - will have top/bottom letterboxing
      imageWidthPercent = 100;
      imageHeightPercent = (containerAspect / imageAspect) * 100;
      yOffset = (100 - imageHeightPercent) / 2;
    } else {
      // Image is taller - will have left/right pillarboxing
      imageHeightPercent = 100;
      imageWidthPercent = (imageAspect / containerAspect) * 100;
      xOffset = (100 - imageWidthPercent) / 2;
    }

    // Add small margin (3%) to keep hamster visually inside
    const margin = 3;
    return {
      xMin: xOffset + margin,
      xMax: xOffset + imageWidthPercent - margin,
      yMin: yOffset + margin,
      yMax: yOffset + imageHeightPercent - margin
    };
  };

  // Check proximity to clues whenever hamster moves
  useEffect(() => {
    const nearby = new Set();
    clues.forEach((clue) => {
      const distance = calculateDistance(
        hamsterPos.x,
        hamsterPos.y,
        clue.x,
        clue.y
      );
      if (distance < DETECTION_RADIUS) {
        nearby.add(clue.id);
      }
    });
    setNearbyClues(nearby);
  }, [hamsterPos, clues]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default scrolling for arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      const bounds = getImageBounds();

      setHamsterPos((prev) => {
        let newX = prev.x;
        let newY = prev.y;

        // WASD and Arrow keys
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          newX = Math.max(bounds.xMin, prev.x - MOVE_SPEED);
          setHamsterFacing('left');
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          newX = Math.min(bounds.xMax, prev.x + MOVE_SPEED);
          setHamsterFacing('right');
        } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          newY = Math.max(bounds.yMin, prev.y - MOVE_SPEED);
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
          newY = Math.min(bounds.yMax, prev.y + MOVE_SPEED);
        } else {
          return prev; // No change
        }

        return { x: newX, y: newY };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageDimensions, containerDimensions]);

  /**
   * Handle joystick movement (for mobile)
   * Direction can be: up, down, left, right, or diagonals
   */
  const handleJoystickMove = (direction) => {
    const bounds = getImageBounds();

    setHamsterPos((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      // Handle 8-way movement
      switch (direction) {
        case 'up':
          newY = Math.max(bounds.yMin, prev.y - MOVE_SPEED);
          break;
        case 'down':
          newY = Math.min(bounds.yMax, prev.y + MOVE_SPEED);
          break;
        case 'left':
          newX = Math.max(bounds.xMin, prev.x - MOVE_SPEED);
          setHamsterFacing('left');
          break;
        case 'right':
          newX = Math.min(bounds.xMax, prev.x + MOVE_SPEED);
          setHamsterFacing('right');
          break;
        case 'up-left':
          newY = Math.max(bounds.yMin, prev.y - MOVE_SPEED);
          newX = Math.max(bounds.xMin, prev.x - MOVE_SPEED);
          setHamsterFacing('left');
          break;
        case 'up-right':
          newY = Math.max(bounds.yMin, prev.y - MOVE_SPEED);
          newX = Math.min(bounds.xMax, prev.x + MOVE_SPEED);
          setHamsterFacing('right');
          break;
        case 'down-left':
          newY = Math.min(bounds.yMax, prev.y + MOVE_SPEED);
          newX = Math.max(bounds.xMin, prev.x - MOVE_SPEED);
          setHamsterFacing('left');
          break;
        case 'down-right':
          newY = Math.min(bounds.yMax, prev.y + MOVE_SPEED);
          newX = Math.min(bounds.xMax, prev.x + MOVE_SPEED);
          setHamsterFacing('right');
          break;
        default:
          return prev;
      }

      return { x: newX, y: newY };
    });
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
      {/* Loading state */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading your adventure...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50 z-50">
          <div className="text-center max-w-md p-6">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Background Image Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              Please add your background image to:
            </p>
            <code className="block bg-gray-100 p-3 rounded text-sm text-left overflow-x-auto">
              /valentine/public/assets/scavenger/background.jpg
            </code>
            <p className="text-sm text-gray-500 mt-4">
              The game will start once the image is loaded.
            </p>
          </div>
        </div>
      )}

      {/* Scene container - maintains aspect ratio */}
      <div
        ref={sceneRef}
        className="relative w-full h-full max-w-7xl mx-auto"
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {/* Background image */}
        <img
          src={backgroundImage}
          alt="Scavenger hunt scene"
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />

        {/* Game overlay - constrained to actual image bounds */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${getImageBounds().xMin}%`,
            top: `${getImageBounds().yMin}%`,
            width: `${getImageBounds().xMax - getImageBounds().xMin}%`,
            height: `${getImageBounds().yMax - getImageBounds().yMin}%`,
          }}
        >
          <div className="relative w-full h-full">
            {/* Hamster character - position relative to image bounds */}
            <Hamster
              x={((hamsterPos.x - getImageBounds().xMin) / (getImageBounds().xMax - getImageBounds().xMin)) * 100}
              y={((hamsterPos.y - getImageBounds().yMin) / (getImageBounds().yMax - getImageBounds().yMin)) * 100}
              facing={hamsterFacing}
            />

            {/* Hotspots - position relative to image bounds */}
            <div className="pointer-events-auto">
              {clues.map((clue) => {
                // Convert clue position from container % to image %
                const imageX = ((clue.x - getImageBounds().xMin) / (getImageBounds().xMax - getImageBounds().xMin)) * 100;
                const imageY = ((clue.y - getImageBounds().yMin) / (getImageBounds().yMax - getImageBounds().yMin)) * 100;

                return (
                  <Hotspot
                    key={clue.id}
                    clue={{...clue, x: imageX, y: imageY}}
                    isFound={foundClues.has(clue.id)}
                    isNearby={nearbyClues.has(clue.id)}
                    onClick={onHotspotClick}
                  />
                );
              })}
            </div>
          </div>
        </div>


      </div>

      {/* Mobile joystick - only show on touch devices */}
      {isMobile && imageLoaded && <Joystick onMove={handleJoystickMove} />}
    </div>
  );
};

export default Scene;
