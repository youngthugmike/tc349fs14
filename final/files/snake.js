window.addEventListener("load", init, false);

var nb_cases;
var CASE_WIDTH = 13;
var CASE_HEIGHT = 13;
var direction;

var pos_X;
var pos_Y;

var canvas;
var context;
var timer_refresh;
var interval;

var LEFT = -1;
var RIGHT = 1;
var UP = -2;
var DOWN = 2;

var food;
var direction_changed;
var start;
var score;

var KEY_LEFTARROW = 37;
var KEY_UPARROW = 38;
var KEY_RIGHTARROW = 39;
var KEY_DOWNARROW = 40;
var KEY_SPACE = 32;

var soundEfx; // Sound Efx
var soundLoad = "move.wav"; //Game Over sound efx

var expld; // Sound Efx
var expldLoad = "expld.wav"; //Game Over sound efx

var over;
var overLoad = "gameover.wav";

function init()
{
    soundEfx = document.getElementById("soundEfx");
    expld = document.getElementById("expld");
    over = document.getElementById("over");
	canvas = document.getElementsByTagName("canvas")[0];	
	if(!canvas || !canvas.getContext)
		return;
	
	context = canvas.getContext("2d");	
	if(!context)
		return;

	// On continue	
	document.getElementsByClassName("retry")[0].addEventListener("click", demarrer, false);
	food = {
			x:0,
			y:0
		};
	direction_changed = false;
	window.addEventListener("keydown", handleKeyDown, false);
}

function demarrer()
{
	document.getElementsByClassName("retry")[0].style.visibility = "hidden";
	direction = RIGHT;
	nb_cases = 9;
	
	pos_X = new Array();
	pos_Y = new Array();
	
	pos_X = [135, 120, 105, 90, 75, 60, 45, 30, 15, 0 ];
	pos_Y = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
	
	new_food();

	interval = 90;
	score = 0;
	start = true;
	
	timerRefresh = setTimeout(refresh, interval);
}

function refresh()
{	
	var old_case = {
			x:pos_X[pos_X.length-1],
			y:pos_Y[pos_Y.length-1]
		};
		
	pos_X.splice(0, 0, pos_X[pos_X.length-1]);
	pos_Y.splice(0, 0, pos_X[pos_Y.length-1]);
	pos_X.pop();
	pos_Y.pop();
	
	switch(direction)
	{
		case LEFT :
			pos_X[0] = pos_X[1]-CASE_WIDTH-2;
			pos_Y[0] = pos_Y[1];
			break;
		case RIGHT :
			pos_X[0] = pos_X[1]+CASE_WIDTH+2;
			pos_Y[0] = pos_Y[1];
			break;
		case UP :
			pos_Y[0] = pos_Y[1]-CASE_WIDTH-2;
			pos_X[0] = pos_X[1];
			break;
		case DOWN :
			pos_Y[0] = pos_Y[1]+CASE_WIDTH+2;
			pos_X[0] = pos_X[1];
			break;
	}
	
	// Test perdu
	if(pos_X[0]+CASE_WIDTH+2 > canvas.width || pos_X[0] < 0 || pos_Y[0]+CASE_HEIGHT+2 > canvas.height || pos_Y[0] < 0 || choc_serpent())
	{
		perdu();
		return;
	}
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#000000";
	
	// Score
	context.font = '12px Harabara';
	context.fillText("Score : "+score, 15, 20);
	
	// Food
	context.fillRect(food.x, food.y, CASE_WIDTH, CASE_HEIGHT);


	for(var i = 0 ; i < nb_cases ; i++) 
	    context.fillRect(pos_X[i], pos_Y[i], CASE_WIDTH, CASE_HEIGHT);

		
	// Test food hit
	if(food_hit())
	{
		expld.play();
		pos_X.push(old_case.x);
		pos_Y.push(old_case.y);
		nb_cases--;
		if(interval > 2)
			interval -= 2;
		score += 1;
		new_food();
		interval -= 10;
	}
	
	direction_changed = false;
	timerRefresh = setTimeout(refresh, interval);
}

function handleKeyDown(event)
{
   /// controls
	var input = event.keyCode;
	if(input >= 37 && input <= 40 || input == 32)
		event.preventDefault();
	
	if(direction_changed && start) return;
	
	direction_changed = true;
	if (input == KEY_RIGHTARROW && direction != -LEFT) {
	    soundEfx.play();
	    direction = LEFT;
	}
	else if (input == KEY_DOWNARROW && direction != -UP) {
	    soundEfx.play();
	    direction = UP;
	}
	else if (input == KEY_LEFTARROW && direction != -RIGHT) {
	    soundEfx.play();
	    direction = RIGHT;
	}
	else if (input == KEY_UPARROW && direction != -DOWN) {
	    soundEfx.play();
	    direction = DOWN;
	}
	if(input == KEY_SPACE && document.getElementsByClassName("retry")[0].style.visibility == "visible") 
		demarrer();	
}

function new_food()
{
    for (var i = 0; i<10; i++ )
    {    
	var cols = Math.floor(canvas.width/(CASE_WIDTH+2));
	var alea = Math.floor(Math.random()*(cols-1)); 
	food.x = alea*(CASE_WIDTH+2);
	var rows = Math.floor(canvas.height/(CASE_HEIGHT+2));
	alea = Math.floor(Math.random()*rows-1); 
	food.y = alea*(CASE_HEIGHT+2);
	if(food_hit() || food.x < 0 || food.y < 0) 
		new_food();
    }
}

function food_hit()
{
	var length = pos_X.length;	
	for(var i = 0 ; i < length ; i++)
	{
	    if (pos_X[i] == food.x && pos_Y[i] == food.y)
			return true;
	}	
	return false;
}

function choc_serpent()
{
	var tab = new Array();
	var index;
	for(var i = 0 ; i < pos_X.length ; i++)
	{
		index = tab.indexOf(pos_X[i]);
		if(index != -1 && pos_Y[i] == pos_Y[index]) 
			return true;
		else
			tab.push(pos_X[i]);
	}
	
	return false;
}

function perdu()
{
	clearTimeout(timerRefresh);
	var play = document.getElementsByClassName("retry")[0];
	over.play();
	play.innerHTML = "Retry";
	play.style.width = "105px";
	play.style.visibility = "visible";
	start = false;
}
