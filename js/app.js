//DATA

const maxWordLength = 5 //length of word

let timeLeft = 11
let word = ''
let solution = allWords[allWords.length * Math.random() | 0].toLowerCase()
let tries = 1
let maxTries = 6
let lettersInRow = {
    correct: [],
    present: [],
    wrong: []
}



//info tooltips

const infoTooltip = document.querySelector('.info')
document.addEventListener('click', (event)=>{

    const mainDiv = document.querySelector('main')
    const tooltipDiv = document.querySelector('.tooltip')
    const keyboardDiv = document.querySelector('.keyboard')

    if(event.target.innerHTML==='info'){
        hideElement(mainDiv)
        hideElement(keyboardDiv)
        showElement(tooltipDiv)
        addContent(tooltipDiv)
    } else {
        hideElement(tooltipDiv)
        deleteContent(tooltipDiv)
        showElement(mainDiv)
        showElement(keyboardDiv)
    }

})

const addContent = (element) => {
    setTimeout(() => { element.innerHTML = `<p>© <a href="https://twitter.com/qNecro" target="blank">Necro</a> / <a href="https://www.instagram.com/yablko/" target="blank">Yablko</a></p>
    <p>This project was done while i needed to refresh my knowledge about js,tutorial by this guy => <a href="https://www.instagram.com/yablko/" target="blank">Yablko</a></p>
    <p>Rules: If you quess the wrong letter, it show up <span class="tile wrong">A</span> <br>
    Present letter but wrong place <span class="tile present">A</span> <br>
Correct letter <span class="tile correct">A</span></p>`
} , 1000)

}
    
const deleteContent = (element) =>{
    element.innerHTML = ''
}

const hideElement = (element) =>{
    element.classList.remove('animate__animated','animate__fadeIn','animate__fadeOut','hidden')
    element.classList.add('animate__animated','animate__fadeOut')
    setTimeout(() => { element.classList.add('hidden') }, 1000)
}

const showElement = (element) =>{
    element.classList.remove('animate__animated','animate__fadeIn','animate__fadeOut','hidden')
    element.classList.add('animate__animated','animate__fadeIn')
    setTimeout(() => { element.classList.remove('hidden') }, 1000)
}


//KEYBOARD

document.addEventListener('keydown',(event) =>{ //get keypress and decide what to do next
    //enter = submit
    if (event.key === 'Enter'){
        submitWord()
    }
    //backspace delete
    else if(event.key === 'Backspace'){
        removeLetter()
    }
    //if non of above, add letter
    else {
        addLetter(event.key)
    }

})


//click keyboard
const keyboardClick = document.querySelector('.keyboard')
// console.log(keyboardClick)
keyboardClick.addEventListener('click',(event) =>{
    if(event.target.nodeName !== 'BUTTON') return
    let character = event.target.id

    if(character === '⟲'){
        window.location.reload()
    }
    else if(character === '↵'){
        submitWord()
    }
    else if(character === '←'){
        removeLetter()
    }
    else{
        addLetter(event.target.id)
    }

})


//SUBMIT
const submitWord = () => {
    //prevent player from submitting shorter words than the answer
    if(word.length !==maxWordLength) return

    // //is it a real word?
    // if(!allWords.includes(word)){
    //     animateRowShake(currentRow())
    //     return
    // }

    findLettersInRow()


    highlightLetters(currentRow())

    animateTileReveal(currentRow())

    setTimeout(judgeResult, 1500);
    
};

//ADD LETTER
const addLetter = (character) => {
    //prevent player from entering longer words than the answer
    if(word.length >=maxWordLength) return
    //allow only letters
    if( /^\p{L}$/u.test(character) ){
        //add letter to quessing word
        word = word + character
        //change letter to lower case
        word = word.toLowerCase()
        //update current tile to entered letter
        let tile = currentTile()
        tile.innerHTML = character
        
        animateTileBounce(tile)
    }
};

//REMOVE LETTER
const removeLetter = () => {
    //prevent player from deleting letters below 0
    if(word.length <=0) return
    
    //update current tile to entered letter
    let tile = currentTile()
    tile.innerHTML = ''
    //remove last letter 
    word = word.slice(0, -1)
    tile.className = 'tile'
};

//TILE TO UPDATE
const currentTile = () => {
    return currentRow().querySelector(':nth-child(' + word.length + ')')
}

//CURRENT ROW
const currentRow = () => {
    return document.querySelector(`.row:nth-child(${tries})`)
};

//JUDGE RESULT
const judgeResult = () => {
    if( word === solution){
        animateTileDance(currentRow())
    }
    else if (tries >= maxTries){
        youVeryMuchLose()
    }
    else {
        word = ''
        tries ++

    }
};

const findLettersInRow = () => {
    let present = [];
    let correct = [];
    let wrong = [];

    [...word].forEach((letter, index) => {
        //letter in correct place
        if(solution.charAt(index) === letter){
            correct.push(letter)
        }
        //letter is in word but wron place
        else if(solution.includes(letter)){
            present.push(letter)
        }
        else {
            wrong.push(letter)
        }
    })

    lettersInRow = {
        present,wrong,correct
    }
};
