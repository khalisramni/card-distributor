<?php
/**
 * Card Distributor - Backend API
 * 
 * This script handles the distribution of cards among a specified number of players.
 * It generates a standard 52-card deck, shuffles it, and distributes cards evenly.
 * 
 * Minimum supported environment: PHP 7.0+
 * 
 * @author Khalis Ramni
 */

// Set headers for cross-origin requests and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

/**
 * Generates a shuffled deck of cards
 * 
 * Creates a standard 52-card deck with suits (S=Spades, H=Hearts, D=Diamonds, C=Clubs)
 * and values (A, 2-10, J, Q, K). The deck is shuffled before being returned.
 * 
 * @return array Shuffled array of card codes (e.g., "S-A" for Ace of Spades)
 */
function generateDeck() {
    $suits = ["S", "H", "D", "C"];
    $values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "X", "J", "Q", "K"];
    $deck = [];

    // Generate all 52 cards
    foreach ($suits as $suit) {
        foreach ($values as $value) {
            $deck[] = "$suit-$value";
        }
    }

    // Shuffle the deck to randomize card distribution
    shuffle($deck);
    return $deck;
}

// IRREGULAR PROCESSING: Check if the request method is valid
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Only GET requests are supported"]);
    exit;
}

// Get number of players from request
$players = isset($_GET['players']) ? intval($_GET['players']) : null;

// IRREGULAR PROCESSING: Validate input
if ($players === null || $players <= 0) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Input value does not exist or value is invalid"]);
    exit;
}

// IRREGULAR PROCESSING: Handle potential errors during card distribution
try {
    // Generate deck and distribute
    $deck = generateDeck();
    $result = array_fill(0, $players, []);

    // Distribute cards evenly among players
    for ($i = 0; $i < count($deck); $i++) {
        $result[$i % $players][] = $deck[$i];
    }

    // Format output as comma-separated strings for each player
    $output = [];
    foreach ($result as $row) {
        $output[] = implode(",", $row);
    }

    // Return the result as JSON
    echo json_encode($output);
} catch (Exception $e) {
    // IRREGULAR PROCESSING: Handle any unexpected errors
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Irregularity occurred"]);
    
    // Log the error for debugging (not visible to end users)
    error_log("Card distribution error: " . $e->getMessage());
}
?>
