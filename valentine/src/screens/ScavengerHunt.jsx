import React, { useState, useEffect } from 'react';
import Scene from '../components/Scene';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import VictoryScreen from '../components/VictoryScreen';
import { clues as initialClues, victoryMessage } from '../data/clues';

/**
 * ScavengerHunt - Main Game Container
 * Manages game state and orchestrates all components
 */
const ScavengerHunt = () => {
  // State management
  const [foundClues, setFoundClues] = useState(new Set());
  const [selectedClue, setSelectedClue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  // Background image path (update this to your actual image)
  const BACKGROUND_IMAGE = '/src/assets/scavenger/background.png';

  // Check if game is complete
  useEffect(() => {
    if (foundClues.size === initialClues.length && initialClues.length > 0) {
      // Small delay before showing victory screen for better UX
      const timer = setTimeout(() => {
        setShowVictory(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [foundClues]);

  /**
   * Handle hotspot click
   */
  const handleHotspotClick = (clue) => {
    // Don't reopen if already found
    if (foundClues.has(clue.id)) {
      return;
    }

    // Mark as found
    setFoundClues((prev) => new Set([...prev, clue.id]));

    // Show modal with clue content
    setSelectedClue(clue);
    setIsModalOpen(true);
  };

  /**
   * Close modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear selected clue after animation
    setTimeout(() => setSelectedClue(null), 300);
  };

  /**
   * Restart game
   */
  const handleRestart = () => {
    setFoundClues(new Set());
    setSelectedClue(null);
    setIsModalOpen(false);
    setShowVictory(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50">
      {/* Progress Bar */}
      <ProgressBar found={foundClues.size} total={initialClues.length} />

      {/* Main Game Scene */}
      <div className="absolute inset-0 pt-24 pb-4 px-4">
        <Scene
          backgroundImage={BACKGROUND_IMAGE}
          clues={initialClues}
          foundClues={foundClues}
          onHotspotClick={handleHotspotClick}
        />
      </div>

      {/* Modal for displaying clue content */}
      <Modal clue={selectedClue} onClose={handleCloseModal} isOpen={isModalOpen} />

      {/* Victory Screen */}
      {showVictory && (
        <VictoryScreen victoryData={victoryMessage} onRestart={handleRestart} />
      )}

    </div>
  );
};

export default ScavengerHunt;
