console.log ("Hello world!")

const gameBoard = [
    ["L","E","","T","S"],
    ["","G","","O",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
]


const obsBoard = [ //manually made, probably can make programially
    ["X","","","",""],
    ["","X","","",""],
    ["","","X","",""],
    ["","","","X",""],
    ["","","","","X"],
    ["X","X","","",""],
    ["X","","X","",""],
    ["X","","","X",""],
    ["X","","","","X"],
    ["","X","X","",""],
    ["","X","","X",""],
    ["","X","","","X"],
    ["","","X","X",""],
    ["","","X","","X"],
    ["","","","X","X"],
    ["X","X","X","",""],
    ["X","X","","X",""],
    ["X","X","","","X"],
    ["","X","X","X",""],
    ["","X","X","","X"],
    ["","","X","X","X"],
    ["X","X","X","X",""],
    ["","X","X","X","X"],
    ["X","","X","X","X"],
    ["X","X","","X","X"],
    ["X","X","X","","X"],
]

const playerBoard = [ //for visualization only player is currently at [7][2]
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
    character: "🚖"
}

const emptyRow = ["","","","",""]

const highScoreArr = [
    {name: "GG", score: 4},
    {name: "IS", score: 3},
    {name: "BST", score: 2},
]

let sortedScore = []

let name = ""
let scoreTimer = 0
let score = 0
let lives = 0
let timer = 0


let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)

const scoreEL = document.querySelector("#score")
const livesEL = document.querySelector("#lives")
const nameInput = document.querySelector("#name-input")
const startBtn = document.querySelector("#Start")
const greet = document.querySelector("#greetings-screen")
const hiScores = document.querySelector("#highscores")
const row = document.querySelectorAll(".row")
const controlsEL = document.querySelector("#controls")

let storeInterval;
let moveInterval



//renders screen to match gameboard 
function renderBoard(){
    row.forEach((y,idy)=> 
        y.querySelectorAll(".column").forEach((x,idx) => 
            x.innerText = gameBoard[idy][idx])
    )
}

//renders player to player coordinates
function updatePlayer(){
    playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
    playerDiv.innerText = player.character
}

//gamestart 
function gameStart(){
    bestThree()    
    startBtn.addEventListener("click",()=>{
        greet.style.display = "none"
        name = nameInput.value
        scoreInterval = setInterval(time,100)
            function time(){
                scoreTimer++
                score = scoreTimer *100
                scoreEL.innerText = `Score: ${score}`
    } 
        console.log(name)
        moveBoard()
        movePlayerKB()
        movePlayerButtons()
    })
}

function gameEnd(){
    greet.style.display = "flex"
    console.log (name + " " + score)
    highScoreArr.push({name, score})
    clearInterval(scoreInterval)
    clearInterval(moveInterval)
    console.log(highScoreArr)
    player.x = 2
    player.y = 7
    player.character = "🚖"
    gameBoard.splice(0,9)
    console.log(gameBoard)
    gameBoard.push(
        ["L","E","","T","S"],
        ["","G","","O",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],)
    bestThree()
    
    name = ""
    score = ""

}

//top 3 scores
function bestThree(){
    while(hiScores.firstChild){
        hiScores.removeChild(hiScores.firstChild)
    }
    for (i=0; i<3; i++){
        let top3 = document.createElement("li")
        sortedScore = highScoreArr.sort((a,b) =>(b.score -a.score))    
        top3.appendChild(document.createTextNode(sortedScore[i].   name + "    " + sortedScore[i].score))
        hiScores.appendChild(top3)
    }
}

//checks if space is occupieed
function collisionCheck(){
    if(player.x < 0 || player.x > 4 ||player.y < 0|| player.y >8){
        playerDiv.innerText = "💥"
        console.log("you crashed :(") 
        // game over behavior here
        gameEnd()
    } else {
    playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
        }
             if (playerDiv.innerText) {
                playerDiv.innerText = "💥"
                console.log("you crashed :(")
                //game over behavior here
                gameEnd()
            } else {
                updatePlayer()
    }
}


//player movement keyboard here
function movePlayerKB(){
    window.addEventListener(
        "keydown",(e) =>{
            if (e.key === "ArrowRight"){
                playerDiv.innerText = ""
                player.x++
            } else if(e.key === "ArrowLeft"){
                playerDiv.innerText = ""
                player.x--
            } else if(e.key === "ArrowUp"){
                playerDiv.innerText = ""
                player.y--
            } else if(e.key === "ArrowDown"){
                playerDiv.innerText = ""
                player.y++
            }
            collisionCheck()
        }
    )
} 
function movePlayerButtons(){ // can I combined with keyboard controls with and/ors?
    controlsEL.addEventListener(
        "click",(e) =>{
            console.log(e.target.id)
            if (e.target.id === "right"){
                playerDiv.innerText = ""
                player.x++
            } else if(e.target.id === "left"){
                playerDiv.innerText = ""
                player.x--
            } else if(e.target.id === "up"){
                playerDiv.innerText = ""
                player.y--
            } else if(e.target.id === "down"){
                playerDiv.innerText = ""
                player.y++
            }
            collisionCheck()
        }
    )
} 


function moveBoard(){
    moveInterval = setInterval(updateBoard,500)
            let altRow = true
            function updateBoard(){
                if (altRow === true){
                    gameBoard.unshift(emptyRow)
                } if (altRow === false){
                    let rngIndex = Math.floor(Math.random() * obsBoard.length)
                    gameBoard.unshift(obsBoard[rngIndex])
                }
                altRow = !altRow
                gameBoard.pop()
                renderBoard()
                collisionCheck()
            }
        }

// Eventually will code in acceleration 

// let updateTimer = 1000
// setInterval(updateBoard,1000)
//     function updateBoard(){
//         setTimeout(timedown,updateTimer)
//             function timedown(){
//                 console.log(updateTimer)
//                 let rngIndex = Math.floor(Math.random() * obsBoard.length)
//                 gameBoard.unshift(obsBoard[rngIndex])
//                 // gameBoard.unshift(emptyRow)
//                 gameBoard.pop()
//                 renderBoard()
//                 collisionCheck()
//                 updateTimer--
//                 updateBoard()
//             }
//         }


gameStart()
renderBoard()
updatePlayer()
// moveBoard()
// movePlayerKB()
// movePlayerButtons()
