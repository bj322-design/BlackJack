const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

// Create a deck of cards
function createDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  return deck;
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal a card
function dealCard(hand, deck) {
  hand.push(deck.pop());
}

// Calculate the score of a hand
function calculateScore(hand) {
  let score = 0;
  let aces = 0;
  for (const card of hand) {
    if (card.rank === 'Ace') {
      aces++;
      score += 11;
    } else if (['Jack', 'Queen', 'King'].includes(card.rank)) {
      score += 10;
    } else {
      score += parseInt(card.rank);
    }
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

// Render a card
function renderCard(card, hand) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.textContent = `${card.rank} of ${card.suit}`;
  document.getElementById(hand).appendChild(cardElement);
}

// Render the game state
function renderGame() {
  const playerScoreElement = document.getElementById('player-score');
  const dealerScoreElement = document.getElementById('dealer-score');

  playerScoreElement.textContent = `Player Score: ${calculateScore(playerHand)}`;
  dealerScoreElement.textContent = `Dealer Score: ${calculateScore(dealerHand)}`;

  // Clear the hands
  document.getElementById('player-hand').innerHTML = '';
  document.getElementById('dealer-hand').innerHTML = '';

  // Render player and dealer hands
  playerHand.forEach(card => renderCard(card, 'player-hand'));
  dealerHand.forEach(card => renderCard(card, 'dealer-hand'));
}

// Reset the game
function resetGame() {
  playerHand.length = 0;
  dealerHand.length = 0;
  shuffleDeck(deck);
  dealCard(playerHand, deck);
  dealCard(dealerHand, deck);
  dealCard(playerHand, deck);
  dealCard(dealerHand, deck);
  renderGame();
}

// Initialize the game
const deck = createDeck();
shuffleDeck(deck);

const playerHand = [];
const dealerHand = [];

dealCard(playerHand, deck);
dealCard(dealerHand, deck);
dealCard(playerHand, deck);
dealCard(dealerHand, deck);

renderGame();

// Button event listeners
document.getElementById('hit-button').addEventListener('click', () => {
  dealCard(playerHand, deck);
  renderGame();
  if (calculateScore(playerHand) > 21) {
    alert('Bust! You lose.');
    resetGame();
  }
});

document.getElementById('stand-button').addEventListener('click', () => {
  while (calculateScore(dealerHand) < 17) {
    dealCard(dealerHand, deck);
  }
  renderGame();

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  if (playerScore > 21) {
    alert('Bust! You lose.');
  } else if (dealerScore > 21) {
    alert('Dealer busts! You win.');
  } else if (playerScore > dealerScore) {
    alert('You win!');
  } else if (playerScore < dealerScore) {
    alert('You
