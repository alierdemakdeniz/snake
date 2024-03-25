const point = document.getElementById("point")
const timer = document.getElementById("timer")
const area = document.getElementById('area')
const box = document.querySelector(".box")
const showScore = document.getElementById("show-score")
const bestScore = document.getElementById("best-score")

let lose = false;
let snakeBody = [];
let foodY,
    foodX;
let p = 0;
let snakeX = 15;
let snakeY = 9;
let velX = 0,
    velY = 0;
let sn = 0;
let mn = 0;

let getPoints = [];
let score = 0;
let scoreUser;
bestScore.innerHTML = greatScore();
const myGame = setInterval(createGame, 125);
const timeLine = setInterval(time, 1000)
document.addEventListener("keydown", changeDirection)
changeFood();

//Yönlendirme için
function changeDirection(e) {
    if (lose === false) {
        if (e.key === "ArrowDown" && velY != -1) {
            velX = 0;
            velY = + 1
        } else if (e.key === "ArrowUp" && velY !== + 1) {
            velX = 0;
            velY = -1;
        } else if (e.key === "ArrowRight" && velX !== - 1) {
            velX = + 1;
            velY = 0;
        } else if (e.key === "ArrowLeft" && velX !== + 1) {
            velX = -1;
            velY = 0;
        }
        createGame();
    }
}
// Elmanın yerini değiştirmek için
function changeFood() {
    foodY = Math.floor(Math.random() * 30) + 1;
    foodX = Math.floor(Math.random() * 30) + 1;

    //elmanın yılanla aynı kordinata atanmamması için
    snakeBody.map(location => {

        if ((location[1], location[0]) == (foodY, foodX)) {

            changeFood();
        }
    })
}
//  oyun başlasın
function createGame() {

    let createHtml = `<div class="food" style="grid-area:${foodY}/${foodX}"> </div>`

    // elmayı yedikten sonra tekrardan oluşması için
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY])
        changeFood();
        p += 10;
        point.innerHTML = p

    }

    // yenen elmanın karesi yılanın bedenine eklmek için
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velX;
    snakeY += velY;

    // yılanın hareket etmesi için
    for (let i = 0; i < snakeBody.length; i++) {
        createHtml += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"> </div>`
        // yilan kendi gövedesine çarpdığı zaman oyun biter.
        if (i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver();
        }
    }

    //yılan çerçeveye çarptığında oyun döngüsü durması için
    if (snakeX === 31 || snakeX === 0 || snakeY === 0 || snakeY === 31) {

        gameOver();
    }

    area.innerHTML = createHtml;

}



function gameOver() {
    lose = true;
    clearInterval(myGame)
    clearInterval(timeLine)
    //score ekrana yazdırmak
    showScore.innerHTML = `score:${p}`;
    box.style.display = "flex";
    saveLocalStorage(p);

}

function time() {

    sn++
    if (sn <= 9) {
        sn = "0" + sn
    }
    if (sn === 60) {
        sn = 0;
        mn++
        if (mn <= 9) {
            mn = "0" + mn
        }

    }
    const minute = (mn + ":" + sn);
    timer.innerHTML = minute

}
function getLocalStorage() {
    if ( localStorage.getItem("points") === null) {
       
        getPoints = [];

    } else {
        getPoints = JSON.parse(localStorage.getItem("points"))
    }

}
function saveLocalStorage(p) {
    getLocalStorage();
    getPoints.push(p)
    localStorage.setItem("points", JSON.stringify(getPoints))

}
function greatScore() {
    getLocalStorage();
    for (let i = 0; i <= getPoints.length; i++) {
        if (getPoints[i] > score) {
            score = getPoints[i];
            scoreUser = score;
        }
    }
    if (scoreUser === undefined) {
        scoreUser = " ";
    }
    return scoreUser;
}