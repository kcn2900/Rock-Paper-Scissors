function getComputerChoice() {
    let randomChoice = Math.floor(Math.random() * 3) + 1;
    let result = "";
    if (randomChoice <= 1) {
        result = "rock"
    }
    else if (randomChoice >= 3) {
        result = "paper"
    }
    else {
        result = "scissors"
    }
    // console.log(randomChoice);
    return result;
}

function getHumanChoice() {
    let choice = prompt("Enter your choice (default = rock)", "rock").toLowerCase();
    const arr = ["rock", "paper", "scissors"];
    while (arr.indexOf(choice) < 0) {
        choice = prompt("Enter a valid choice (rock, paper, scissors)", "rock");
    }
    return choice;
}

function playRound() {

    if (humanScore >= 1 || computerScore >= 1) {
        nextRound.remove();
        if (humanScore >= computerScore) {
            finalResult.textContent = "PLAYER WON";
        }
        else {
            finalResult.textContent = "COMPUTER WON";
        } 
        return;
    }

    let human = getHumanChoice();
    let computer = getComputerChoice();

    humanText.textContent = "Player's Choice: " + human;
    computerText.textContent = "Computer's Choice: " + computer;

    let result = "";

    if (human === computer) {
        result = "Draw: No points given."
    }
    else  // we can now skip third check for draws
    {
        if (human === "rock") {
            if (computer === "scissors") {
                humanScore++;
                result = "Player won. Rock beats scissors.";
            }
            else {
                computerScore++;
                result = "Computer won. Paper beats rock.";
            }
        }
        else if (human === "paper") {
            if (computer === "rock") {
                humanScore++;
                result = "Player won. Paper beats rock.";
            }
            else {
                computerScore++;
                result = "Computer won. Scissors beats rock."
            }
        }
        else { // human === scissor
            if (computer === "paper") {
                humanScore++;
                result = "Player won. Scissors beats paper.";
            }
            else {
                computerScore++;
                result = "Computer won. Rock beats scissors."
            }
        }
    }

    humanScoreText.textContent = "PLAYER SCORE: " + humanScore;
    computerScoreText.textContent = "CPU SCORE: " + computerScore;
    resultText.textContent = result;
    return result;
}

function playGame() {
    nextRound.addEventListener("click", playRound);
}

let humanScore = 0;
let computerScore = 0;

const humanText = document.querySelector(".human");
const computerText = document.querySelector(".computer");

const humanScoreText = document.querySelector(".pscore");
const computerScoreText = document.querySelector(".cscore");
const resultText = document.querySelector(".result");
const nextRound = document.querySelector(".submitClass");
const finalResult = document.querySelector(".final");

// resultText.textContent = playRound();
playGame();

