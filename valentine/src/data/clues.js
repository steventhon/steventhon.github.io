/**
 * Scavenger Hunt Clues Data
 *
 * Each clue represents a hidden item on the scene
 * - id: Unique identifier
 * - x: Horizontal position as percentage from left (0-100)
 * - y: Vertical position as percentage from top (0-100)
 * - iconType: Type of icon to display ('heart', 'gift', 'envelope', 'star', 'flower')
 * - message: The romantic message to display when found
 * - mediaUrl: Optional image/video to show in modal (relative to /public folder)
 * - isFound: Initially false, tracks discovery state
 */

export const clues = [
  {
    id: 1,
    x: 40,
    y: 30,
    iconType: 'heart',
    message: "You're my favorite partner-in-crime for sneaking into the office with me, throwing pizzas around in Overcooked, or playing some competitive pinball",
    mediaUrl: '/assets/scavenger/first-date.jpg', // You'll add this image
    isFound: false
  },
  {
    id: 2,
    x: 60,
    y: 60,
    iconType: 'heart',
    message: "Whether it's getting dizzy on a cruise, getting cozy on a stay-cation, or riding around Disneyland, I love our little travel adventures together",
    mediaUrl: null,
    isFound: false
  },
  {
    id: 3,
    x: 75,
    y: 65,
    iconType: 'heart',
    message: "My home away from home, this is where my sweet pea lives!",
    mediaUrl: '/assets/scavenger/adventure.jpg',
    isFound: false
  },
  {
    id: 4,
    x: 30,
    y: 70,
    iconType: 'heart',
    message: "I love your newfound passion for snorkeling and the way the your eyes light up 🐟",
    mediaUrl: null,
    isFound: false
  },
  {
    id: 5,
    x: 50,
    y: 45,
    iconType: 'heart',
    message: "Relaxing, eating, and treating ourselves makes me feel at peace in the resort of Big Sursage",
    mediaUrl: '/assets/scavenger/us.jpg',
    isFound: false
  },
  {
    id: 6,
    x: 85,
    y: 75,
    iconType: 'heart',
    message: "Give me one margarita and we'll have fun at the zoo!",
    mediaUrl: '/assets/scavenger/adventure.jpg',
    isFound: false
  },
];

// Victory message shown when all clues are found
export const victoryMessage = {
  title: "You Found Them All! 💕",
  message: "Just like you found all these hidden treasures, you've found your way into my heart. You're my favorite person in the entire universe. I love you more than words can express. Happy Valentine's Day!",
  mediaUrl: '/assets/scavenger/final.jpg' // Final special photo
};
