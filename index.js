const btn = document.getElementById("click-btn");
btn.addEventListener("click", function () {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => console.log(data));
});