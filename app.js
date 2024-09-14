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

let playerDiv = document.querySelector("#y"+player.y+"x"+player.x)

const scoreEL = document.querySelector("#score")
const livesEL = document.querySelector("#lives")
const nameInput = document.querySelector("#name-input")
const startBtn = document.querySelector("#Start")
const greet = document.querySelector("#greetings-screen")
const hiScores = document.querySelector("#highscores")
const row = document.querySelectorAll(".row")



//renders screen to match gamebaord 
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

//checks if space is occupieed
function collisionCheck(){
    if(player.x < 0 || player.x > 4 ||player.y < 0|| player.y >8){
        playerDiv.innerText = "💥"
        console.log("you crashed :(")
    } else {
    playerDiv = document.querySelector("#y"+player.y+"x"+player.x)
        }
             if (playerDiv.innerText) {
                playerDiv.innerText = "💥"
                console.log("you crashed :(")
            } else {
                updatePlayer()
    }
}


//player movement here
function movePlayer(){
    window.addEventListener(
        "keydown",(e) =>{
            if (e.key === "ArrowRight"){
                playerDiv.innerText = ""
                player.x++
                collisionCheck()
            } else if(e.key === "ArrowLeft"){
                playerDiv.innerText = ""
                player.x--
                collisionCheck()
            } else if(e.key === "ArrowUp"){
                playerDiv.innerText = ""
                player.y--
                collisionCheck()
            } else if(e.key === "ArrowDown"){
                playerDiv.innerText = ""
                player.y++
                collisionCheck()
            }
        }
    )
}




renderBoard()
updatePlayer()
movePlayer()

