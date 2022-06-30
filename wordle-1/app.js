//selectors

const body=document.querySelector('body'),
header=document.querySelector('header'),
wrapper=document.querySelector('.wrapper'),
gameContainer=document.querySelector('.game-container')
startBtn=document.querySelector('.start')
info=document.querySelector('.info-text')
playAgainBtn=document.querySelector('.play-again')

let start =false
let submittedWord='';
let toFind=''
let rowCount=1;
let columnCount=1;

// initial fucntion
//to set height initially
setWrapperHeight()



// event listener
document.addEventListener('keyup',keyType)
startBtn.addEventListener('click',()=>{
    apiStart()
})
playAgainBtn.addEventListener('click',()=>playAgain())

//observer
// to set the wrapper height
const observer = new ResizeObserver((entries)=>{
    setWrapperHeight()
})

observer.observe(body)



function setWrapperHeight(){
    let heightLeft=body.offsetHeight-header.offsetHeight
    document.querySelector('.wrapper').style.height=heightLeft+'px'
}

//to show pressed key
function keyType(e){
    if(start){
        if(isLetter(e.key)){
            showInContainer(e.key)
        }
        else if(e.key==='Enter'){
            checkWord()
        }
        else if(e.key==='Backspace'){
            backspace()
        }
    }
}
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }


//populate game container
for(let i =0;i<6;i++){
    let rowClass=`row-${1+i}`
    let row = document.createElement('div')
    for (let j=0;j<5;j++){
        let columnClass=`column-${1+j}`
        let column=document.createElement('div')
        let box=`box-${i+1}-${j+1}`
        column.classList.add(box,rowClass,columnClass)
        column.classList.add('box')
        row.appendChild(column)
    }
    row.classList.add(rowClass)
    row.style.display='flex'
    gameContainer.appendChild(row)
}

//to show in the container
function showInContainer(letter){
    if(columnCount<=5 && rowCount<=6 ){
        const letterContainer=document.querySelector(`.box-${rowCount}-${columnCount}`)
        letterContainer.innerHTML=`<div>${letter.toUpperCase()}</div>`
        columnCount+=1
        submittedWord+=letter
    }
    
}

//to backspace letters
function backspace(){
    if(columnCount>1 && rowCount<=6){
        columnCount-=1
        const letterContainer=document.querySelector(`.box-${rowCount}-${columnCount}`)
        letterContainer.removeChild(letterContainer.firstElementChild);
        submittedWord=submittedWord.slice(0,submittedWord.length-1)
        console.log(submittedWord)
    }        
}

//submitting by enter
function checkWord(){
    if(submittedWord.length==5 && rowCount<=6){
        checkerApi=`https://api.dictionaryapi.dev/api/v2/entries/en/${submittedWord}`
        fetch(checkerApi).then(response=>response.json()).then((response)=>{
            if(response.title!="No Definitions Found"){
                matchResults()
                console.log('word is valid')
                rowCount+=1
                columnCount=1
                submittedWord=''
            }else{
                console.log('word is invalid')
            }
        })
    }
}

//to change colour of container
function changeColour(){
    if(submittedWord===toFind){
        toggleGreen(`.row-${rowCount}`)
    }


    console.log('working')
}

//to get random word
function apiStart(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64378e43e8msh976de5fdfc55fedp13249cjsn2b48a66e5148',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    };
    
    fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=5&wordLength=5', options)
        .then(response => response.json())
        .then(response => {console.log(response[0]);toFind=response[0]})
        .catch(err => console.error(err))
        .then(()=>{
            let setWord = new Set([...toFind]);
            console.log(setWord.size)
            if(setWord.size!=5){
                apiStart()
                console.log('why....?')
            }
            start=true
        }).then(()=>{
            toggleInactive('after-win-container')
            toggleInactive('game-container')
        });
}

function toggleGreen(box){
    document.querySelector(box).classList.add('green')
}
function toggleYellow(box){
    document.querySelector(box).classList.add('yellow')
}

function matchResults(){
    let a=0;
    for (let i=0;i<5;i++){
        
        if(submittedWord[i]===toFind[i]){
            toggleGreen(`.box-${rowCount}-${i+1}`)
            a+=1
            if(a==5){
                youWon()
            }
        }
        
        else if(toFind.includes(submittedWord[i])){
            toggleYellow(`.box-${rowCount}-${i+1}`)
        }
    }
}


function youWon(){
    console.log('you-won')
    toggleInactive('after-win-container');
    info.innerText='Yay! you won!'
    toggleInactive('play-again')
}

function toggleInactive(className){
    document.querySelector(`.${className}`).classList.toggle('inactive')
}

function playAgain(){
    location.reload();
}