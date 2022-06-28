"use strict";

let deckIdGlobal;

async function getDeckId() {
  var newDeck = await axios.get(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const deckID = newDeck.data["deck_id"];
  deckIdGlobal = deckID;
  return deckID;
}
//TODO: use global base url
async function drawCard(deckID) {
  // const deckID = await getDeckId();
  const cardObj = await axios.get(
    `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
  );

  const card = cardObj.data.cards[0];

  console.log(`${card.value} of ${card.suit}`);
  ////
  return card;
}

//TODO: change cardobj >>> data
async function drawTwoCards() {
  const deckID = await getDeckId();
  const cardObj = await axios.get(
    `http://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
  );

  // const card1 = cardObj.data.cards[0];
  // const card2 = cardObj.data.cards[1];
  const [card1, card2] = cardObj.data.cards;
  console.log(`${card1.value} of ${card1.suit}`);
  console.log(`${card2.value} of ${card2.suit}`);
}

getDeckId();
console.log(deckIdGlobal);

async function handelCardsLogic(evt) {
  evt.preventDefault();
  const cardObj = await drawCard(deckIdGlobal);
  $("#card-container").append(`<img src="${cardObj.image}">`);
}

$("#draw-card").on("submit", handelCardsLogic);
