console.log ("Hello world!")

const gameBoard = [ //initial game screen
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
]

//for visualization only player is currently at [7][2]
// const playerBoard = [ 
//     ["","","","",""],
//     ["","","","",""],
//     ["","","","",""],
//     ["","","","",""],
//     ["","","","",""],
//     ["","","","",""],
//     ["","","","",""],
//     ["","","🚘","",""],
//     ["","","","",""],
// ]

//initial player values
let player = {
    y:7,
    x:2,
    character: "🚖"
}

const emptyRow = ["","","","",""]
const visCol = ["🌴","","🌴","","🌴","","🌴","","🌴"]

const highScoreArr = [
    {name: "G_G", score: 4},
    {name: "_IS", score: 3},
    {name: "BST", score: 2},
]

let sortedScore = []

let name = ""
let scoreTimer = 0
let score = 0
let lives = 3
let timer = 0
let moveTimer = 1000
let altRow = true

let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)

const scoreEL = document.querySelector("#score")
const livesEL = document.querySelector("#lives")
const nameInput = document.querySelector("#name-input")
const startBtn = document.querySelector("#Start")
const greet = document.querySelector("#greetings-screen")
const hiScores = document.querySelector("#highscores")
const row = document.querySelectorAll(".row")
const controlsEL = document.querySelector("#controls")
const vCol = document.querySelectorAll(".Vcol")
const vCol2 = document.querySelectorAll(".Vcol2")
const welcomeDiv = document.querySelector("#welcome")
const crashSound = document.querySelector("#crash")
const musicSound = document.querySelector("#music")
const gameOverSound = document.querySelector("#gameOver")
const startSound = document.querySelector("#gameStart")

livesEL.innerText = `Lives: ${"🚖".repeat(lives)}`

//allows to access timers globally
let scoreInterval;
let moveInterval;
let speedTimeout;


//renders screen to match gameboard 
function renderBoard(){
    row.forEach((y,idy)=> 
        y.querySelectorAll(".column").forEach((x,idx) => 
            x.innerText = gameBoard[idy][idx])
    )
}


//visualization boards on sides of tablet/desktop version.
function renderVis(){
    vCol.forEach((x,idx) => {
        x.innerText = visCol[idx]
    })
    vCol2.forEach((x,idx) => {
        x.innerText = visCol[idx]
    })
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
        musicSound.volume = .5
        musicSound.play()
        startSound.play()
        renderBoard() 
        moveKB()
        movePlayerButtons()
        greet.style.display = "none"
        name = nameInput.value.toUpperCase()
        lives = 3
        scoreTimer = 0
        scoreInterval = setInterval(time,100)
            function time(){
                scoreTimer++
                score = scoreTimer * 100
                scoreEL.innerText = `Score: ${score}`
    } 
    isRunning = true
        moveBoard()
    })
}

//game ending logic
function gameEnd(){
    isRunning = false
    greet.style.display = "flex"
    highScoreArr.push({name, score})
    clearTimeout(speedTimeout)
    clearInterval(scoreInterval)
    clearInterval(moveInterval)
    // console.log(highScoreArr)
    gameOverSound.play()
    musicSound.pause()
    musicSound.currentTime = 1
    altRow = true
    moveTimer = 1000
    player.x = 2
    player.y = 7
    player.character = "🚖"
    welcomeDiv.innerText = `Game over ${name} :( Final score: ${score}`
    gameBoard.splice(0,9)
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
    // name = ""
    controlsEL.removeEventListener("click", moveCarM)
    window.removeEventListener("keydown", moveCarM)
    
}

//top 3 scores
function bestThree(){
    while(hiScores.firstChild){
        hiScores.removeChild(hiScores.firstChild)
    }
    for (i=0; i<3; i++){
        let top3 = document.createElement("li")
        sortedScore = highScoreArr.sort((a,b) =>(b.score - a.score))    
        top3.appendChild(document.createTextNode(sortedScore[i].   name + "    " + sortedScore[i].score))
        hiScores.appendChild(top3)
    }
}

