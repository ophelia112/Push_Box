import showUI from "./ui.js"
import { playerMove, IsWin } from "./player.js"
import { divContainer } from "./ui.js"
var count = 0;
var over = false;
var btn = document.createElement('div');
var Win = document.createElement('div');
var oBody = document.getElementsByTagName("body")[0];
export var num = 0;
export let IsNextGame = false;
showUI();
showScore();

function showWin() {
    Win.className = "win";
    Win.innerHTML = "Win!!!";
    btn.className = "btn";
    btn.innerHTML = "下一关";
    btn.style.display = "block";
    divContainer.className = "blur";
    divContainer.append(Win);
    oBody.append(btn);
    IsNextGame = true;
}

function showScore() {
    var score = document.createElement('div');
    score.className = "score";
    score.innerHTML = `${count}步`;
    divContainer.append(score);
}

function gameOver(){
    var End = document.createElement('div');
    End.className = "end";
    End.innerHTML = "游戏结束";
    divContainer.append(End);
}

function rebuild() {//
    count = 0;
    Win.remove();
    btn.remove();
    divContainer.classList.remove('blur');
    over = false;
    num++;
    console.log(num);
    showUI();
    showScore();
    if (num === 5) {
        gameOver();
    }
}

btn.onclick = function () {
    if (num < 5) {
        btn.style.display = "none";
        IsNextGame = false;
        rebuild();
    }
}


window.onkeydown = function (e) {
    if (over) {
        return;
    }
    var result = false;
    if (e.key === "ArrowUp") {
        result = playerMove("up");
    }
    else if (e.key === "ArrowDown") {
        result = playerMove("down")
    }
    else if (e.key === "ArrowLeft") {
        result = playerMove("left")
    }
    else if (e.key === "ArrowRight") {
        result = playerMove("right")
    }

    if (result) {
        showUI();
        count++;
        showScore();
        if (IsWin()) {
            console.log("win");
            showWin();
            over = true;
        }
    }
}
