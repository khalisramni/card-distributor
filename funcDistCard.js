/**
 * Card Distributor - Frontend JavaScript
 * 
 * This script handles the user interaction for the card distributor application.
 * It fetches data from the backend API and displays the distributed cards.
 * 
 * Minimum supported environment: Node v12+ compatible JavaScript
 * 
 * @author Khalis Ramni
 */

/**
 * Distributes cards to players based on user input
 * 
 * This function is called when the user clicks the "Distribute" button.
 * It validates the input, sends a request to the backend, and displays the results.
 */
function distributeCards() {
  var players = document.getElementById("players").value;
  var outputDiv = document.getElementById("output");

  // IRREGULAR PROCESSING: Validate input
  if (!players || players <= 0) {
    outputDiv.innerHTML = '<p style="color:red;">Please enter a valid number of players</p>';
    outputDiv.style.display = "block";
    return;
  }

  outputDiv.style.display = "none"; // Hide output initially
  
  // Show loading indicator
  var loadingIndicator = document.createElement("div");
  loadingIndicator.id = "loading";
  loadingIndicator.textContent = "Distributing cards...";
  document.body.appendChild(loadingIndicator);

  // IRREGULAR PROCESSING: Use try-catch to handle potential fetch errors
  try {
    // Send request to backend API
    fetch('backend.php?players=' + players)
      .then(function(response) {
        // Remove loading indicator
        var loadingElement = document.getElementById("loading");
        if (loadingElement) {
          document.body.removeChild(loadingElement);
        }
        
        // IRREGULAR PROCESSING: Check if response is OK
        if (!response.ok) {
          throw new Error('Server responded with status: ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        outputDiv.innerHTML = ""; // Clear previous output

        // IRREGULAR PROCESSING: Check if response contains an error
        if (data.error) {
          outputDiv.innerHTML = '<p style="color:red;">Irregularity occurred: ' + data.error + '</p>';
        } else {
          // Process and display the distributed cards
          data.forEach(function(cards, index) {
            // Create player title
            var playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            playerDiv.textContent = 'Person ' + (index + 1) + ':';

            // Create card container
            var cardContainer = document.createElement("div");
            cardContainer.classList.add("cards");

            // Add individual card images
            cards.split(",").forEach(function(card) {
              var cardImg = document.createElement("img");
              cardImg.classList.add("card-img");

              // Convert text to image filename
              var imgSrc = 'cards/' + card + '.png';
              cardImg.src = imgSrc;
              cardImg.alt = card;
              
              // IRREGULAR PROCESSING: Handle image loading errors
              cardImg.onerror = function() {
                this.src = 'cards/card-back.png'; // Fallback image
                this.alt = 'Card image not found';
                console.error('Failed to load card image: ' + imgSrc);
              };
              
              cardContainer.appendChild(cardImg);
            });

            // Append player & cards to output
            outputDiv.appendChild(playerDiv);
            outputDiv.appendChild(cardContainer);
          });
        }

        outputDiv.classList.add("fade-in");
        outputDiv.style.display = "block"; // Show results with animation
      })
      .catch(function(error) {
        // IRREGULAR PROCESSING: Handle fetch or processing errors
        console.error("Error:", error);
        outputDiv.innerHTML = '<p style="color:red;">Irregularity occurred: ' + 
                             (error.message || "Could not connect to server") + '</p>';
        outputDiv.style.display = "block";
      });
  } catch (error) {
    // IRREGULAR PROCESSING: Handle any unexpected errors
    var loadingElement = document.getElementById("loading");
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    
    console.error("Unexpected error:", error);
    outputDiv.innerHTML = '<p style="color:red;">Irregularity occurred</p>';
    outputDiv.style.display = "block";
  }
}
