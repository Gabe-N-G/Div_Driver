console.log ("Hello world!")

const gameBoard = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
]


const playerBoard = [
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","🚘","",""],
    ["","","","",""],
]

const emptyRow = ["","","","",""]

const highScoreArr = [
    {name: "GG", score: 4},
    {name: "IS", score: 3},
    {name: "BST", score: 2},
]
let sortedScore = highScoreArr.sort((a,b) =>(b.score -a.score))

let name = ""
let score = 0
highScoreArr.push( {name, score})

let lives = 0
let timer = 0

const scoreEL = document.querySelector("#score")
const livesEL = document.querySelector("#lives")
const nameInput = document.querySelector("#name-input")
const startBtn = document.querySelector("#Start")
const greet = document.querySelector("#greetings-screen")
const hiScores = document.querySelector("#highscores")

//gamestart
startBtn.addEventListener("click",()=>{
    greet.style.display = "none"
    name = nameInput.value
    setInterval(time,100)
        function time(){
        timer++
        score = timer * 10
        scoreEL.innerText = `Score: ${score}`
    }
    console.log(name,score) 
})

//top 3 scores
for (i=0; i<3; i++){
    let top3 = document.createElement("li")    
    top3.appendChild(document.createTextNode(highScoreArr[i].name + "    " + highScoreArr[i].score))
    hiScores.appendChild(top3)
}

