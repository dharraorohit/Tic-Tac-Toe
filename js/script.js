const main = document.querySelector("main");
const startButton = document.querySelector("#start-button");
const startScreen = document.querySelector("#start-screen");
const startScreenHeading = document.querySelector("#start-screen-heading");
const instruction = document.querySelector("#instruction");
const result = document.querySelector("#result");
const chancesElement = document.querySelector("#chances");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const compScoreElement = document.querySelector("#comp-score");
const yourScoreElement = document.querySelector("#your-score");
var yourScore=0;
var compScore=0;
var chances = 3;

function getCompChoice(){
	var randomNumber = Math.floor((Math.random() * 3));//generates random number between 0 and 2
	var options = ["rock","paper","scissor"];
	return options[randomNumber];

}
function compGetsOnePoint(){
	compScore+=1;
	result.innerText = "Computer gets one point.";
}
function youGetsOnePoint(){
	yourScore+=1;
	result.innerText = "You get one point.";
}
function tie(){
	result.innerText = "That's a Tie."
}
function compare(yourChoice, compChoice){
	if(yourChoice == "rock")
	{
		if(compChoice =="rock")
		{
			tie();
		}
		else if(compChoice =="paper")
		{
			compGetsOnePoint();
		}
		else if(compChoice =="scissor")
		{
			youGetsOnePoint();
		}

	}
	else if(yourChoice == "paper")
	{
		if(compChoice =="rock")
		{
			youGetsOnePoint();
		}
		else if(compChoice =="paper")
		{
			tie();
		}
		else if(compChoice =="scissor")
		{
			compGetsOnePoint();
		}

	}
	else if(yourChoice == "scissor")
	{
		if(compChoice =="rock")
		{
			compGetsOnePoint();
		}
		else if(compChoice =="paper")
		{
			youGetsOnePoint();
		}
		else if(compChoice =="scissor")
		{
			tie();
		}

	}
}

function updateScore(){
	compScoreElement.innerText =compScore;
	yourScoreElement.innerText =yourScore;
}

function showFinalResult(){
	if(yourScore > compScore){
		startScreenHeading.innerText = "You won the match.";
		startScreenHeading.style.color = "green";
	}
	else if(yourScore < compScore){
		startScreenHeading.innerText = "You loss the match.";
		startScreenHeading.style.color = "red";
	}
	else{
		startScreenHeading.innerText = "That is a Tie.";
		startScreenHeading.style.color = "#05386B";
	}
}

function resetGame(){
	chances = 3;
	yourScore = 0;
	compScore = 0;
	startButton.innerText = "Start Again";
	addingEventListeners();
	updateScore();//so score is shown 0, after restarting match.
	instruction.innerText = "Make your choice";//resetting instruction after restarting game
	result.innerText = "Let's see who Wins.";//resetting result after restarting game
	chancesElement.innerText = chances.toString();
}

function endGame(){
	startScreen.style.display = "block";//to show start screen
	main.style.display = "none";
	showFinalResult();
	resetGame();
	
}

function youClick(event){
	if(chances > 0){
		var yourChoice = event.target.id;
		var compChoice = getCompChoice();
		instruction.innerText = "Comp choose "+compChoice;//this shows computer's choice.
		compare(yourChoice, compChoice);
		updateScore();
		chances--;
		chancesElement.innerText = chances.toString();
	}

	if(chances==0){
		removingEventListeners();/*removing event listeners so user can not click on options after game ends.*/
		window.setTimeout(endGame,2000);//waiting so the user can see choice of comp and result. 
	}
}

startButton.addEventListener("click",()=>{
	startScreen.style.display = "none";
	main.style.display = "block";
});

// rock.addEventListener("click",()=>{
// 	youClick("rock");
// });

// paper.addEventListener("click",()=>{
// 	youClick("paper");
// });

// scissor.addEventListener("click",()=>{
// 	youClick("scissor");
// });
function addingEventListeners(){/*we also want to add event listeners after removing them, 
	therefore putting all event listeners in one function.*/
	rock.addEventListener("click",youClick);
	paper.addEventListener("click",youClick);
	scissor.addEventListener("click",youClick);
}

function removingEventListeners(){
	rock.removeEventListener("click",youClick);
	paper.removeEventListener("click",youClick);
	scissor.removeEventListener("click",youClick);
}

addingEventListeners();//calling function to add event listeners first time.