# Basketball Team Randomizer

A modern, responsive web application for randomly forming basketball teams with support for both English and Thai languages.

## Features

### 🏀 Core Functionality
- **Predefined Player Selection**: Click to select from 10 predefined players (จิ้น, เอ็ก, โอ๊ค, แท๊ค, นิค, เดียร์, ทัช, ปัน, โชกุน, กล้วย)
- **Manual Player Input**: Add custom players by typing their names
- **Flexible Team Formation**: Supports 2-6 players per team with smart uneven team handling (e.g., 3v2, 4v3)
- **Real-time Team Calculation**: Shows number of teams and extra players
- **Fair Randomization**: Uses Fisher-Yates shuffle algorithm for unbiased team assignment

### 🎨 User Interface
- **Basketball Theme**: Orange and white color scheme with basketball animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth animations, and visual feedback
- **Language Toggle**: Switch between English and Thai with dynamic button styling

### 📱 Player Management
- **Visual Player Cards**: Each predefined player has an avatar and selection button
- **Local Image Support**: Add player photos without uploading to external servers
- **Selection States**: Clear visual indication of selected/deselected players
- **Player Limits**: Maximum 12 players with real-time count display

### 🎯 Team Formation
- **Smart Logic**: Automatically handles odd player counts and insufficient players
- **Flexible Sizing**: Choose from 2, 3, 4, 5, or 6 players per team
- **Uneven Teams**: Creates balanced 2-team formations when player count is low
- **Warning System**: Clear notifications about team formation implications

### 💾 Data Management
- **Local Storage**: Saves player selections, team size, and language preference
- **Export Options**: Save results as text file or copy to clipboard
- **Reset Functionality**: Clear all data with confirmation dialog

## How to Add Local Images

### 1. Create Images Folder
Create an `images` folder in your project directory:
```
your-project/
├── index.html
├── styles.css
├── script.js
├── README.md
└── images/
    ├── player1.jpg
    ├── player2.jpg
    ├── player3.jpg
    ├── player4.jpg
    ├── player5.jpg
    ├── player6.jpg
    ├── player7.jpg
    ├── player8.jpg
    ├── player9.jpg
    └── player10.jpg
```

### 2. Add Your Images
Place your player photos in the `images` folder with these names:
- `player1.jpg` - จิ้น
- `player2.jpg` - เอ็ก
- `player3.jpg` - โอ๊ค
- `player4.jpg` - แท๊ค
- `player5.jpg` - นิค
- `player6.jpg` - เดียร์
- `player7.jpg` - ทัช
- `player8.jpg` - ปัน
- `player9.jpg` - โชกุน
- `player10.jpg` - กล้วย

### 3. Image Requirements
- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 200x200 pixels or larger
- **Aspect Ratio**: Square (1:1) works best
- **File Size**: Keep under 500KB for fast loading

### 4. Fallback System
If an image fails to load, the application automatically shows the player's name in a styled avatar with the basketball theme colors.

## Usage Instructions

### Getting Started
1. Open `index.html` in a web browser
2. The application will load with English as the default language

### Selecting Players
1. **Predefined Players**: Click the green "+" button on any player card to add them
2. **Manual Input**: Type a name in the text field and click "Add"
3. **Remove Players**: Click the "×" button on player tags or deselect predefined players

### Forming Teams
1. Choose team size (2-6 players) by clicking the circular buttons
2. Review the team information displayed below
3. Click "Randomize Teams" when ready
4. View results and save/copy as needed

### Language Support
- Click the language button in the header to toggle between English and Thai
- The button changes color and text based on the current language
- All text, notifications, and warnings are translated

## Technical Details

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Local Storage
The application saves:
- Selected players
- Chosen team size
- Current language preference

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## File Structure
```
basketball-team-randomizer/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Application logic and functionality
├── README.md           # This documentation
└── images/             # Player photos (create this folder)
    ├── player1.jpg
    ├── player2.jpg
    └── ... (player3-10)
```

## Customization

### Adding More Players
1. Edit the predefined players section in `index.html`
2. Add corresponding CSS styles in `styles.css`
3. Update the JavaScript logic in `script.js`

### Changing Colors
Modify the CSS variables in `styles.css`:
- Primary color: `#ff6b35` (orange)
- Secondary color: `#f7931e` (light orange)
- Success color: `#28a745` (green)
- Error color: `#dc3545` (red)

### Modifying Team Logic
The smart team formation logic is in the `createSmartTeams()` method in `script.js`.

## Troubleshooting

### Images Not Loading
- Ensure the `images` folder exists in the same directory as `index.html`
- Check that image filenames match exactly (case-sensitive)
- Verify image files are valid JPG, PNG, or WebP format

### Language Not Changing
- Clear browser cache and reload the page
- Check browser console for JavaScript errors
- Ensure all files are in the same directory

### Team Randomization Issues
- Make sure you have at least 4 players selected
- Verify team size is selected
- Check that player count meets minimum requirements

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all files are properly placed
3. Test in different browsers
4. Clear browser cache and try again

---

**Enjoy creating balanced basketball teams! 🏀** 

**Our website: https://kingkung-kehe.netlify.app/**