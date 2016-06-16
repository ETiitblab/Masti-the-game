window.onload = init;
window.onresize = resizeboard;
var moves;
var maindiv;
var canvas = null, ctx = null, dicecanvas = null, dicectx = null, upcanvas = null, upctx = null;
var roles = ["red", "yellow", "blue", "green"];
var roles_i=-1;
var redpos=0,greenpos=0,yellowpos=0,bluepos=0;
var mapxr = new Array();
var mapxye = new Array();
var mapxb = new Array();
var mapxg = new Array();
var mapy = new Array();
var valueMap = new Array();

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

function charValues()
{
	var mapab=new Array();
	mapab.push(["Expense"]);
	mapab.push(["Event"]);
	mapab.push(["Opportunity"]);
	mapab.push(["Knowledge and training"]);
	mapab.push(["Opportunity (collect pay)"]);
	mapab.push(["Job change"]);
	mapab.push(["Celebration"]);
	mapab.push(["Academic Achievement"]);
	mapab.push(["Health issue"]);	
	return mapab;
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
                	default: break;
            }
        }
    }
	ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;ctx.shadowColor = "black";
	
	ctx.clearRect(tileWidth * 2, tileWidth * 2, tileWidth * 2, tileWidth * 1.5);
	ctx.putImageData(drawARegularTile("blue", tileWidth * 2, tileWidth * 1.5), tileWidth * 2, tileWidth * 2);
	ctx.fillText("Opportunity",  tileWidth * 2.45, tileWidth * 2.75,tileWidth);
	
	ctx.clearRect(tileWidth * 4.1, tileWidth * 2, tileWidth * 2, tileWidth * 1.5);
	ctx.putImageData(drawARegularTile("light blue", tileWidth * 2, tileWidth * 1.5), tileWidth * 4.1, tileWidth * 2);
	ctx.fillText("Event",  tileWidth * 4.8, tileWidth * 2.75,tileWidth);
	
	ctx.clearRect(tileWidth * 4.1, tileWidth * 3.65, tileWidth * 2, tileWidth * 1.5);
	ctx.putImageData(drawARegularTile("grey", tileWidth * 2, tileWidth * 1.5), tileWidth * 4.1, tileWidth * 3.65);
	ctx.fillText("Expense",  tileWidth * 4.75, tileWidth * 4.4,tileWidth);
 
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
	return mapxy;
}


function ValueMap()
{
	valueMap.push([0,1,2,3,4,2,5,2,1,2,6,2,3,7,5,2,8,1,2,3,7,1,5,9,2]);
	return valueMap;
}

