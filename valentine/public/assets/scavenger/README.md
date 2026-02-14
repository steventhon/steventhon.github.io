# Scavenger Hunt Assets

This folder contains all the images for your Valentine's Day Scavenger Hunt game.

## Required Images

Add the following images to this folder:

1. **background.jpg** - The main scene/background image where hotspots will be placed
   - Recommended size: 1920x1080 or similar aspect ratio
   - This is the most important image - the entire game displays on this background

2. **first-date.jpg** - Photo for Clue #1 (optional)
   - Shows in the modal when the first clue is found

3. **adventure.jpg** - Photo for Clue #3 (optional)
   - Shows in the modal when the third clue is found

4. **us.jpg** - Photo for Clue #5 (optional)
   - Shows in the modal when the fifth clue is found

5. **final.jpg** - Final victory photo (optional)
   - Shows in the victory screen when all clues are found

## Tips

- Use high-quality images (but not too large - compress them if needed)
- For the background image, choose something meaningful (a map, a photo of a special place, etc.)
- Hotspot positions in `/src/data/clues.js` are percentages, so they'll work on any background
- If you don't want to use photos for certain clues, just set `mediaUrl: null` in the clues data
- Test on mobile to ensure images load quickly!

## Customizing Clues

Edit the file `/src/data/clues.js` to:
- Change hotspot positions (x, y percentages)
- Update messages
- Add/remove clues
- Change icon types
- Update image paths
