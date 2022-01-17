var c = 0;
var t;
var timer_is_on = 0;
var clockInput = document.getElementById("clock");
var clockInputresult = document.getElementById("clockresult");
var tours = document.getElementById("tours");

let sequence = [];
let humanSequence = [];
let level = 0;

const simon = document.querySelector(".simon");
const resetButton = document.querySelector(".js-reset");
const continueButton = document.querySelector(".js-continue");
const pauseButton = document.querySelector(".js-pause");
const startButton = document.querySelector(".js-start");
const info = document.querySelector(".js-info");
const titreRegle = document.querySelector(".titreRegle");
const presultat = document.querySelector(".presultat");
const tresultat = document.querySelector(".tresultat");
const divInfo = document.getElementById("regles");
const tileContainer = document.querySelector(".js-container");
const play = document.getElementById("play");
const resulPlay = document.getElementById("resulPlay");
const fond = document.getElementById("videoFond");
const credis = document.querySelector(".credis");

credis.classList.add("hidden");
resulPlay.classList.add("hidden");
pauseButton.classList.add("unclickable");
startButton.classList.add("unclickable");
resetButton.classList.add("unclickable");
tresultat.classList.add("hidden");
//video presentation
var vPres = document.getElementById("vPres");
vPres.onended = function () {
	vPres.style.display = "none";
};

play.onclick = function () {
	AfficherMasquer();
};

// Recharger la page (Reset Game)
function resetGame() {
	location.reload(true);
}

// Cyber simon le jeu
function humanTurn(level) {
	tileContainer.classList.remove("unclickable");
	info.textContent = `Clic restant: ${level} Tap${level > 1 ? "s" : ""}`;
	pauseButton.classList.remove("unclickable");
}

function activateTile(color) {
	const tile = document.querySelector(`[data-tile='${color}']`);
	const sound = document.querySelector(`[data-sound='${color}']`);

	tile.classList.add("activated");
	sound.play();

	setTimeout(() => {
		tile.classList.remove("activated");
	}, 300);
}

function playRound(nextSequence) {
	nextSequence.forEach((color, index) => {
		setTimeout(() => {
			activateTile(color);
		}, (index + 1) * 800);
	});
}

function nextStep() {
	const tiles = ["red", "green", "blue", "yellow"];
	const random = tiles[Math.floor(Math.random() * tiles.length)];
	pauseButton.classList.add("unclickable");
	return random;
}

function nextRound() {
	level += 1;
	tileContainer.classList.add("unclickable");
	info.textContent = "C'est au tour de Mémosyne !";

	const nextSequence = [...sequence];
	nextSequence.push(nextStep());
	playRound(nextSequence);

	sequence = [...nextSequence];
	setTimeout(() => {
		humanTurn(level);
	}, level * 800 + 1000);
	return level;
}

function handleClick(tile) {
	const index = humanSequence.push(tile) - 1;
	const sound = document.querySelector(`[data-sound='${tile}']`);
	sound.play();

	const remainingTaps = sequence.length - humanSequence.length;

	if (humanSequence[index] !== sequence[index]) {
		finishGame();
		clockInputresult.value = clockInput.value;
		tours.value = level;
		return;
	}

	if (humanSequence.length === sequence.length) {
		humanSequence = [];
		info.textContent = "Bien! Continue comme ça!";
		setTimeout(() => {
			nextRound();
		}, 1000);
		return;
	}

	info.textContent = `Clic restant: ${remainingTaps} Tap${
		remainingTaps > 1 ? "s" : ""
	}`;
}

function startGame() {
	startCount();
	startButton.classList.add("hidden");
	pauseButton.classList.remove("unclickable");
	pauseButton.classList.remove("hidden");
	continueButton.classList.add("hidden");
	info.classList.remove("hidden");
	info.textContent = "C'est au tour de AI !";
	nextRound();
}

resetButton.addEventListener("click", resetGame);
pauseButton.addEventListener("click", pauseGame);
continueButton.addEventListener("click", continueGame);
startButton.addEventListener("click", startGame);
tileContainer.addEventListener("mousedown", (event) => {
	const { tile } = event.target.dataset;

	if (tile) handleClick(tile);
});

// AFFICHER MASQUER
function AfficherMasquer() {
	startButton.classList.remove("unclickable");
	resetButton.classList.remove("unclickable");

	if (divInfo.style.display == "none") divInfo.style.display = "block";
	else divInfo.style.display = "none";
}
// pause et resprise des regles

function pauseGame() {
	clearTimeout(t);
	continueButton.classList.remove("hidden");
	tileContainer.classList.add("unclickable");
	AfficherMasquer();
	play.classList.add("hidden");
}
function continueGame() {
	setTimeout(timedCount());
	tileContainer.classList.remove("unclickable");
	continueButton.classList.add("hidden");
	pauseButton.classList.remove("hidden");
	AfficherMasquer();
}

// Timer

function timedCount() {
	clockInput.value = c;
	c = c + 1;
	t = setTimeout(timedCount, 1000);
}
function startCount() {
	timer_is_on = 0;
	c = 0;
	clockInput.value = c;
	if (!timer_is_on) {
		timer_is_on = 1;
		timedCount();
	}
}
function stopCount() {
	clearTimeout(t);
}

// Fin du jeux affichage des resulats

function finishGame() {
	AfficherMasquer();
	stopCount();
	titreRegle.textContent = `Résultats `;
	tresultat.classList.remove("hidden");
	presultat.classList.add("hidden");
	startButton.classList.add("unclickable");
	clockInput.value = c;
	play.classList.add("hidden");
	resulPlay.classList.remove("hidden");
}

function afficheVideo() {
	fond.classList.remove("hidden");
	AfficherMasquer();
	resetButton.classList.remove("unclickable");
	simon.classList.add("hidden");
}
// Crédis
function Fcredis() {
	credis.classList.remove("hidden");
	fond.classList.add("hidden");
}
