
/* Starts JS after html is loaded */
window.onload = function(){

/* Sets up deck */
var deck = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K',
 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A', '2',
 '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A', '2', '3', '4',
 '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

/* Shuffles deck */
function shuffleDeck(deck) {
  for (var i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

shuffleDeck(deck);

var firstCard = deck.shift();
var secondCard = deck.shift();
var thirdCard = deck.shift();
var fourthCard = deck.shift();

/* Creates users hand */
var userHand = [firstCard, secondCard];
/* Creates dealers hand */
var dealerHand = [thirdCard, fourthCard];

$('#text1').append('Your hand: ' + userHand);

$('#text2').append('Dealer hand: ' + thirdCard);

/* Replaces face cards with a value of ten in users hand and returns a sum*/
function sumUserHand(firstCard, secondCard) {
  if (firstCard == 'T') {
    firstCard = 10;
  } else if (firstCard == 'J') {
    firstCard = 10;
  } else if (firstCard == 'Q') {
    firstCard = 10;
  } else if (firstCard == 'K') {
    firstCard = 10;
  } else if (firstCard == 'A') {
    firstCard = 11;
  }
  if (secondCard == 'T') {
    secondCard = 10;
  } else if (secondCard == 'J') {
    secondCard = 10;
  } else if (secondCard == 'Q') {
    secondCard = 10;
  } else if (secondCard == 'K') {
    secondCard = 10;
  } else if (secondCard == 'A') {
    secondCard = 11;
  }
  return Number(firstCard) + Number(secondCard)
}

$('#text3').append('Your sum: ' + userHand.reduce(sumUserHand));

/* Replaces face cards with a value of ten in dealers hand and returns a sum*/
function sumDealerHand(thirdCard, fourthCard) {
  if (thirdCard == 'T') {
    thirdCard = 10;
  } else if (thirdCard == 'J') {
    thirdCard = 10;
  } else if (thirdCard == 'Q') {
    thirdCard = 10;
  } else if (thirdCard == 'K') {
    thirdCard = 10;
  } else if (thirdCard == 'A') {
    thirdCard = 11;
  }
  if (fourthCard == 'T') {
    fourthCard = 10;
  } else if (fourthCard == 'J') {
    fourthCard = 10;
  } else if (fourthCard == 'Q') {
    fourthCard = 10;
  } else if (fourthCard == 'K') {
    fourthCard = 10;
  } else if (fourthCard == 'A') {
    fourthCard = 11;
  }
  return Number(thirdCard) + Number(fourthCard)
}

/* User has blackjack */
if (userHand.reduce(sumUserHand) == 21) {
$('#text6').empty().append('Blackjack! You win!');
}

/* Dealer has blackjack */
if (dealerHand.reduce(sumDealerHand) == 21) {
$('#text2').empty().append('Dealer hand: ' + dealerHand);
$('#text6').empty().append('Dealer has Blackjack! You lose!');
}

/* User hit button draws another card, adds sum, and determines if bust */
document.getElementById("hitoptionbtn").onclick = function() {
  userHand.push(deck.shift());
  $('#text1').empty().append('Your hand: ' + userHand);
  if (userHand.reduce(sumUserHand) <= 21) {
    $('#text3').empty().append('Your sum: ' + userHand.reduce(sumUserHand));
  } else {
    $('#text3').empty().append('Bust');
  }
}

/* User stand button - Adds cards to dealer hand until dealer's sum is over 16, determines if dealer busted and compares scores between user and dealer to decide who wins */
document.getElementById("standoptionbtn").onclick = function() {
  $('#text4').append('Your sum: ' + userHand.reduce(sumUserHand));
  if (dealerHand.reduce(sumDealerHand) >= 17) {
    $('#text5').append('Dealer sum: ' + dealerHand.reduce(sumDealerHand));
    $('#text2').empty().append('Dealer hand: ' + dealerHand);
  } else {
    while (dealerHand.reduce(sumDealerHand) < 17) {
      dealerHand.push(deck.shift());
      $('#text2').empty().append('Dealer hand: ' + dealerHand);
      $('#text5').empty().append('Dealer sum: ' + dealerHand.reduce(sumDealerHand));
    }
  }
  if (dealerHand.reduce(sumDealerHand) > 21) {
    $('#text5').empty().append('Dealer sum: Bust');
    $('#text6').append('You win!');
  }
  if (dealerHand.reduce(sumDealerHand) < userHand.reduce(sumUserHand) && userHand.reduce(sumUserHand) < 22) {
  $('#text6').append('You beat the dealer, you win!');
  } else if (dealerHand.reduce(sumDealerHand) > userHand.reduce(sumUserHand) && dealerHand.reduce(sumDealerHand) < 22) {
  $('#text6').append('The dealer beat you, you lose!');
  } else if (dealerHand.reduce(sumDealerHand) === userHand.reduce(sumUserHand)) {
  $('#text6').empty().append('You and the dealer tied, push!');
  }


}
}
