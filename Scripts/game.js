window.onload = init;
window.onresize = resizeboard;
var maindiv;
var canvas = null, ctx = null, dicecanvas = null, dicectx = null, upcanvas = null, upctx = null;
var roles = ["red", "yellow", "blue", "green"];
var routs = []; 
var specialPos = []; 

function init() {
    initPlayGround();
}
function initPlayGround() {
    document.getElementById("playGround").style.display = "";
    maindiv = document.getElementById("main");
    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");

    ctx.font = "20px helvetica"
    ctx.globalAlpha = 1.0;
    canvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        canvas.setAttribute('style', styleString);
    }
    var canvasStyle = {
        'background': '#00aaff',
        'border': '1px solid grey'
    };
    canvas.setStyle(canvasStyle);

    upcanvas = document.getElementById("playboard");

    upctx = upcanvas.getContext("2d");
    upcanvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        upcanvas.setAttribute('style', styleString);
    }
    var canvasStyle = {
        'border': '1px solid grey'
    };

    upcanvas.setStyle(canvasStyle);
    dicecanvas = document.getElementById("dice");
    dicectx = dicecanvas.getContext("2d");
    drawTheBoard();
	
	placeDefaultPlanes("red");
    placeDefaultPlanes("yellow");
    placeDefaultPlanes("blue");
    placeDefaultPlanes("green");
}
function drawTheBoard() {
    refreshBoard();
    drawSkyGradient();
    var boardmap = createMap();
	 ctx.font = "1em arial";
	//ctx.textAlign="center";
	ctx.fillStyle='black';
    for (var x = 0; x < 7; x++) {
        for (var y = 0; y < 7; y++) {
            switch (boardmap[y][x]) {
                case 0: break;
                case 1: ctx.putImageData(drawARegularTile("grey", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Expense", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
                case 2: ctx.putImageData(drawARegularTile("light blue", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y); 
						ctx.fillText("Event", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
                case 3: ctx.putImageData(drawARegularTile("blue", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y); 
						ctx.fillText("Opportunity", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
                case 4: ctx.putImageData(drawARegularTile("light pink", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Knowledge", tileWidth / 2 + tileWidth * x , (tileHeight*0.9)+ tileHeight * y,tileWidth);
						ctx.fillText("and training", tileWidth / 2 + tileWidth * x , (tileHeight*1.25)+ tileHeight * y,tileWidth);
						break;
				case 5: ctx.putImageData(drawARegularTile("green", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Opportunity", tileWidth / 2 + tileWidth * x , (tileHeight*0.9)+ tileHeight * y,tileWidth);
						ctx.fillText("(collect pay)", tileWidth / 2 + tileWidth * x , (tileHeight*1.25)+ tileHeight * y,tileWidth);
						break;
				case 6: ctx.putImageData(drawARegularTile("light maroon", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Job change", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
				case 7: ctx.putImageData(drawARegularTile("orange", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Celebration", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
				case 8: ctx.putImageData(drawARegularTile("lighter pink", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Academic", tileWidth / 2 + tileWidth * x , (tileHeight*0.9)+ tileHeight * y,tileWidth);
						ctx.fillText("Achievement", tileWidth / 2 + tileWidth * x , (tileHeight*1.25)+ tileHeight * y,tileWidth);
						break;
				case 9: ctx.putImageData(drawARegularTile("red", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Health issue", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
				case 10:ctx.putImageData(drawARegularTile("white", tileWidth, tileHeight), tileWidth / 2 + tileWidth * x, tileHeight / 2 + tileHeight * y);
						ctx.fillText("Start", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						break;
                	default: break;
            }
        }
    }
 
}
function createMap() {
    var mapxy = new Array();
    //notile:0, blue:1,green:2,red:3,yello:4;
	mapxy.push([2, 1, 2, 6, 2, 3, 7]);
    mapxy.push([5, 0, 0, 0, 0, 0, 5]);
    mapxy.push([2, 0, 0, 0, 0, 0, 2]);
    mapxy.push([4, 0, 0, 0, 0, 0, 8]);
    mapxy.push([3, 0, 0, 0, 0, 0, 1]);
	mapxy.push([2, 0, 0, 0, 0, 0, 2]);
    mapxy.push([1, 2, 9, 5, 1, 7, 3]);
//	mapxy.push([10, 0, 0, 0, 0, 0, 0]);
	return mapxy;
}

function createValueMap(){
	var mapxy = new Array();
	mapxy.push([7, 8, 9, 10, 11, 12, 13]);
    mapxy.push([6, 0, 0, 0, 0, 0, 14]);
    mapxy.push([5, 0, 0, 0, 0, 0, 15]);
    mapxy.push([4, 0, 0, 0, 0, 0, 16]);
    mapxy.push([3, 0, 0, 0, 0, 0, 17]);
	mapxy.push([2, 0, 0, 0, 0, 0, 18]);
    mapxy.push([1, 24, 23, 22, 21, 20, 19]);
}

function initiatePlaneRouts() {
    //fly over index -->17 ~ 29 **57 each~~
    var redRout = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    var yellowRout = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    var blueRout = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    var greenRout = [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    routs.push(redRout);
    routs.push(yellowRout);
    routs.push(blueRout);
    routs.push(greenRout);
}

var playStatus = (function () {
    var s = [];
    for (var k = 0; k < roles.length; k++) {
        var role = {
            self: false,
            name: null,
            color: roles[k],
            index: k,
            allowTakeOff: false,
            continuePlaying: false,
            fly: false,
            overLimit: 0,
            touchBaseCount: 0,
            win: false,
            planes: []
        };
        for (var j = 0; j < 4; j++) {
            var plane = {
                previousValue: -1,
                value: -1,
                pos: {
                    left: -1,
                    top: -1,
                    right: -1,
                    bottom: -1
                }
            };
            role.planes.push(plane);
        }
        s.push(role);
}
    return s;
})();

function refreshBoard() {
    canvasWidth = window.innerHeight;
    canvasHeight = window.innerHeight;
    maindiv.style.width = canvasWidth + "px";
    maindiv.style.height = canvasHeight + "px";
    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;
    upctx.canvas.width = canvasWidth;
    upctx.canvas.height = canvasHeight;
    tileWidth = Math.ceil(canvasWidth / 8);
	tileHeight = Math.ceil(canvasHeight / 8);
    dicectx.canvas.width = tileWidth * 4;
    dicectx.canvas.height = tileWidth * 6;
    document.getElementById("buttondiv").style.left = tileWidth * 2 + "px";
    document.getElementById("buttondiv").style.top = tileWidth * 7.5 + "px";
}
function resizeboard() {
    refreshBoard();
    drawTheBoard();
}
function drawSkyGradient() {
    var skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    skyGradient.addColorStop(0, 'yellow');
    skyGradient.addColorStop(1, '#ffffff');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}
function drawARegularTile(color, width,height) {
    var imgData = ctx.createImageData(width, height);
    var pos = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < width; y++) {
            var x2 = x - Math.ceil(width / 2);
            var y2 = y - Math.ceil(height / 2);
            var distance = Math.ceil(Math.sqrt(x2 * x2 + y2 * y2));
            setColor(color);
            imgData.data[pos++] = colorR;
            imgData.data[pos++] = colorG;
            imgData.data[pos++] = colorB;
            imgData.data[pos++] = colorA;
        }
    }
    return imgData;
}
function setColor(color) {
    switch (color) {
        case "grey": colorR = 204, colorG = 204, colorB = 204, colorA = 255; break;
        case "light blue": colorR = 102, colorG = 179, colorB = 255, colorA = 255; break;
        case "blue": colorR = 0, colorG = 0, colorB = 255, colorA = 255; break;
        case "light pink": colorR = 255, colorG = 102, colorB = 204, colorA = 255; break;
        case "green": colorR = 0, colorG = 205, colorB = 0, colorA = 255; break;
		case "orange": colorR = 255, colorG = 102, colorB = 0, colorA = 255; break;
		case "lighter pink": colorR = 255, colorG = 153, colorB = 255, colorA = 255; break;
		case "red": colorR = 255, colorG = 0, colorB = 0, colorA = 255; break;
		case "white": colorR = 120, colorG = 120, colorB = 120, colorA = 255; break;
		case "light maroon": colorR = 232, colorG = 28, colorB = 117, colorA = 255; break;
        default: colorR = 0, colorG = 0, colorB = 0, colorA = 0; break;
    }
}

function returnDiceImg(val) {
    var currentdice = "dice" + "one";
    switch (val) {
        case 1: currentdice = "dice" + "one"; break;
        case 2: currentdice = "dice" + "two"; break;
        case 3: currentdice = "dice" + "three"; break;
        case 4: currentdice = "dice" + "four"; break;
        case 5: currentdice = "dice" + "five"; break;
        case 6: currentdice = "dice" + "six"; break;
        default: break;
    }
    var img = document.getElementById(currentdice);
    return img;
}


function rolltheDice(btn) {
    dicectx.clearRect(0, 0, tileWidth * 3, tileWidth * 3);
    var diceposi = [0, 1, 1, 0];
    var diceposj = [0, 0, 1, 1];
    var i = -1;
    var rolling = setInterval(function () {
        dicectx.clearRect(tileWidth * 2 * (diceposi[i % 4]), tileWidth * 1.5 * (diceposj[i % 3]), tileWidth * 1.5, tileWidth * 1.5);
        diceValue = Math.floor((Math.random() * 6) + 1);
        var img = returnDiceImg(diceValue);
        i++;
        dicectx.drawImage(img, tileWidth * 2 * (diceposi[i % 4]), tileWidth * 1.5 * (diceposj[i % 3]), tileWidth * 1.5, tileWidth * 1.5);
    }, 180);
    setTimeout(function () {
        clearInterval(rolling);
    }, 2000);
}
 
function placeDefaultPlanes(color) {
    var redposes = [0.5, 7.5];
	var yellowposes = [0.75,7.5];
    var blueposes = [1,7.5];
    var greenposes = [1.25,7.5];
    var currentpos = null;
    var i_role = null;
    switch (color) {
        case "red": currentpos = redposes; i_role = 0; break;
        case "yellow": currentpos = yellowposes; i_role = 1; break;
        case "blue": currentpos = blueposes; i_role = 2; break;
        case "green": currentpos = greenposes; i_role = 3; break;
        default: break;
    }
    var currentplane = color + "plane";
    var img = document.getElementById(currentplane);
    upctx.shadowBlur = 10;
    upctx.shadowOffsetX = 2;
    upctx.shadowOffsetY = 2;
	upctx.shadowColor = "black";
	for (var tempPosInd = 0; tempPosInd < 4; tempPosInd++) {
		upctx.drawImage(img, tileWidth * currentpos[tempPosInd], tileWidth * currentpos[tempPosInd + 1], tileWidth/3, tileWidth/3);
        playStatus[i_role].planes[tempPosInd].pos.left = Math.floor(tileWidth * currentpos[tempPosInd]) - 1;
        playStatus[i_role].planes[tempPosInd].pos.top = Math.floor(tileWidth * currentpos[tempPosInd + 1]) - 1;
        playStatus[i_role].planes[tempPosInd].pos.right = Math.floor(tileWidth * currentpos[tempPosInd] + tileWidth) + 1;
        playStatus[i_role].planes[tempPosInd].pos.bottom = Math.floor(tileWidth * currentpos[tempPosInd + 1] + tileWidth) + 1;
}
}/*
function aPlaneClicked(clickedindex, selfclick) {
    var tempvar = clickedindex;
    if (selfclick) {
        var msg = JSON.stringify({ "planeclicked": tempvar });
        sendJSONMessage(msg);
    }	
    else {
        notMe = true;
    }
    
    if (diceValue == 0) {
        document.getElementById("info").innerText = "Please roll dice";
        return;
    }
    playhand.role.planes[tempvar].previousValue = playhand.role.planes[tempvar].value;
            playhand.role.planes[tempvar].value += diceValue;
            if (playhand.role.planes[tempvar].value < 57 && playhand.role.planes[tempvar].value > 0) {
                var tempRoutValue = routs[playhand.role.index][playhand.role.planes[tempvar].value - 1];
                
                    }
                }
        
            diceValue = 0; break;
    updatePlayBoard();
    if (onmobile) {
        dicectx.clearRect(0, 0, tileWidth * 2, tileWidth * 2);
    }
    else
        dicectx.clearRect(0, 0, tileWidth * 4, tileWidth * 4);
}
/*	
function updatePlayBoard() {
    var ifChangeHands = -1;
    if (playhand.role) {
        for (var i = 0; i < playhand.role.planes.length; i++) {
            if (ifChangeHands < playhand.role.planes[i].value)
                ifChangeHands = playhand.role.planes[i].value;
            if (playhand.role.planes[i].value != playhand.role.planes[i].previousValue) {//a plane needs to be moved
                var coordinates = moveAPlane(playhand.role.planes[i], playhand.role.planes[i].previousValue, playhand.role.planes[i].value);
                playhand.role.planes[i].pos.left = Math.floor(coordinates.co_x) - 1;
                playhand.role.planes[i].pos.top = Math.floor(coordinates.co_y) - 1;
                playhand.role.planes[i].pos.right = Math.floor(coordinates.co_x + tileWidth) + 1;
                playhand.role.planes[i].pos.bottom = Math.floor(coordinates.co_y + tileWidth) + 1;
                if (playhand.role.planes[i].previousValue == playhand.role.planes[i].value) {
                    handcount++;
                    changeHands();
                }
                break;
            }
        }
    }
    if (ifChangeHands == -1 && clickOverflow != true) {
        handcount++;
        changeHands();
    }
}*/