import * as map from "./map.js"
import {num} from './game.js'
function getPlayerPoint(){
    for (var row = 0; row < map.rowNumber; row++) {
        for (var col = 0; col < map.colNumber; col++) {
            if (map.arrMap[num][row][col] === map.PLAYER) {
                return {
                    row: row,
                    col: col
                }
            }
        }
    }
    throw new Error("地图上居然没有玩家");
}
function getNextInfo(row,col,direction){
    if (direction === "left") {
        return {
            row: row,
            col: col - 1,
            value: map.arrMap[num][row][col - 1]
        }
    }
    else if (direction === "right") {
        return {
            row: row,
            col: col + 1,
            value: map.arrMap[num][row][col + 1]
        }
    }
    else if (direction === "up") {
        return {
            row: row - 1,
            col: col,
            value: map.arrMap[num][row - 1][col]
        }
    }
    else {
        return {
            row: row + 1,
            col: col,
            value: map.arrMap[num][row + 1][col]
        }
    }
}
function exchange(point1,point2){
    var temp = map.arrMap[num][point1.row][point1.col];
    map.arrMap[num][point1.row][point1.col] = map.arrMap[num][point2.row][point2.col];
    map.arrMap[num][point2.row][point2.col] = temp;
}

export function playerMove(direction){
    var playerPoint = getPlayerPoint();
    var nextInfo = getNextInfo(playerPoint.row,playerPoint.col,direction);
    if(nextInfo.value===map.WALL){
        return false;
    }
    if(nextInfo.value===map.SPACE){
        exchange(playerPoint,nextInfo);
        return true;
    }
    else{
        var nextNextInfo = getNextInfo(nextInfo.row,nextInfo.col,direction);
        if(nextNextInfo.value===map.SPACE){
            exchange(nextInfo,nextNextInfo);
            exchange(playerPoint,nextInfo);
            return true;
        }else{
            return false;
        }
    }
}

export function IsWin(){
    for(var i=0;i<map.correct.length;i++){
        var p=map.correct[i];
        if(map.arrMap[num][p.row][p.col]!==map.BOX){
            return false;
        }
    }
    return true;
}