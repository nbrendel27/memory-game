
const body = document.querySelector("body");
const gameContainer = document.querySelector(".game-container");
const form = document.querySelector("#options");
const resetBtn = document.querySelector("#reset");
const startBtn = document.querySelector("#start");


const assets = ["Giraffe.svg",
    "Illustration - Elephant.svg",
    "Illustration - Gorilla.svg",
    "Illustration - Hippo.svg",
    "Illustration - Koala.svg",
    "Illustration - Leopard.svg",
    "Illustration - Lion.svg",
    "Panda.svg",
    "Zebra.svg"]

const shuffle = (array) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

const displayCards = (array) => {
    while (gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }
    array.forEach((card) => {
        gameContainer.append(card);
    })
}

const flipCard = (e) => {
    if(e.target.parentNode.classList.contains("front") || e.target.parentNode.classList.contains("back")) {
        e.target.parentNode.parentNode.classList.toggle("flipCard");
    }else if(e.target.parentNode.classList.contains("card")) {
        e.target.parentNode.classList.toggle("flipCard");
    }else if(e.target.classList.contains("card")) {
        e.target.classList.toggle("flipCard");
    }
    
};

const submitListener = (e) => {
    // console.log("here")
    e.preventDefault();
    const difficulty = document.querySelector("#difficulty").value;
    const amount = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
    const cards = [];
    for (let i = 0; i < amount; i++) {
        const containerDiv1 = document.createElement("div");
        const frontDiv1 = document.createElement("div");
        const frontImg1 = document.createElement("img");
        const backDiv1 = document.createElement("div");
        const backImg1 = document.createElement("img");
        backImg1.src = "./assets/" + assets[i];
        frontImg1.src = "./assets/icon _jail_.svg";
        containerDiv1.classList.add("card");
        frontDiv1.classList.add("front");
        backDiv1.classList.add("back");
        frontDiv1.append(frontImg1);
        backDiv1.append(backImg1);
        containerDiv1.append(frontDiv1, backDiv1);
        containerDiv1.addEventListener("click", flipCard);
        cards.push(containerDiv1);


        const containerDiv2 = document.createElement("div");
        const frontDiv2 = document.createElement("div");
        const frontImg2 = document.createElement("img");
        const backDiv2 = document.createElement("div");
        const backImg2 = document.createElement("img");
        backImg2.src = "./assets/" + assets[i];
        frontImg2.src = "./assets/icon _jail_.svg";
        containerDiv2.classList.add("card");
        frontDiv2.classList.add("front");
        backDiv2.classList.add("back");
        frontDiv2.append(frontImg2);
        backDiv2.append(backImg2);
        containerDiv2.append(frontDiv2, backDiv2);
        containerDiv2.addEventListener("click", flipCard);
        cards.push(containerDiv2);
        // push to array  
    }
    shuffle(cards);
    displayCards(cards);
    // gameContainer.append(newDiv1, newDiv2);
    
}

form.addEventListener("submit", submitListener);








let startTime;
let interval;
let pausedTime = 0;
//let totalTimePassed;

const startStopWatch = () => {
    startTime = new Date().getTime() - pausedTime;
    interval = setInterval(updateStopWatch, 1000);
}

const updateStopWatch = () => {
    let currentTime = new Date().getTime();
    let timeElapsed = currentTime - startTime;
    let secondsPassed = Math.floor(timeElapsed / 1000) % 60;
    let minutesPassed = Math.floor(timeElapsed / 1000 / 60) % 60;
    let hoursPassed = Math.floor(timeElapsed / 1000 / 60 / 60) % 60;
    let hours = addZero(hoursPassed);
    let minutes = addZero(minutesPassed);
    let seconds = addZero(secondsPassed);
    let timeToDisplay = `${hours} : ${minutes} : ${seconds}`;
    document.querySelector("#watch").innerText = timeToDisplay;
}

const stopWatch = () => {
    clearInterval(interval);
    pausedTime = new Date().getTime() - startTime;
    interval = null;
}

const resetStopWatch = () => {
    stopWatch();
    pausedTime = 0;
    document.querySelector("#watch").innerText = "0:00:00";
}

function addZero(num) {
    return (num < 10 ? "0" : "") + num;
}

startBtn.addEventListener("click", startStopWatch);
resetBtn.addEventListener("click", resetStopWatch);

document.addEventListener("DOMContentLoaded", () => {

})



