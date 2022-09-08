// Creating global variables of screens

const titleScreen = document.querySelector(".titlescreen");
const gameScreen = document.querySelector(".game");
const setUpScreen = document.querySelector(".setupscreen");

//Creating variables for screen of characters

const displayForGuesses = document.getElementById('toguess');
const displayForFails = document.getElementById('failed');

// Creating global variables of buttons

const newGame = document.querySelector("#newgame");
const addWord = document.querySelector("#setup");
const restartGame = document.querySelector("#restartgame");
const giveUp = document.querySelector("#giveup");
const saveandstart = document.querySelector("#saveandstart");
const cancel = document.querySelector("#cancel");

// Creating variable for inputs

const input = document.getElementById('inputword');
const newWordInput = document.getElementById('newword');

// Creating regExp for checking that what is input is a char from A-Z

const isAZ = new RegExp('[A-ZÑa-zñ]');
const isAZAdd = new RegExp('^[A-ZÑa-zñ]{3,8}$');

// Functionality of UI buttons

const goToGameScreen = () => {
    titleScreen.classList.add("hidden");
    setUpScreen.classList.add('hidden');
    gameScreen.classList.remove("hidden");
}

const goToSetUpScreen = () => {
    titleScreen.classList.add("hidden");
    setUpScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
}

const goToTitleScreen = () => {
    titleScreen.classList.remove("hidden");
    setUpScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
}

// Functionality of the Game

const starterWords = [
    "DESAFIO",
    "ALURA",
    "ORACLE",
    "GATO",
    "GUIÑO",
    "PERSONA",
    "OCULTO"
];

class Game {
    constructor() {
        this.words = starterWords;
        this.randomWord;
        this.tries;
        this.guessesCorrect = 0;
        this.fails = 0;
        this.state = 0;
        this.win = 'Felicidades! Has adivinado, la palabra era:';
        this.lose = 'Oops! Has fallado, la palabra era:'
    }

    getRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.words.length);
        return Array.from(this.words[randomIndex]);
    };

    generateCharsetForSecretWord(randomWord){
        randomWord.forEach(char => {
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.innerHTML = char;
            span.classList.add('hidden');
            span.classList.add(`char__${char}`);
            div.appendChild(span);
            div.classList.add('hangedman-charset__guess');
            displayForGuesses.appendChild(div);
        });
    }

    validateInput(char){
        let value = char.toUpperCase();
        if(isAZ.test(value)){
            return value;
        } else {
            alert('Ingrese una letra');
        }
    }

    displayWrongChar(char){
        if(char){
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.innerHTML = char;
            span.classList.add(`char__${char}`);
            div.appendChild(span);
            div.classList.add('hangedman-charset__fail');
            displayForFails.appendChild(div);
        }
    }

    displayHangingZone(fails){
        if(fails<=10){
            document.querySelector(`.player__part-${fails}`).classList.remove('hidden');
        }
    }

    checkGuess(char, word){
        if(word.includes(char) && !this.tries.has(char)){
            displayForGuesses.querySelectorAll(`.char__${char}`).forEach(char =>{
                char.classList.remove('hidden');
                this.guessesCorrect++;
            })
            this.tries.add(char);
        } else{
            if(!this.tries.has(char) && typeof char === 'string'){
                this.displayWrongChar(char);
                this.tries.add(char);
                this.fails++;
                this.displayHangingZone(this.fails);
            }
        }
    }

    displayResultScreen(result, word){
        let fragment = new DocumentFragment;
        let resultDivContainer = document.createElement('div');
        resultDivContainer.classList.add(`message-${result}-container`);
        let resultDiv = document.createElement('div');
        resultDiv.classList.add(`message-${result}`);
        let image = document.createElement('img');
        image.setAttribute('src', `./img/${result}.gif`)
        let message = document.createElement('p');
        message.innerHTML = `${this[result]} ${word}`;
        resultDiv.appendChild(image);
        resultDiv.appendChild(message);
        resultDivContainer.appendChild(resultDiv)
        fragment.appendChild(resultDivContainer);
        resultDivContainer.addEventListener('click', e => {
            this.vanishAnimation(resultDivContainer);
        })
        document.body.append(fragment);
    }

    victory(word){
        this.state = -1;
        let result = 'win';
        let finalWord = word.join('');
        this.displayResultScreen(result, finalWord);
    }

    defeat(word){
        this.state = -1;
        let result = 'lose';
        let finalWord = word.join('');
        this.displayResultScreen(result, finalWord);
    }

    checkResult(word){
        if(this.guessesCorrect === word.length){
            this.victory(word);
        } else if(this.fails === 10){
            this.defeat(word);
        }
    }

    vanishAnimation = el => {
        el.style.opacity = 0;
        setTimeout(() => el.remove(), 500)
    }

    hidePlayer(){
        for(let i = 1; i<=10; i++){
            document.querySelector(`.player__part-${i}`).classList.add('hidden');
        }
    }

    removeAllLetters(){
        let guesses = displayForGuesses.querySelectorAll('.hangedman-charset__guess');
        guesses.forEach(guess => guess.remove());
        let fails = displayForFails.querySelectorAll('.hangedman-charset__fail');
        fails.forEach(fail => fail.remove());
    }

    restartGame() {
        this.hidePlayer();
        this.removeAllLetters();
        this.state = 1;
        this.guessesCorrect = 0;
        this.fails = 0;
        this.tries = new Set();
        this.randomWord = null;
    }

    giveUpGame(){
        this.state = 0;
        goToTitleScreen();
    }

    addNewWordToGame(){
        let newWord = (document.querySelector('#newword').value).trim().toUpperCase();
        if (isAZAdd.test(newWord)) {
            this.words.push(newWord);
            this.startNewGame();
            goToGameScreen();
        } else {
            newWordInput.value = '';
            alert('Ingrese una palabra de 3 a 8 letras');
        }
    }

    startNewGame(){
        this.restartGame()
        this.randomWord = this.getRandomWord();
        this.generateCharsetForSecretWord(this.randomWord);
        input.focus();

        input.addEventListener('input', e => {
            if(e.target.value){
                this.checkGuess(this.validateInput(e.target.value), this.randomWord);
                this.checkResult(this.randomWord);
                input.value = '';
            }
        })
    }
}

// Event listeners

document.addEventListener('click', e => {
    if (e.target.id === "newgame") {
        goToGameScreen();
        game.startNewGame();
        return
    } else if (e.target.id === "setup") {
        goToSetUpScreen();
        return
    } else if (e.target.id === "restart") {
        game.startNewGame();
        return;
    } else if (e.target.id === "giveup"){
        game.giveUpGame();
        return;
    } else if(e.target.id === "saveandstart"){
        game.addNewWordToGame();
        return;
    } else if(e.target.id === "cancel") {
        goToTitleScreen();
        return
    }
    if(game.state === 1){
        input.focus();
    }
});

// Initializing game

let game = new Game();