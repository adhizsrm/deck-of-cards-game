let deckId;
let computerScore = 0;
let myScore = 0;
const cardsContainer = document.getElementById("cards");
const newDeckBtn = document.getElementById("new-deck");
const drawCardBtn = document.getElementById("draw-cards");
const header = document.getElementById("header");
const remainingText = document.getElementById("remaining");
const computerScoreEl = document.getElementById("computer-score");
const myScoreEl = document.getElementById("my-score");

function handleClick() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
    });
}

newDeckBtn.addEventListener("click", handleClick);

drawCardBtn.addEventListener("click", () => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      remainingText.textContent = `Remaining cards: ${data.remaining}`;
      for (let i = 0; i < 2; i++) {
        cardsContainer.children[
          i
        ].innerHTML = `<img src=${data.cards[i].image} class="card">`;
      }
      const winnerText = determineCardWinner(data.cards[0], data.cards[1]);
      header.textContent = winnerText;
      if (data.remaining === 0) {
        drawCardBtn.disabled = true;
        drawCardBtn.classList.add("disabled");
        if (computerScore > myScore) {
          // display "The computer won the game!"
          header.textContent = "The computer won the game!";
        } else if (myScore > computerScore) {
          // display "You won the game!"
          header.textContent = "You won the game!";
        } else {
          // display "It's a tie game!"
          header.textContent = "It's a tie game!";
        }
      }
    });
});

function determineCardWinner(card1, card2) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];
  const card1ValueIndex = valueOptions.indexOf(card1.value);
  const card2ValueIndex = valueOptions.indexOf(card2.value);
  if (card1ValueIndex > card2ValueIndex) {
    computerScore++;
    computerScoreEl.textContent = `Computer score: ${computerScore}`;
    return "Computer Wins!";
  } else if (card1ValueIndex < card2ValueIndex) {
    myScore++;
    myScoreEl.textContent = `My score: ${myScore}`;
    return "You Win!";
  } else {
    return "War!";
  }
}
