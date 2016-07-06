window.onload = init;
window.onresize = resizeboard;
var GI=[1000,2000,3000,4000];
var NI=[3000,4000,5000,6000];
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
var oppurValue = new Array();
var eventValue = new Array();
var expenseValue = new Array();
var SI =[0,0,0,0];
var MU =[0,0,0,0];
var RS =[0,0,0,0];
var WB =[0,0,0,0];

function randomizer(size){
	var a=new Array()
	for (i=0;i<size;++i) a.push(i);
	
	function shuffle(array) {		
		var tmp, current, top = array.length;
		if(top){
			while(--top) {
		current = Math.floor(Math.random() * (top + 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
		}
  }
  return array;
}
a = shuffle(a);
return a;
}

function init() {
    initPlayGround();
	for(var i=0;i<4;i++)
	{
		MU[i]=2*GI[i];
	}
	oppurValue=randomizer(36);
	eventValue=randomizer(24);
	expenseValue=randomizer(24);
		displayDetails();
	for(var i=0;i<4;i++)
	{
		MU[i]=2*GI[i];
	}
}

CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {

    var lines = text.split("\n");

    for (var i = 0; i < lines.length; i++) {

        var words = lines[i].split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = this.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }

        this.fillText(line, x, y);
        y += lineHeight;
    }
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
	
	pcanvas = document.getElementById("player");
    pctx = pcanvas.getContext("2d");

    pctx.font = "20px helvetica"
    pctx.globalAlpha = 1.0;
    pcanvas.setStyle = function (styleMap) {
        var styleString = new String();
        for (i in styleMap) {
            styleString += i + ':' + styleMap[i] + '; ';
        }
        pcanvas.setAttribute('style', styleString);
    }
    var canvasStyle = {
        'background': '#000000',
        'border': '1px solid grey'
    };
    pcanvas.setStyle(canvasStyle);
}


function displayDetails(){
	pctx.font = "12px arial";
	pctx.fillStyle='black';
	//pctx.clearRect(tileWidth *8, tileWidth * 8,0,0);
	pctx.putImageData(drawARegularTile("white", tileWidth *8, tileWidth * 8),0,0);
	//placing the permanent labels
	pctx.wrapText("MU",tileWidth*1,tileWidth*0.25,tileWidth,tileWidth*0.5);
	pctx.wrapText("WB",tileWidth*1.7,tileWidth*0.25,tileWidth*0.5,tileWidth);
	pctx.wrapText("RS",tileWidth*2.4,tileWidth*0.25,tileWidth*0.5,tileWidth);
	pctx.wrapText("SI",tileWidth*3.1,tileWidth*0.25,tileWidth*0.5,tileWidth);
	pctx.wrapText("Player 1",tileWidth*0.3,tileWidth*0.5,tileWidth*2,tileWidth);
	pctx.wrapText("Player 2",tileWidth*0.3,tileWidth*0.75,tileWidth*2,tileWidth);
	pctx.wrapText("Player 3",tileWidth*0.3,tileWidth*1,tileWidth*2,tileWidth);
	pctx.wrapText("Player 4",tileWidth*0.3,tileWidth*1.25,tileWidth*2,tileWidth);
	
	var i=0;
	//placing the scores
	for(i=0;i<4;i++){
		pctx.fillText(MU[i],tileWidth,tileWidth*(0.5+(i*0.25)),tileWidth);
		pctx.fillText(WB[i],tileWidth*1.7,tileWidth*(0.5+(i*0.25)),tileWidth*0.5);
		pctx.fillText(RS[i],tileWidth*2.4,tileWidth*(0.5+(i*0.25)),tileWidth*0.5);
		pctx.fillText(SI[i],tileWidth*3.1,tileWidth*(0.5+(i*0.25)),tileWidth*0.5);
	
	}
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
						//ctx.fillText("Health issue", tileWidth / 2 + tileWidth * x , (tileHeight)+ tileHeight * y,tileWidth);
						ctx.wrapText("Health\n issue",tileWidth / 2 + tileWidth * x,(tileHeight)+ tileHeight * y,tileWidth,15);
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
		case "white": colorR = 255, colorG = 255, colorB = 255, colorA = 255; break;
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

function enablerolling(btn){
	document.getElementById("okay").hidden=true;
	document.getElementById("rollDice").disabled=false;
	dicectx.clearRect(0,0, tileWidth * 8, tileWidth * 8);
	displayDetails();
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
		document.getElementById("rollDice").disabled=true;
		document.getElementById("okay").hidden=false;
		displayCard(turn);
    }, 1900);
}
 
