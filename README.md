Guess The Word is a simple word-guessing game where the player attempts to guess a randomly chosen word within a limited number of tries. With each incorrect attempt, hints can be revealed to assist in solving the word.

Table of Contents
Demo
Features
Technologies Used
How to Play
Setup
Game Logic
Future Enhancements
Demo
You can view the game in action by opening the HTML file in your web browser.

Features
Random word selection from a predefined word list.
Multiple tries to guess the word.
Hints system that reveals letters based on word length.
Automatic focusing on the next input field when typing letters.
Interactive inputs where letters are marked based on correctness:
Correct letter in the correct position.
Correct letter in the wrong position.
Incorrect letter.
Fireworks animation on winning.
Play again functionality to reset and start a new game.
Responsive design for different screen sizes.
Technologies Used
HTML: Structure of the game interface.
CSS: Styling of game components, including the firework animation.
JavaScript: Core game logic and interactivity.
How to Play
Start the game, and a word is selected randomly from a predefined list.
Guess the word by typing one letter at a time in the provided input fields.
You have 6 tries to guess the correct word.
Use the arrow keys (left/right) to navigate between input fields.
Hints can be used if needed, which reveal random letters from the word. The number of available hints depends on the word's length.
If you guess the word correctly, a firework animation is triggered, and you can reset the game by clicking the "Play Again" button.
If you fail to guess the word after all tries, the game will display the correct word, and you can start a new round by clicking the "Play Again" button.
Game Logic
Random Word Selection: A word is randomly chosen from an array of predefined words.
Number of Tries: The player has 6 attempts to guess the correct word.
Hints System: Based on the word's length, the number of hints available is half the number of letters in the word.
Input Handling:
Letters are automatically converted to uppercase.
If the letter matches its position in the word, it is marked as correct.
If the letter exists in the word but is in the wrong position, it is marked accordingly.
Backspace behavior is modified to allow easy navigation between input fields.
Future Enhancements
Add more words to the predefined list.
Implement difficulty levels with varying word lengths and fewer guesses.
Add a timer to increase the challenge.
Track player score across multiple games.
