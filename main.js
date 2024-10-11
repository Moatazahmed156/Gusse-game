// Setting Game Name
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By <span>Moataz Ahmed</span>`;
// Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 0;
let currentTry = 1;
let number_of_hints = 0;
let numberOfHints = number_of_hints;
// Manage Words
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "School","Dog","Cat","Lion"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
numbersOfLetters = wordToGuess.length;
numberOfHints = Math.floor(numbersOfLetters/2);
// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);
// Generate inputs
function generateInput() {
  const inputsContainer = document.querySelector(".inputs");

  // Create Main Try Div
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // Create Inputes
    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs input");
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Input To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      // console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}
// fire works when win
function triggerFireworks() {
  const container = document.querySelector('.fireworks-container');

  for (let i = 0; i < 50; i++) {
    const firework = document.createElement('div');
    firework.className = 'firework';

    // Set random position
    firework.style.left = Math.random() * window.innerWidth + 'px';
    firework.style.top = Math.random() * window.innerHeight + 'px';

    // Generate a random color
    firework.style.background = getRandomColor();

    // Append firework to container
    container.appendChild(firework);

    // Remove firework after animation ends
    firework.addEventListener('animationend', () => {
      firework.remove();
    });
  }
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Show Play Again Button When Game Ends
function showPlayAgainButton() {
  const playAgainButton = document.querySelector(".play-again");
  playAgainButton.style.display = "block";
  playAgainButton.addEventListener("click", resetGame);
}

// Reset the Game
function resetGame() {
  // Resetting Variables
  currentTry = 1;
  wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
  numbersOfLetters = wordToGuess.length;
  numberOfHints = Math.floor(numbersOfLetters/2);
  messageArea.innerHTML = "";
  console.log(wordToGuess);
  // Reset Inputs
  const inputsContainer = document.querySelector(".inputs");
  inputsContainer.innerHTML = ""; // Clear previous inputs
  generateInput(); // Recreate inputs

  // Re-enable Guess and Hint buttons
  guessButton.disabled = false;
  getHintButton.disabled = false;
  document.querySelector(".hint span").innerHTML = numberOfHints;

  // Hide Play Again Button
  document.querySelector(".play-again").style.display = "none";
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    guessButton.click();
  }
});
console.log(wordToGuess);

// Modify Handle Guesses Function to Show Play Again Button
function handleGuesses() {
  let successGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    // Game Logic
    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // Check If User Wins
  if (successGuess) {
    triggerFireworks();
    messageArea.innerHTML = `
    Congratulation! The word is <span>${wordToGuess}</span>
    <h2>you get it in ${currentTry} ${(currentTry == 1) ? "try" : "tries"}</h2>
    `;
    // Disable All Inputs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guessButton.disabled = true;
    getHintButton.disabled = true;

    // Show Play Again Button
    showPlayAgainButton();
  } else {
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose! The word was <span>${wordToGuess}</span>`;

      // Show Play Again Button
      showPlayAgainButton();
    }
  }
}


function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  // console.log(enabledInputs);
  const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
  // console.log(emptyEnabledInputs);

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    // console.log(randomIndex);
    // console.log(randomInput);
    // console.log(indexToFill);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);

    // Only proceed if the current input is not the first one
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];

      // If the current input is empty, move focus to the previous input
      if (currentInput.value === "") {
        event.preventDefault();  // Prevent default backspace behavior
        prevInput.focus();
        prevInput.value = "";  // Clear the previous input
      }
    }
  }
}
document.addEventListener("keydown", handleBackspace);

window.onload = function () {
  generateInput();
};