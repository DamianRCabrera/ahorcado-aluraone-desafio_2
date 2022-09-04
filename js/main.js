// Creating global variables of screens

const titleScreen = document.querySelector(".titlescreen");
const gameScreen = document.querySelector(".game");
const setUpScreen = document.querySelector(".setupscreen");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Creating global variables of buttons

const newGame = document.querySelector("#newgame");
const addWord = document.querySelector("#setup");
const restartGame = document.querySelector("#restartgame");
const giveUp = document.querySelector("#giveup");
const saveandstart = document.querySelector("#saveandstart");
const cancel = document.querySelector("#cancel");

// Functionality of UI buttons

const goToGameScreen = () => {
    titleScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
}

const goToSetUpScreen = () => {
    titleScreen.classList.add("hidden");
    setUpScreen.classList.remove("hidden");
}

const goToTitleScreen = () => {
    titleScreen.classList.remove("hidden");
    setUpScreen.classList.add("hidden");
}

// Funcionality of the Canvas



// Functionality of the Game


// Event listeners

document.addEventListener('click', (e) => {
    if (e.target.id === "newgame") {
        goToGameScreen();
    } else if (e.target.id === "setup") {
        goToSetUpScreen();
    } else if(e.target.id === "cancel") {
        goToTitleScreen();
    }
});