/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declare variables
var activePlayer, roundScore, scores, gameState, dice;

// Declare functions

// Initializiation
function init() {
    // Reset variables
    activePlayer = 0;
    scores = [0,0];
    roundScore = 0;
    // Make dice invisible
    document.querySelector('.dice').style.display = 'none';
    // Initialize class values
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    // Reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // Reset scores
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Set game state
    gameState = true;
    // Set active player
    activePlayer = 0;
};

// Next player
function nextPlayer() {
    // Reset round score
    roundScore = 0;
    // Clear current scores
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Change active player
    activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');    
};

// Start of main program

// Initialize prior to game start
init();

// Declare event listeners

// Click: New game button
document.querySelector('.btn-new').addEventListener('click', function() {
    // Restart game
    init();
});

// Click: Roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    // Check game state
    if (gameState) {
        // Declare local variable
        var diceDOM = document.querySelector('.dice');
        // Determine dice roll
        dice = Math.floor(Math.random() * 6) + 1;
        // Display die face
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        // Update round score
        if (dice !== 1) {
            // Update round score
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;    
        } else {
            // Pass turn
            nextPlayer();
        };        
    };
});

// Click: Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    // Check game state
    if (gameState) {
        // Update score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // Check for winner
        if (scores[activePlayer] >= 100) {
            // Player wins game
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';
            // Change game state
            gameState = false;
        } else {
            // Pass turn
            nextPlayer();
        };
    };
});
