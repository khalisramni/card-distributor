# Card Distributor Application

A simple web application that distributes a standard 52-card deck among a specified number of players.

## Features

- Distributes a standard 52-card deck among any number of players
- Visual display of cards using card images
- Responsive design for mobile and desktop
- Comprehensive error handling

## Requirements

This application complies with the following minimum supported environment:
- PHP 7.0 or higher
- Web server (Apache, Nginx, or PHP's built-in server)
- Modern web browser with JavaScript enabled

## Installation and Setup

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/card-distributor.git
   cd card-distributor
   ```

2. Make sure you have a `cards` directory containing card images named according to the pattern:
   - `S-A.png` (Ace of Spades)
   - `H-K.png` (King of Hearts)
   - etc.

3. Start a PHP server:
   ```
   php -S localhost:8000
   ```

4. Access the application in your browser:
   ```
   http://localhost:8000/LetsPlayCard.html
   ```

## Usage

1. Enter the number of players in the input field
2. Click the "Distribute" button
3. View the distributed cards for each player

## Project Structure

- `LetsPlayCard.html` - Main HTML file with UI
- `funcDistCard.js` - JavaScript for handling user interactions and API calls
- `backend.php` - PHP backend for card distribution logic
- `cards/` - Directory containing card images (not included in repository)

## Error Handling

The application handles the following irregular situations:
- Invalid input (non-numeric, negative, or zero values)
- Server connection issues
- Backend processing errors
- Missing card images

When an irregularity occurs, the application displays an "Irregularity occurred" message and terminates the process.

## Development Notes

- The application uses vanilla JavaScript compatible with modern browsers
- PHP 7.0+ is required for the backend
- All code is thoroughly commented for maintainability
- The UI is responsive and works on both desktop and mobile devices

## License

This project is proprietary. Reproduction/Reprint is prohibited.