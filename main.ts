function guessCharacter () {
    letter = game.askForString("Enter a character", 1)
    output = ""
    if (checkCharGuessed(letter)) {
        game.splash("You've already guessed " + letter + ". Try another letter.")
        return
    }
    guessedLetters.push(letter)
    if (secretWord.includes(letter)) {
        game.splash("" + letter + " is in the word!")
        found = findLetterIndices(letter)
        for (let j = 0; j <= numLetters - 1; j++) {
            if (found.indexOf(j) >= 0) {
                progress[j] = letter
            }
        }
        for (let value of progress) {
            output = "" + output + value
        }
        game.splash(output)
        if (!(progress.indexOf("_") >= 0)) {
            gameWon()
        }
    } else {
        updateProgressMessage()
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    guessWord()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    guessCharacter()
})
function findLetterIndices (charGuess: string) {
    indices = []
    for (let k = 0; k <= numLetters; k++) {
        if (secretWord[k] == charGuess) {
            indices.push(k)
        }
    }
    return indices
}
function updateProgressMessage () {
    numGuesses = numGuesses - 1
    game.splash("Nope, guess again!", "Number of guesses left: " + numGuesses)
    if (numGuesses == 0) {
        game.splash("GAME OVER. The secret word was \"" + secretWord + "\"")
        game.over(false, effects.melt)
    }
}
function guessWord () {
    word = game.askForString("Enter a word", 12)
    if (word == secretWord) {
        game.splash("a g a i n")
        gameWon()
    } else {
        updateProgressMessage()
    }
}
function checkCharGuessed (charGuess: string) {
    if (guessedLetters.indexOf(charGuess) >= 0) {
        return true
    } else {
        return false
    }
}
function gameWon () {
    game.splash("Congrats! You have guessed the word! You Win!")
    game.over(true, effects.confetti)
}
let word = ""
let indices: number[] = []
let found: number[] = []
let output = ""
let letter = ""
let guessedLetters: string[] = []
let progress: string[] = []
let numGuesses = 0
let numLetters = 0
let secretWord = ""
secretWord = "again"
numLetters = secretWord.length
numGuesses = 6
progress = []
guessedLetters = []
for (let index = 0; index < numLetters; index++) {
    progress.push("_")
}
game.splash("Welcome to the Word Game! A to guess letter, B to guess word.")
