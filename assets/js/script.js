var startQuiz = document.querySelector("#startQuiz");
var currentTime = document.querySelector("#currentTime");
var quiz = document.querySelector("#quiz");
var questionsEl = document.querySelector("#questionsEl");

// Base values for score
var score = 0;
var questionIndex = 0;

// Total Seconds left > Must adjust depending on amount of questions
var secondsLeft = 100;
// Holds interval time
var holdInterval = 0;
// penalty time for answering question wrong
var penalty = 10;
var ulCreate = document.createElement("ul");

// Quiz Questions, possible selections, and answers.
var questions = [
  {
    question: "Question placeholder",
    choices: ["wrong choice", "wrong choice", "wrong choice", "correct choice"],
    answer: "correct choice",
  },

  {
    question: "Question placeholder",
    choices: ["wrong choice", "wrong choice", "wrong choice", "correct choice"],
    answer: "correct choice",
  },

  {
    question: "Question placeholder",
    choices: ["wrong choice", "wrong choice", "wrong choice", "correct choice"],
    answer: "correct choice",
  },

  {
    question: "Question placeholder",
    choices: ["wrong choice", "wrong choice", "wrong choice", "correct choice"],
    answer: "correct choice",
  },

  {
    question: "Question placeholder",
    choices: ["wrong choice", "wrong choice", "wrong choice", "correct choice"],
    answer: "correct choice",
  },
];

// Starts quiz and timer
startQuiz.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

// displays the question elements
function render(questionIndex) {
  // clears question data/elements
  questionsEl.innerHTML = "";
  ulCreate.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsEl.textContent = userQuestion;
  }
  // forEach function creates a list element for each answer option
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsEl.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
// this function compares the chosen answer with the correct answer
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    // when answering correct
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      createDiv.textContent =
        "Awesome! Your answer:  " +
        questions[questionIndex].answer +
        " was correct!";
    } else {
      // penalizes 5 seconds off secondsLeft if answered question wrong
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "OOF! The correct answer was:  " + questions[questionIndex].answer;
    }
  }
  // checks and displays the question number the user is on
  questionIndex++;

  if (questionIndex >= questions.length) {
    // All done will append last page with user stats
    allDone();
    createDiv.textContent =
      "Quiz completed!" +
      " " +
      "You got  " +
      score +
      " out of " +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questionsEl.appendChild(createDiv);
}
// appends final page
function allDone() {
  questionsEl.innerHTML = "";
  currentTime.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";

  questionsEl.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsEl.appendChild(createP);

  // displays remaining time and score
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;

    questionsEl.appendChild(createP2);
  }

  // initials prompt
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";

  questionsEl.appendChild(createLabel);

  // add initials text box
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questionsEl.appendChild(createInput);

  // submit name and score
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";

  questionsEl.appendChild(createSubmit);

  // captures score and name into local storage
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    // if user fails to enter initials
    if (initials === null) {
      console.log(
        "You must enter your initials to be posted on the High-Scores!"
      );
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);

      // sends player to seperate highscores HTML page
      window.location.replace("./assets/html/highscores.html");
    }
  });
}