function placeText(name,color){
var textline;
var player_role;
switch(color){
	case "red":player_role=0;
			break;
	case "yellow":player_role=1;
			break;
	case "blue":player_role=2;
			break;
	case "green":player_role=3;
			break;
	default:break;
}
	switch(name){
		case "Academic Achievement":
			textline="You take efforts to upgrade your knowledge and its application in your work. Pay 500 MU towards\
			expenses. Gross income and net income increase by 200 MU. Get 6 RS and 4 WB units.";
			GI[player_role]+=200;
			NI[player_role]+=200;
			MU[player_role]-=500;
			RS[player_role]+=6;
			WB[player_role]+=4;
			break;
		case "Expense":
			textline=expense(player_role);
			break;
		case "Event":
			textline=Event(player_role);
			break;
		case "Opportunity":
			textline=opportunity(player_role);
			break;
		case "Knowledge and training":
			textline="You need to keep abreast of changing times and rapid technological developments. You must subscribe\
			to lifestyle, business and technology magazines, journals and publications. Pay 300 MU towards subscription charges. Get 5 RS and 5 WB units. ";
			MU[player_role]-=300;
			RS[player_role]+=5;
			WB[player_role]+=5;
			break;
		case "Opportunity (collect pay)":
			MU[player_role]+=GI[player_role];
			textline=opportunity(player_role);
			break;
		case "Job change":
			textline="You want a change and look for another job. Your gross income and net income increase by 400 MU. ";
			GI[player_role]+=400;
			NI[player_role]+=400;
			break;
		case "Celebration":
			textline="Your hard work results in success and is celebrated. Pay 500 MU for the party and get 5 RS units.";
			break;
			MU[player_role]-=500;
			RS[player_role]+=5;
		case "Health issue":	
			textline="You work under continued stress and face a serious health issue. Pay 700 MU for the treatment. If you have medical insurance, pay nothing. Lose 20 WB units.";
			MU[player_role]-=700;
			WB[player_role]+=20;
			break;
	}	
	return textline;
} 

 function displayCard(color){
	 var TextLine;
	 var titleText='';
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
	dicectx.clearRect(0,0, tileWidth * 7.5, tileWidth * 7.5);
	dicectx.putImageData(drawARegularTile("white", tileWidth * 7.5, tileWidth * 7.5),0,0);
	var name1=nameValue[(placeValue[0][currentpos])-1][0];
	dicectx.fillText(name1,tileWidth,tileWidth*1.5,tileWidth*2);
	TextLine=placeText(name1,color);
	//titleText=
	dicectx.font="15px helvetica";
	dicectx.wrapText(TextLine,tileWidth,tileWidth*2.2,200,16);

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
{	var curpos;
	switch (color) {
        case "red": 
				curpos=redpos;
				redpos=redpos+moves;
				if((curpos<5 && redpos>5) || (curpos<13 && redpos>13) || (curpos<21 && redpos>21))
				{
					MU[0]+=GI[0];
				}
				if(redpos>24){redpos=redpos%24;}
				break;
        case "yellow": 
				curpos=yellowpos;
				yellowpos=yellowpos+moves; 
				if((curpos<5 && yellowpos>5) || (curpos<13 && yellowpos>13) || (curpos<21 && yellowpos>21))
				{
					MU[1]+=GI[1];
				}
				if(yellowpos>24){yellowpos=yellowpos%24;}
				break;
        case "blue": 
				curpos=bluepos;
				bluepos=bluepos+moves; 
				if((curpos<5 && bluepos>5) || (curpos<13 && bluepos>13) || (curpos<21 && bluepos>21))
				{
					MU[2]+=GI[2];
				}
				if(bluepos>24){bluepos=bluepos%24;}
				break;
        case "green": 
				curpos=greenpos;
				greenpos=greenpos+moves;
				if((curpos<5 && greenpos>5) || (curpos<13 && greenpos>13) || (curpos<21 && greenpos>21))
				{
					MU[3]+=GI[3];
				}
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

function expense(i)
{
	var tl="";
	var optione=expenseValue[0]+1;
	expenseValue.splice(0,1);
	console.log(optione);
	if (optione==null)
	{	
		expenseValue=randomizer(24);
		expense();
}
else{
	switch (optione){
		case 1:tl="You decide to buy a brand new vehicle. Pay 200% of your net income as purchase price. \
		Reduce net income by 20% for meeting EMI payments and operating costs. Get 5 RS units.";
		
		titl="Buy a vehicle";break;
		
		case 2:tl="Go on a family vacation within the country. Pay 50% of your net income towards expenses. Get 15 WB units.";
		MU[i]-=(0.5*NI[i]);
		WB[i]+=15;
		titl="Vacation time";break;
		
		case 3:tl="It is time to pay for your children’s education and overall learning. You can select any one of the following options:";
		titl="Children education, sports, entertainment";break;
		
		case 4:tl="You decide to join a club for networking and staying fit. You can select any one of the following options:";
		titl="Club membership";break;
		
		case 5:tl="It is festival time and you participate in any of the following forms:";
		titl="Festival expenses";break;
		
		case 6:tl="There are occasions and events in the family. Your participation is required.";
		titl="Family events";break;
		
		case 7:tl="Your favourite sport event is in town. You must follow it and support your team. You can do this in any of the following ways:";
		titl="Live sports event";break;
		
		case 8:tl="You face a serious health issue. Medical check-ups, doctor visits and medicines take their toll. Pay 100% of your net income towards expenses. Lose 30 WB units.";
		MU[i]-=(NI[i]);
		WB[i]-=30;
		titl="Health expenses";break;
		
		case 9:tl="There is a marriage in the immediate family. Your participation is critical. Spend 100% of your net income for the expenses. Get 10 RS and 5 WB units.";
		MU[i]-=(NI[i]);
		RS[i]+=10;
		WB[i]+=5;
		titl="Marriage";break;

		case 10:tl="Your children perform well in their academic and sporting events. You decide to celebrate their achievements.\
		Pay 25% of your net income for expenses. Get 5 RS, 5 WB and 5 SI units. ";
		MU[i]-=(0.25*NI[i]);
		RS[i]+=5;
		WB[i]+=5;
		SI[i]+=5;
		titl="Children";break;
		
		case 11:tl="Your house needs repairs and renovation and you decide to undertake it immediately. You can do it in any of the following ways:";
		titl="House repairs and renovation";break;
		
		case 12:tl="You decide to purchase some durables and convenience equipment. Pay 100% of your net income. Get 5 WB units. ";
		MU[i]-=(NI[i]);
		WB[i]+=5;
		titl="Luxury goods, durables";break;
		
		case 13:tl="You are in celebration mood. Pay 50% of your net income and get 5 RS units.";
		MU[i]-=(0.5*NI[i]);
		RS[i]+=5;
		titl="Parties: birthday, anniversary, promotion";break;

		case 14:tl="There is a burglary and your valuables are taken away. Lose 50% of your investments in gold and jewellery,\
		lose 20 WB units. If you have taken burglary insurance, you lose nothing.";
		WB[i]-=20;
		titl="Theft";break;
		
		case 15:tl="You go out with your family for dinner. Spend 20% of your net income.";
		MU[i]-=(0.2*NI[i]);
		titl="Eating out";break;
		
		case 16:tl="You enjoy the latest movie with your family. Spend 20% of your net income.";
		MU[i]-=(0.2*NI[i]);
		titl="Movie day";break;
		
		case 17:tl="You enjoy the weekly market and go there to buy stuff. Spend 10% of your net income.";
		MU[i]-=(0.1*NI[i]);
		titl="Sunday market";break;
		
		case 18:tl="You wait for festival sales to pick up all you want at discounted prices. You splurge on purchases as everything is a bargain. Spend 40% of your net income.";
		MU[i]-=(0.4*NI[i]);
		titl="Festival sale";break;
		
		case 19:tl="You like to buy books and gadgets from the net. You get good deals and the latest items. Spend 30% of your net income.";
		MU[i]-=(0.3*NI[i]);
		titl="Online shopping";break;
		
		case 20:tl="Having the latest gadget is your soft corner. You decide to buy the latest handset to hit the market. Spend 50% of your net income.";
		MU[i]-=(0.5*NI[i]);
		titl="Mobile handset";break;
		
		case 21:tl="You buy new clothes for all in the family. Spend 40% of your net income.";
		MU[i]-=(0.4*NI[i]);
		titl="Clothing";break;
		
		case 22:tl="You just love buying footwear. Whether it is for work, walking, exercises, games or matching your clothes,\
		you need to have the best. Spend 20% of your net income.";
		MU[i]-=(0.2*NI[i]);
		titl="Footwear";break;
		
		case 23:tl="You need a new pair of spectacles. Spend 500 MU.";
		MU[i]-=500;
		titl="Optician";break;
		
		case 24:tl="You buy toys and games for children in the family. Spend 20% of your net income.";
		MU[i]-=(0.2*NI[i]);
		titl="Toys and games";break;
		
		default:
		tl="It's Working";
	}
}
	return titl+"\n\n"+tl;
}

function Event(i)
{
	var tl="";
	var optione=eventValue[0]+1;
	eventValue.splice(0,1);
	console.log(optione);
	if (optione==null)
	{	
		eventValue=randomizer(24);
		Event();
}
else{
	switch (optione){
		case 1:tl="Congratulations! You have been promoted. Your gross income and net income increase by 300 MU. Also get 5 RS units.";
		NI[i]+=300;
		GI[i]+=300;
		RS[i]+=5;
		titl="Promotion";break;
		
		case 2:tl="Your company side-lines you and you no longer do any exciting work. Lose 10% of your net income due to reduced variable pay. Lose 10 RS and 5 WB units.";
		NI[i]-=(0.1*NI[i]);
		GI[i]-=(0.1*NI[i]);
		RS[i]-=10;
		WB[i]-=5;
		titl="Side lined, on bench";break;
		
		case 3:tl="The industry you work in faces a severe recession. Times are bad and many companies are shutting down, controlling costs or reducing staff. \
		Getting an alternate job is also difficult. Lose 20% of your net income due to reduced variable pay. Lose 10 WB units. ";
		NI[i]-=(0.2*NI[i]);
		GI[i]-=(0.2*NI[i]);
		WB[i]-=10;
		titl="Recession";break;
		
		case 4:tl="Your marriage is on the rocks leading to divorce. Lose half your MU on hand, reduce all your investments by half. Lose 20 RS and 30 WB units. ";
		MU[i]-=(0.5*MU[i]);
		RS[i]-=20;
		WB[i]-=30;
		titl="Divorce";break;
		
		case 5:tl="Lose your job. Lose 10 RS and 10 WB units. Lose 1 turn to find another job of the same activity.";
		RS[i]-=10;
		WB[i]-=10;
		titl="Retrenchment";break;
		
		case 6:tl="Your employer relocates you to another city. If you accept the relocation, pay 500 MU towards relocation expenses.";
		
		MU[i]-=500;
		titl="Relocation";break;
		
		case 7:tl="Your hard work, sincerity and ability to achieve targets are recognized and you get rewarded. \
		Your gross income and net income increase by 300 MU. You also get 5 RS and 10 WB units. ";
		NI[i]+=300;
		GI[i]+=300;
		RS[i]+=5;
		WB[i]+=10;
		titl="Recognition";break;
		
		case 8:tl="";
		titl="Academic excellence";break;
		
		case 9:tl="You have surpassed your work targets resulting in good performance for the company. You are rewarded with a cash award of 50% of your net income. Get 10 RS units.";
		MU[i]+=(0.5*NI[i]);
		RS[i]+=10
		titl="Target achievement";break;
		
		case 10:tl="You decide to join a social organization to undertake activities in urban and semi-urban areas.\
		Reduce your net income by 10% towards expenses. Get 10 WB and 10 SI units.";
		NI[i]-=(0.1*NI[i]);
		GI[i]-=(0.1*NI[i]);
		WB[i]+=10;
		SI[i]+=10;
		titl="Join a social organization ";break;

		case 11:tl="You take a sabbatical and decide to spend time with villagers to understand their main concerns and issues. Lose 1 turn. Get 5 RS and 10 WB units.";
		RS[i]+=5;
		WB[i]+=10;
		titl="Sabbatical";break;
		
		case 12:tl="You decide to donate 50% of your net income to a social cause. Get 10 WB units.";
		MU[i]-=(0.5*NI[i]);
		WB[i]+=10;
		titl="Donation to charity";break;
		
		case 13:
		/*tl="Your good friend approaches you with a request to support him in his social activity. \
		You have an option to give up your job and join him on a full-time basis. Get 100% of your net income as dues and leave settlement. Get 20 RS and 10 WB units. ";
		titl="SE opportunity";break;*/
		tl="Your leave application for taking a family holiday has been declined due to work pressures and targets. \
		Your family is upset over this and so are you. Lose 10 WB units. ";
		WB[i]+=10;
		titl="Leave declined";break;
		
		case 14:
		/*tl="You have an option to retire from your job and start a full-time social activity. Get 100% of your gross income as dues and leave settlement. Get 10 WB units.";
		titl="Retirement";break;*/
		tl="You actively participate in business meetings; your thoroughness, balanced approach, \
		leadership quality and ability to create a win-win solution are appreciated. Get 10 RS and 5 WB units. ";
		RS[i]+=10;
		WB[i]+=5;
		titl="Good contribution in meetings";break;
		
		case 15:tl="";
		titl="Calamity";break;
		
		case 16:tl="Your leave application for taking a family holiday has been declined due to work pressures and targets. \
		Your family is upset over this and so are you. Lose 10 WB units. ";
		WB[i]+=10;
		titl="Leave declined";break;
		
		case 17:tl="You actively participate in business meetings; your thoroughness, balanced approach, \
		leadership quality and ability to create a win-win solution are appreciated. Get 10 RS and 5 WB units. ";
		RS[i]+=10;
		WB[i]+=5;
		titl="Good contribution in meetings";break;
		
		case 18:tl="You innovate and implement measures which help the company improve its processes, reducing wastage and costs. Get 5 RS and 10 SI units.";
		RS[i]+=5;
		SI[i]+=10;
		titl="Innovative solutions";break;
		
		case 19:tl="It is time for the annual performance appraisal. You get a good feedback from the management for the work done and initiatives taken. \
		Your gross income and net income increase by 200 MU.";
		GI[i]+=200;
		NI[i]+=200;
		titl="Annual performance appraisal";break;
		
		case 20:tl="You are often late in reporting to office. Your colleagues and management take note of it and your leaves get deducted. Lose 5 WB units. ";
		WB[i]-=5
		titl="Late coming";break;
		
		case 21:tl="Your intelligence, insights, hard work, commitment, perseverance and sincerity get noticed resulting in special assignments coming your way.\
		You get very good experience and earn a good reputation by executing the assignments. Get 20 RS units.";
		RS[i]+=20;
		titl="Work on special assignments";break;

		case 22:tl="You and your department achieved their targets and concluded an important assignment. \
		Get 25% of your net income as performance bonus. Also get 5 RS and 5 WB units.";
		MU[i]+=(0.25*NI[i]);
		RS[i]+=5;
		WB[i]+=5;
		titl="Performance bonus";break;

		case 23:tl="The company is facing difficult times and initiates various cost cutting measures. Your earlier freedom, perquisites, \
		travel and expense budgets are curtailed, resulting in hardship during execution. Lose 5 WB units. ";
		WB[i]-=5
		titl="Cost cutting";break;

		case 24:tl="Your initiative and reference has resulted in a big order for the company. You are rewarded for it.\
		Get 20% of your net income as sales incentive. Also get 5 RS units.";
		MU[i]+=(0.20*NI[i]);
		RS[i]+=5;
		titl="Big order";break;

		default:
		tl="It's Working";
	}
}
	return titl+"\n\n"+tl;
}


function opportunity(i)
{
	var tl="";
	var optione=oppurValue[0]+1;
	console.log(optione);
	oppurValue.splice(0,1);
	if (optione==null)
	{	
		oppurValue=randomizer(24);
		opportunity();
}
else{
	switch (optione){
		case 1:tl="You have an option to invest as much as you like in fixed deposits. Earn interest at 5% of the amount you decide to invest.\
		Alternately, you may decide to invest nothing. To invest nothing, write 0.";
		titl="Invest in fixed deposits";break;
		
		case 2:tl="You have an option to invest as much as you like in fixed deposits. Earn interest at 5% of the amount you decide to invest.\
		Alternately, you may decide to invest nothing.  To invest nothing, write 0.";
		titl="Invest in fixed deposits";break;
		
		case 3:tl="";
		titl="Insurance - life, medical, burglary";break;
		
		case 4:tl="You can subscribe to a pension fund. Reduce your net income by 20%.  To invest nothing, write 0.";
		titl="Pension fund";break;
		
		case 5:tl="You can buy as much gold and jewellery you want. Pay 500 MU for every unit of purchase. Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Gold, jewellery";break;
		
		case 6:tl="You can buy as much gold and jewellery you want. Pay 400 MU for every unit of purchase. Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Gold, jewellery";break;
		
		case 7:tl="You can buy as much gold and jewellery you want. Pay 300 MU for every unit of purchase. Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Gold, jewellery";break;
		
		case 8:tl="You can buy as much gold and jewellery you want. Pay 600 MU for every unit of purchase. Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Gold, jewellery";break;
		
		case 9:tl="You can buy as much stocks and mutual funds as you want. Pay 100 MU for every unit of stock purchased and 120 MU for every unit of mutual fund purchased.\
		Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Invest in stocks, mutual funds";break;
		
		case 10:tl="You can buy as much stocks and mutual funds as you want. Pay 90 MU for every unit of stock purchased and 110 MU for every unit of mutual fund purchased.\
		Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Invest in stocks, mutual funds";break;
		
		case 11:tl="You can buy as much stocks and mutual funds as you want. Pay 150 MU for every unit of stock purchased and 170 MU for every unit of mutual fund purchased.\
		Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Invest in stocks, mutual funds";break;
		
		case 12:tl="You can buy as much stocks and mutual funds as you want. Pay 200 MU for every unit of stock purchased and 220 MU for every unit of mutual fund purchased.\
		Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Invest in stocks, mutual funds";break;
		
		case 13:tl="You can buy as much stocks and mutual funds as you want. Pay 50 MU for every unit of stock purchased and 60 MU for every unit of mutual fund purchased. \
		Anyone can sell at this price.  To invest nothing, write 0.";
		titl="Invest in stocks, mutual funds";break;
		
		case 14:tl="Your investments have paid off giving good returns. All investments (gold, land, property, stocks, mutual funds) go up by 50%. \
		This benefit is for all players. Anyone can sell at this price.  To sell nothing, write 0.";
		titl="Your investments grow";break;
		
		case 15:tl="The economy is thriving with all-round growth and prosperity. All investments in stock and mutual funds double. \
		This benefit is for all players. Anyone can sell at this price.  To sell nothing, write 0.";
		titl="Good economic times";break;
		
		case 16:tl="The economy is running through a lean patch. Inflation is high, reducing purchasing power and demand. \
		All investments in stock and mutual funds reduce by 25%. This applies to all players. Anyone can sell at this price.  To sell nothing, write 0.";
		titl="Economic trouble";break;

		case 17:tl="The stock market is hit by a scam resulting in a major payment crisis. All holdings in stocks and mutual funds are reduced to half. \
		This applies to all players. Anyone can sell at this price.  To sell nothing, write 0.";
		titl="Stock scam";break;

		case 18:tl="You turn sceptical about the economy. You decide to play it safe and want to liquidate a part of your investments. You can sell any of your investments \
		(gold, stocks, mutual funds, land, property) at a profit of 50%. Each player must sell at least one unit of their investments. They can sell more. ";
		titl="Liquidate investments";break;

		case 19:tl="You decide to undertake a part-time activity. Increase your gross income and net income by 300 MU. ";
		titl="Part-time income";break;

		case 20:tl="You have an option to purchase your own house. Pay 200% of your net income as down payment. Reduce your net income by 40% for EMI payments. Get 10 RS and 10 WB units.";
		titl="Property - residential (for self-occupation)";break;
		
		case 21:tl="You have an option of purchasing a property for letting out. Pay 2,000 MU per unit of property purchased. Earn rent of 50 MU per unit. Get 10 WB units.";
		titl="Property for letting out ";break;
		
		case 22:tl="You have an option of purchasing a property for letting out. Pay 1,500 MU per unit of property purchased. Earn rent of 50 MU per unit. Get 10 WB units.";
		titl="Property for letting out ";break;
		
		case 23:tl="You have an option of purchasing a property for letting out. Pay 2,500 per unit of property purchased. Earn rent of 100 MU per unit. Get 10 WB units.";
		titl="Property for letting out ";break;
		
		case 24:tl="You have an option to purchase land for future use. Pay 750 MU for every unit of land purchased.  To invest nothing, write 0.";
		titl="Property - land";break;
		
		case 25:tl="You have an option to purchase land for future use. Pay 700 MU for every unit of land purchased.  To invest nothing, write 0.";
		titl="Property - land";break;
		
		case 26:tl="You have an option to purchase land for future use. Pay 800 MU for every unit of land purchased.  To invest nothing, write 0.";
		titl="Property - land";break;
		
		case 27:tl="You have an option to purchase land for future use. Pay 900 MU for every unit of land purchased.  To invest nothing, write 0.";
		titl="Property - land";break;
		
		case 28:tl="Your friend wants to expand his business and wants money. He approaches you to become a passive partner in his business. \
		The business is stable and growing. You have an option of investing 100% of your net income in his business. Receive profit share of 10% of your investment.";
		MU[i]-=NI[i];
		GI[i]+=(0.10*NI[i]);
		NI[i]+=(0.10*NI[i]);
		titl="Passive business partner";break;
		
		case 29:tl="You win a prize in a radio competition to promote awareness on environment protection and eco-friendly measures to be adopted by society.\
		You receive a cash award of 3,000 MU. You also get 5 RS and 10 SI units.  ";
		MU[i]+=3000;
		RS[i]+=5;
		SI[i]+=10;
		titl="Radio competition";break;
		
		case 30:tl="You win a prize in a competition for addressing pressing social issues and introducing innovative methods to improve the society.\
		You receive a cash award of 2,000 MU. You also get 10 RS and 20 SI units.  ";
		MU[i]+=2000;
		RS[i]+=10;
		SI[i]+=20;
		titl="Change your society competition";break;
		
		case 31:tl="You have an opportunity to interact with your favourite celebrity. Pay 400 MU towards expenses. Get 10 RS units.";
		MU[i]-=400;
		RS[i]+=10;
		titl="Interact with a celebrity";break;
		
		case 32:tl="You participate in a poster design competition for protecting the environment from pollution and get the second prize of 200 MU. Get 10 RS units.";
		MU[i]+=200;
		RS[i]+=10;
		titl="Poster design competition";break;
		
		case 33:tl="You undertake a small business in connection with the local festival, supplying and helping people with decorations and artistic themes. Earn 500 MU.";
		MU[i]+=500;
		titl="Festival business";break;
		
		case 34:tl="You get an opportunity to attend a seminar on the art of enabling people perform better in their lives. \
		It has a profound impact on your attitude and personality. Get 20 WB units. ";
		WB[i]+=20;
		titl="Learn from the master";break;
		
		case 35:tl="You volunteer for the human development conclave where you get an opportunity to interact with global leaders who have impacted their society.\
		Get 10 RS and 10 WB units. ";
		RS[i]+=10;
		WB[i]+=10;
		titl="Event volunteer";break;
		
		case 36:tl="You participate in a TV talent competition. Your talent gets noticed and you get offers increasing your gross income and net income by 300 MU. Get 20 RS units.";
		RS[i]+=20;
		GI[i]+=300;
		NI[i]+=300;
		titl="TV talent competition";break;
		
		default:
		tl="It's Working";
	}
}
	return titl+"\n\n"+tl;
}
