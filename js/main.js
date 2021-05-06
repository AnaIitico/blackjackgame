

var suits = ['hearts', 'spades', 'diamonds', 'clubs'];
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace'];
var deck = [];
var images = [];
var dealerHand = [];// push 2 cards into the hand
var playerHand = [];// push 2 cards into the hand
var dealerPoints = [];
var playerPoints = [];
var cardCover = {
  Rank: 0,
  Suit: 'cover',
  Image: `images/cover.png`};
var oldDealerCard = []
console.log(cardCover);

// --Create the deck--
function createDeck(){
  for(var suitCount = 0; suitCount < 4; suitCount++){
    for(var rankCount= 0; rankCount < 13; rankCount++){
      var card = {
            Rank: ranks[rankCount],
            Suit: suits[suitCount],
            Image: `images/${ranks[rankCount]}_of_${suits[suitCount]}.png`
          } 
          //Assign card value
      switch (card.Rank) {
        case "ace":
            card.Rank = 11;
            break;
        case "jack":
            card.Rank = 10;
            break;
        case "queen":
            card.Rank = 10;
            break;
        case "king":
            card.Rank = 10;
            break;
        default:
            break;
        }
      deck.push(card)
      }
    }
  return deck
}
  // --Shuffle the deck
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
// --hitMe button and function to deal all cards as needed--
function hitMe(user, num, player){
    var tempCard = [];
    for(i = 0; i < num; i++){
      tempCard = deck.pop();
      player.push(tempCard)
      if(user == 'dealer'){
        if(i == 0  && num == 2){
        oldDealerCard = tempCard
        tempCard = cardCover;
        }
      displayDealerCards(tempCard);
      }
      else{
        displayPlayerCards(tempCard)
      }
    } 
    // console.log(player);
    cardCount(user, player);
    if(user === 'dealer' && num < 2) {
      standLogic();
      // return tempCard;
    } else { 
      playerRuleLogic();
    }
  }
// --End of hitMe function--

// --Count the cards
function cardCount(user, player){
  let points = 0;
  for(i = 0; i < player.length; i++){
    points += player[i].Rank; // 11-13 => 10
    if(user === 'dealer'){
      dealerPoints = points;
      showDealerPoints(dealerPoints);
    }
    else {
      playerPoints = points;
      showPlayerPoints(playerPoints);
      console.log("player points line 86 works")
    }
  }
  if(user === 'dealer'){
    console.log('Dealer Points:', dealerPoints);
  }
  else{
    console.log('Player Points:', playerPoints);
  }
}
// --End Count the cards

// --ruleLogic to compare hands and decide winner
function playerRuleLogic(num) {
  if (playerPoints == 21 && dealerPoints == 21){
    alert( `Player has ${playerPoints} points and Dealer has ${dealerPoints} points.  IT'S A DRAW!`);
    return false;
  }
  else if(playerPoints > 21){
    alert(`Player has ${playerPoints} points. You Bust! DEALER WINS!!`);
    return false;
  }
  else if(playerPoints == 21){
    alert( `Player has ${playerPoints} points. Player Stands`);
    return false;
  }
  else{
    if(num < 2){
      alert(`Player has ${playerPoints} points. Do you want to Hit or Stand. Make a choice and click your selection`);
      return false;
    }
    
  } 
}

// -- Dealer standLogic for Stand button
function standLogic(tempCard){
  if(dealerPoints > 21){
    alert(`Dealer has ${dealerPoints} points. Dealer Bust! YOU WIN!!`);
    return false;
  }
  else if(dealerPoints >= 17){
    alert(`Dealer has ${dealerPoints} points. Dealer Pass`);
    return false;
  }
  else if(dealerPoints == 21){
    alert( `Dealer has ${dealerPoints} points. Dealer Pass`);
    return false;
  }
  else{
    alert(`Dealer has ${dealerPoints} points. Dealer Hits`);
    // displayDealerCards(tempCard);
    hitMe('dealer', 1, dealerHand);
  }
}
// -- End standLogic for stans (dealer) button

// --Deal button function
function deal(){
    hitMe('dealer', 2, dealerHand);
    console.log('line 145 Dealer: ', dealerHand);
    // oldDealerCard = dealerHand[0];
    // dealerHand[0].image = cardCover;
    // displayDealerCards();
    hitMe('player', 2, playerHand);
    console.log('line 147 Player: ', playerHand);   
}

// -- Event listeners
let dealButton = document.querySelector('#deal-button');
createDeck();
dealButton.addEventListener('click', deal)

let hitButton =  document.querySelector('#hit-button');
hitButton.addEventListener('click', () => { hitMe('player', 1, playerHand); });

let standButton =  document.querySelector('#stand-button');
standButton.addEventListener('click', standLogic)
// -- End event listeners

// -- Display cards functions
function displayDealerCards(tempCard) {
var image = document.createElement('img');
image.setAttribute('src', tempCard.Image);
// 
let dealerHandContainer = document.querySelector('#dealer-hand');
dealerHandContainer.append(image);

}
function displayPlayerCards(tempCard){
var image = document.createElement('img');
image.setAttribute('src', tempCard.Image);

let playerHandContainer = document.querySelector('#player-hand');
playerHandContainer.append(image);
}
// -- End display cards functions

// -- Display cards functions
function showPlayerPoints(playerPoints){
  let playerPointsUpdate = document.getElementById('player-points');
  playerPointsUpdate.innerText = playerPoints;
}

function showDealerPoints(dealerPoints){
  let dealerPointsUpdate = document.getElementById('dealer-points');
  dealerPointsUpdate.innerText = dealerPoints;
}
// -- End display cards functions


createDeck();// --An event listener event with DEAL BUTTON
shuffleArray(deck);// --An event listener event with DEAL BUTTON