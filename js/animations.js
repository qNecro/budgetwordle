
//BOUNCE WHEN YOU ADD NEW LETTER
const animateTileBounce = (tile) =>{
    tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn')
}


//ROTATE TILE WHEN SUBMITING EXISTING WORD
const animateTileReveal = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {

        //remove animation if it has any
        tile.classList.remove('animate__bounceIn','animate__flipInY')

        //animation upon submitting existing word
        //we use timeout so we have animation for each tile
        setTimeout(() => {
            tile.style.visibility = 'visible'
          tile.classList.add('animate__flipInY',`animate__delay-${index}s`);
        }, 0);
        
    });
}

//DANCE WHEN YOU WIN
const animateTileDance = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {
        //remove animation if it has any
        tile.classList.remove('animate__bounceIn','animate__flipInY', 'animate__bounce')
        
        setTimeout(() => {
            //animation upon submitting correct word
          tile.classList.add('animate__bounce',`animate__delay-${index}s`);
        }, 0);
        
    });
}

//SHAKE WHOLE ROW, WHEN YOU SUBMIT NON-EXISTING WORD
const animateRowShake = (row) => {
    //remove animation if it has any
    row.classList.remove('animate__shakeX')
   setTimeout(() => {
       //animation upon submitting non-existing word
    row.classList.add('animate__animated', 'animate__shakeX');
   }, 0);
   
};

//GAME OVER
const youVeryMuchLose = () => {
    let board = document.querySelector('.board')
    board.classList.add('animate__animated', 'animate__hinge')

    board.addEventListener('animationend', ()=>{
        document.querySelector('.solution').style.setProperty('--animate-duration', '2.5s')
        document.querySelector('.solution').innerHTML = `The solution was : <span id="solutionSpan">${solution}</span>`
        document.querySelector('.solution').classList.add('visible', 'animate__animated', 'animate__fadeIn');
    })
};

//COLOR CHANGE
const highlightLetters = (row) => {
let presentLetters = []

    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.style.visibility = 'hidden'
        //check letter by index
        let tileLetter = word.charAt(index)
        //create variable for later,for now set it to wrong
        let colorClass = 'wrong'
    
        //if a letter is both 'present' and 'correct' show only 'correct'
        //only show each 'present' letter once 
        if (solution.includes(tileLetter)){
            if(!lettersInRow.correct.includes(tileLetter) && !presentLetters.includes(tileLetter)){
                //if yes then add class present to the current tile
                colorClass = 'present'
                presentLetters.push(tileLetter)
            }
        }
        //Does the SOLUTION include entered letter(tileLetter) and its on correct place?
        if (solution.charAt(index)=== tileLetter){
            //if yes then add class correct to the current tile
            colorClass = 'correct'
        } 
        //add corresponding color to tiles
        
        tile.classList.add(colorClass)})


    //keyboard in footer
    document.querySelectorAll('.keyboard .tile').forEach(tile =>{

        
        //create var for color
        let colorClass = ''

        //look for letters in rows,if present then add corresponding css class
        //the order is important because of CSS ordering
        if(lettersInRow.wrong.includes(tile.id)) colorClass='wrong'
        if(lettersInRow.present.includes(tile.id)) colorClass='present'
        if(lettersInRow.correct.includes(tile.id)) colorClass='correct'

        setTimeout(() => { 
            if(colorClass) tile.classList.add(colorClass)
         }, 1500)
    })
}
