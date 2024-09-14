console.log ("Hello world!")

const gameBoard = [
    ["x","","","",""],
    ["","x","","",""],
    ["","","x","",""],
    ["","","","x",""],
    ["","","","","x"],
    ["","","","x",""],
    ["","","x","",""],
    ["","x","","",""],
    ["x","","","",""],
]


const playerBoard = [ //for visualization only
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

let player = {
    y:7,
    x:2,
    character: "🚘"
}

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
const row = document.querySelectorAll(".row")
// const test = document.querySelector("y0x0")



//renders screen to match gamebaord 
function renderBoard(){
    row.forEach((y,idy)=> 
        y.querySelectorAll(".column").forEach((x,idx) => 
            x.innerText = gameBoard[idy][idx])
    )
}

//renders player to player coordinates
function updatePlayer(){
    let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
    playerDiv.innerText = player.character
}

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


//player movement here
function movePlayer(){
    window.addEventListener(
        "keydown",(e) =>{
            if (e.key === "ArrowRight"){
                let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
                playerDiv.innerText = ""
                player.x++
                updatePlayer()
            } else if(e.key === "ArrowLeft"){
                let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
                playerDiv.innerText = ""
                player.x--
                updatePlayer()
            } else if(e.key === "ArrowUp"){
                let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
                playerDiv.innerText = ""
                player.y--
                updatePlayer()
            } else if(e.key === "ArrowDown"){
                let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
                playerDiv.innerText = ""
                player.y++
                updatePlayer()
            }
        }
    )
}
renderBoard()
updatePlayer()
movePlayer()