//allows lives to work
function livesCheck(){
    if (lives){
        collisionCheck()
    } else {
        gameEnd()
    }

}

//checks if space is occupieed
//console logs for debugging
//If I don't check specificallly for X it will count the taxi as its own space and crash immediately.
function collisionCheck(){
    // console.log("Player X: " + player.x  +"Player Y: " + player.y)
    if(player.x < 0 || player.x > 4 ||player.y < 0|| player.y >8){
        crashSound.play()
        playerDiv.innerText = "💥"
        // console.log("you crashed :(" + "Player X: " + player.x  +"Player Y: " + player.y) 
        player.x = 2
        player.y = 7
        moveTimer = 1000
        lives--
    } else {
    playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
        }
             if (playerDiv.innerText === "X") {
                // console.log(playerDiv.innerText)
                crashSound.play()
                playerDiv.innerText = "💥"
                // console.log("you crashed :(" + "Player X: " + player.x  +"Player Y: " + player.y)
                moveTimer = 1000
                lives--
            } else {
                updatePlayer()
    }
    livesEL.innerText = `Lives: ${"🚖".repeat(lives)}`
}

//adding phone/window buttons controls
function movePlayerButtons(){ 
        controlsEL.addEventListener("click", moveCarM)
 }

 //adding keyboard controls
function moveKB(){
    window.addEventListener("keydown", moveCarM)
} 

//catch-all function for both control types
function moveCarM(e) {
    if (e.target.id === "right" || e.key === "ArrowRight"){
        playerDiv.innerText = ""
        player.x++
    } else if(e.target.id === "left" ||e.key === "ArrowLeft"){
        playerDiv.innerText = ""
        player.x--
    } else if(e.target.id === "up" || e.key === "ArrowUp"){
        playerDiv.innerText = ""
        player.y--
    } else if(e.target.id === "down" ||e.key === "ArrowDown"){
        playerDiv.innerText = ""
        player.y++
    }
    livesCheck()
}

//test version with accelration
function moveBoard(){
        moveInterval = setInterval(updateBoard,moveTimer)
        livesCheck()
                console.log(Math.round(1000/moveTimer * 36))
                function updateBoard(){
                    if (altRow === true){
                        gameBoard.unshift(emptyRow)
                        visCol.unshift("")
                    } if (altRow === false){
                        let rngIndex = Math.floor(Math.random() * obsBoard.length)
                        gameBoard.unshift(obsBoard[rngIndex])
                        visCol.unshift("🌴")
                    }
                    altRow = !altRow
                    visCol.pop()
                    gameBoard.pop()
                    renderBoard()
                    renderVis()
                    // collisionCheck() 
                    //this fixes some bugs but introduce others... (like explosion doesn't last anymore, but less flicker) :(
                    speedTimeout = setTimeout(timedown)
                        function timedown(){
                        if(moveTimer >300){
                            clearInterval(moveInterval)
                            moveTimer = moveTimer - 25
                            moveBoard()
                        } else{
                            clearInterval(moveInterval)
                            moveTimer = 300
                            moveBoard()
                        }  
                    }
                }   
}

// no acceleration version
// function moveBoard(){
//     moveInterval = setInterval(updateBoard,500)
//             let altRow = true
//             function updateBoard(){
//                 if (altRow === true){
//                     gameBoard.unshift(emptyRow)
//                 } if (altRow === false){
//                     let rngIndex = Math.floor(Math.random() * obsBoard.length)
//                     gameBoard.unshift(obsBoard[rngIndex])
//                 }
//                 altRow = !altRow
//                 gameBoard.pop()
//                 renderBoard()
//                 collisionCheck()
//             }
//         }



gameStart()
renderBoard()
renderVis()
updatePlayer()