var playStatus = (function () {
    var s = [];
    for (var k = 0; k < roles.length; k++) {
        var role = {
            self: false,
            name: null,
            color: roles[k],
            index: k,
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
	var diceValue;
	var turn=roles[(++roles_i)%4];
    dicectx.clearRect(0, 0, tileWidth * 3, tileWidth * 3);
    var diceposi = [0, 1, 1, 0];
    var diceposj = [0, 0, 1, 1];
    var i = -1;
	dicectx.clearRect(0,0, tileWidth * 10, tileWidth * 10)
    var rolling = setInterval(function () {
        dicectx.clearRect(tileWidth * 2 * (diceposi[i % 4]), tileWidth * 1.5 * (diceposj[i % 3]), tileWidth * 1.5, tileWidth * 1.5);
        diceValue = Math.floor((Math.random() * 6) + 1);
        var img = returnDiceImg(diceValue);
        i++;
	dicectx.drawImage(img, tileWidth * 2 * (diceposi[i % 4]), tileWidth * 1.5 * (diceposj[i % 3]), tileWidth * 1.5, tileWidth * 1.5);
    }, 500);
	setTimeout(function () {
        clearInterval(rolling);
		drawTheBoard();
		movePlane(turn,diceValue);
		displayCard(turn);
    }, 1900);
}
 
 function displayCard(color){
	 var currentpos=0;
	 switch(color){
		case "red": currentpos = redpos; break;
        case "yellow": currentpos = yellowpos;break;
        case "blue": currentpos = bluepos; break;
        case "green": currentpos = greenpos; break;
        default: break;
	 }
	var nameValue=charValues();
	var placeValue=ValueMap();
	dicectx.font="30px helvetica";
	dicectx.clearRect(0,0, tileWidth * 8, tileWidth * 8);
	dicectx.putImageData(drawARegularTile("white", tileWidth * 8, tileWidth * 8),0,0);
	dicectx.fillText((nameValue[(placeValue[0][currentpos])-1][0]),tileWidth,tileWidth*2,tileWidth*2);
 }
 
function placeDefaultPlanes(color) {
    var redposes = [0.45, 7.5];
	var yellowposes = [0.70,7.5];
    var blueposes = [0.95,7.5];
    var greenposes = [1.20,7.5];
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
}
}
function pixelMap(color)
{
	mapxr.push([0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.45,1.45, 2.45, 3.45, 4.45, 5.45, 6.45, 6.45, 6.45, 6.45, 6.45, 6.45,6.45,5.45,4.45,3.45,2.45,1.45]);
	mapxye.push([0.70,0.70,0.70,0.70,0.70,0.70,0.70,0.70,1.70, 2.70, 3.70, 4.70, 5.70, 6.70, 6.70, 6.70, 6.70, 6.70, 6.70,6.70,5.70,4.70,3.70,2.70,1.70]);
	mapxb.push([0.95,0.95,0.95,0.95,0.95,0.95,0.95,0.95,1.95, 2.95, 3.95, 4.95, 5.95, 6.95, 6.95, 6.95, 6.95, 6.95, 6.95,6.95,5.95,4.95,3.95,2.95,1.95]);
	mapxg.push([1.20,1.20,1.20,1.20,1.20,1.20,1.20,1.20,2.20, 3.20, 4.20, 5.20, 6.20, 7.20, 7.20, 7.20, 7.20, 7.20, 7.20,7.20,6.20,5.20,4.20,3.20,2.20]);
	mapy.push([7.5,7,6,5,4,3,2,1,1,1,1,1,1,1,2,3,4,5,6,7,7,7,7,7,7]);
	switch (color){
		case "red":
					return [mapxr,mapy];
					break;
		case "yellow":
					return [mapxye,mapy];					
					break;
		case "blue":
					return [mapxb,mapy];					
					break;
		case "green":
					return [mapxg,mapy];					
					break;
		default: break;
	}
}

function movePlane(color,moves)
{
	switch (color) {
        case "red": redpos=redpos+moves;
				if(redpos>24){redpos=redpos%24;}
				break;
        case "yellow": yellowpos=yellowpos+moves; 
				if(yellowpos>24){yellowpos=yellowpos%24;}
				break;
        case "blue": bluepos=bluepos+moves; 
				if(bluepos>24){bluepos=bluepos%24;}
				break;
        case "green": greenpos=greenpos+moves; 
				if(greenpos>24){greenpos=greenpos%24;}
				break;
        default: break;
    }
	placePlane("red");
	placePlane("yellow");
	placePlane("blue");
	placePlane("green");
}

function placePlane(color)
{	
	var currentpos = null;
	var redposes;
	var yellowposes;
    var blueposes;
    var greenposes;
	
	var test=this.pixelMap(color);
    
	var i_role = null;
    switch (color) {
        case "red": 
				redposes = [test[0][0][redpos], test[1][0][redpos]];
				currentpos = redposes; i_role = 0;
				break;
        case "yellow":
				yellowposes = [test[0][0][yellowpos],test[1][0][yellowpos]];
				currentpos = yellowposes; i_role = 1;
				break;
        case "blue": 
				blueposes = [test[0][0][bluepos],test[1][0][bluepos]];
				currentpos = blueposes; i_role = 2;
				break;
        case "green":
				greenposes = [test[0][0][greenpos],test[1][0][greenpos]];
				currentpos = greenposes; i_role = 3;
				break;
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
} 
}
