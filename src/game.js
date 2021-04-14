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

function showWin() {//展示成功标志
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

function showScore() {//显示分数
    var score = document.createElement('div');
    score.className = "score";
    score.innerHTML = `${count}步`;
    divContainer.append(score);
}

function gameOver(){//显示游戏结束
    var End = document.createElement('div');
    End.className = "end";
    End.innerHTML = "游戏结束";
    divContainer.append(End);
}

function rebuild() {//重新渲染下一关卡的页面
    count = 0;
    Win.remove();
    btn.remove();
    divContainer.classList.remove('blur');//添加蒙层
    over = false;
    num++;
    showUI();
    showScore();
    if (num === 5) {//判断游戏是否结束
        gameOver();
    }
}

btn.onclick = function () {//点击按钮后按钮消失
    if (num < 5) {
        btn.style.display = "none";
        IsNextGame = false;
        rebuild();
    }
}


window.onkeydown = function (e) {//设置键盘响应事件
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

    if (result) {//每响应一回就判断结果
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
