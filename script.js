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
    const newHumanDiv = document.createElement("div");
    newHumanDiv.append(document.createElement("br"), newRock, newPaper, 
        newSciss, document.createElement("br"));    

    humanChoice.appendChild(newHumanDiv);
    let choice = 'rock';

    // if you add a listener, then be sure to either only do it once or delete 
    // the node with it, else it causes multi-listening callbacks.
    newHumanDiv.addEventListener('click', (event) => {
        // console.log(event.target.id);
        choice = `${event.target.id}`;
        newHumanDiv.remove();
        humanChoice.replaceChildren();
        if (['rock', 'paper', 'scissors'].indexOf(choice) < 0) {
            choice = 'rock';
        }
        playRound(choice);
    });
}

function playRound(choice) {
    let human = choice;
    let computer = getComputerChoice();

    humanText.textContent = "Player's Choice: " + human;
    computerText.textContent = "Computer's Choice: " + computer;

    let result = "";
    // console.log(`${humanScore} vs. ${computerScore}`);
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
    const nextRound = document.createElement("button");
    nextRound.textContent = "Next Round";
    nextDiv.appendChild(nextRound);
    nextRound.addEventListener("click", () => {
        if (humanScore >= 5 || computerScore >= 5) {
            nextRound.remove();
            if (humanScore >= computerScore) {
                finalResult.textContent = "PLAYER WON THE GAME";
            }
            else {
                finalResult.textContent = "COMPUTER WON THE GAME";
            }
            const resetBtn = document.createElement("button");
            resetBtn.textContent = "Reset";
            finalResult.appendChild(document.createElement("br"));
            finalResult.appendChild(resetBtn);
            
            resetBtn.addEventListener('click', () => {
                humanScore = 0;
                computerScore = 0;
                finalResult.replaceChildren();

                humanText.textContent = "Player's Choice:";
                computerText.textContent = "Computer's Choice:";
                humanScoreText.textContent = "PLAYER SCORE: " + humanScore;
                computerScoreText.textContent = "CPU SCORE: " + computerScore;
                resultText.textContent = "";
                finalResult.textContent = "";
                humanChoice.replaceChildren();

                playGame();
            });
            return;
        }
        else {
            resultText.textContent = "";
            getHumanChoice();
        }
    });
}

let humanScore = 0;
let computerScore = 0;

const humanText = document.querySelector(".human");
const computerText = document.querySelector(".computer");

const humanScoreText = document.querySelector(".pscore");
const computerScoreText = document.querySelector(".cscore");
const resultText = document.querySelector(".result");
const nextDiv = document.querySelector(".next");
const finalResult = document.querySelector(".final");
const humanChoice = document.querySelector(".humanChoice");

const newRock = document.createElement("button");
const newPaper = document.createElement("button");
const newSciss = document.createElement("button");

newRock.textContent = "Rock";
newPaper.textContent = "Paper";
newSciss.textContent = "Scissors";

newRock.id = "rock";
newPaper.id = "paper";
newSciss.id = "scissors";

playGame();

