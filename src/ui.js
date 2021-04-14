import * as map from "./map.js"
import {num} from './game.js'
export var divContainer = document.getElementById('game');
var pieceWidth = 45;
var pieceHeight = 45;

function setDivContainer() {
    divContainer.style.width = map.colNumber * pieceWidth + 'px';
    divContainer.style.height = map.rowNumber * pieceHeight + 'px';
}

function IsCorrect(row, col) {
    return map.correct.find(it => it.row === row && it.col === col) !==undefined;
}

function setOnePiece(row, col) {
    var value = map.arrMap[num][row][col];
    var div = document.createElement("div");

    div.className = 'item';
    div.style.left = col * pieceWidth + 'px';
    div.style.top = row * pieceHeight + 'px';

    var correct = IsCorrect(row, col);
    if (value === map.WALL) {
        div.classList.add('wall');
    } 
    else if (value === map.PLAYER) {
        div.classList.add('player');
    } 
    else if (value === map.BOX) {
        if (correct) {
            div.classList.add('currentBox');
        } else {
            div.classList.add('box');
        }
    } else if(value === map.SPACE) {
        if (correct) {
            div.classList.add('correct');
        } else {
            return;
        }
    }
    divContainer.append(div);
}

function set1() {
    divContainer.innerHTML = "";
    for (var row = 0; row < map.rowNumber; row++) {
        for (var col = 0; col < map.colNumber; col++) {
            setOnePiece(row, col);
        }
    }
}

export default function () {
    setDivContainer();
    set1(); 
}