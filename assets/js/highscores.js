var highscores = document.querySelector("#highScores");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// Gathers score info from local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

// 'not equals' null not necessary because JS automatically calculates whether or not allScores is truthsy/falsy
if (allScores !== null) {
  allScores.sort((a, b) => {
    return b.score - a.score;
  });
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " " + allScores[i].score;
    highscores.appendChild(createLi);
  }
}

// Creates a link to go back to the main game
goBack.addEventListener("click", function () {
  window.location.replace("../../index.html");
});
