
const body = document.querySelector("body");
let gameContainer = document.querySelector(".game-container");
const form = document.querySelector("#options");
const resetBtn = document.querySelector("#reset");
const startBtn = document.querySelector("#start");
let flippedCards;
let score = 0;
let amount;


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
    flippedCards = document.querySelectorAll(".flipCard");
    if (flippedCards.length === 2) {
        return;
    }
    if (e.target.parentNode.classList.contains("front") || e.target.parentNode.classList.contains("back")) {
        e.target.parentNode.parentNode.classList.toggle("flipCard");
    } else if (e.target.parentNode.classList.contains("card")) {
        e.target.parentNode.classList.toggle("flipCard");
    } else if (e.target.classList.contains("card")) {
        e.target.classList.toggle("flipCard");
    }
    flippedCards = document.querySelectorAll(".flipCard");
    console.log(flippedCards.length)
    if (flippedCards.length === 2) {
        matchCards();
    } else {
        flippedCards = [];
    }
};

const matchCards = () => {
    firstImg = flippedCards[0].lastChild;
    console.dir(firstImg)
    secondImg = flippedCards[1].lastChild
    firstImgNum = flippedCards[0].lastChild.firstChild.dataset.index;
    secondImgNum = flippedCards[1].lastChild.firstChild.dataset.index;
    if (firstImgNum === secondImgNum) {
        score++;
        setTimeout(() => { hideCard(firstImg) }, 2000);
        setTimeout(() => { hideCard(secondImg) }, 2000);
    } else {
        setTimeout(() => { closeCard(flippedCards[0]) }, 2000);
        setTimeout(() => { closeCard(flippedCards[1]) }, 2000);
    }
}
const hideCard = (img) => {
    console.dir(img);
    img.parentNode.classList.remove("flipCard");
    console.dir(img.parentNode);
    img.parentNode.style.backgroundColor = "transparent";
    img.classList.add("hide");
    img.previousSibling.classList.add("hide");
}

const closeCard = (obj) => {
    obj.classList.remove("flipCard");
}

let bucket = []

const randomSample = () => {
    const randomIndex = Math.floor(Math.random()*bucket.length);
    return bucket.splice(randomIndex, 1)[0];
}

let difficulty = "";

const submitListener = (e) => {
    console.dir(e.target)
    e.preventDefault();

    for(let j = 0; j < assets.length; j++) {
        bucket.push(j);
    }
    difficulty = document.querySelector("#difficulty").value;
    amount = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
    const cards = [];
    for (let i = 0; i < amount; i++) {
        const randomIndex = randomSample();
        const containerDiv1 = document.createElement("div");
        const frontDiv1 = document.createElement("div");
        const frontImg1 = document.createElement("img");
        const backDiv1 = document.createElement("div");
        const backImg1 = document.createElement("img");
        backImg1.src = "./assets/" + assets[randomIndex];
        backImg1.setAttribute("data-index", randomIndex);
        frontImg1.src = "./assets/icon _jail_.svg";
        frontImg1.setAttribute("data-index", randomIndex);
        containerDiv1.classList.add("card");
        frontDiv1.classList.add("front");
        backDiv1.classList.add("back");
        frontDiv1.append(frontImg1);
        backDiv1.append(backImg1);
        containerDiv1.append(frontDiv1, backDiv1);
        containerDiv1.addEventListener("click", flipCard);
        //console.dir(containerDiv1);
        cards.push(containerDiv1);


        const containerDiv2 = document.createElement("div");
        const frontDiv2 = document.createElement("div");
        const frontImg2 = document.createElement("img");
        const backDiv2 = document.createElement("div");
        const backImg2 = document.createElement("img");
        backImg2.src = "./assets/" + assets[randomIndex];
        backImg2.setAttribute("data-index", randomIndex);
        frontImg2.src = "./assets/icon _jail_.svg";
        frontImg2.setAttribute("data-index", randomIndex);
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
    bucket = [];
    shuffle(cards);
    displayCards(cards);
    // gameContainer.append(newDiv1, newDiv2);

}

form.addEventListener("submit", submitListener);


//Timer functionality

let startTime;
let interval;
let pausedTime = 0;
let timeToDisplay;
let scoreChecker;
//let totalTimePassed;

const startStopWatch = () => {
    startTime = new Date().getTime() - pausedTime;
    interval = setInterval(updateStopWatch, 1000);
    scoreChecker = setInterval(checkScore, 1000);
    document.getElementById("welcome-msg").style.display = "none";
}

const checkScore = () => {
    if (score === amount) {
        updateStopWatch();
        const victory = document.querySelector(".victory");
        victory.style.display = "flex";
        victory.firstChild.textContent = `Congratulations! You freed all the animals in ${timeToDisplay}`;
        victory.addEventListener("submit", (e) => {
            e.preventDefault();
            victory.style.display = "none";
            const name = document.querySelector("#name").value;
            // const hash = Math.random();
            // localStorage.setItem("name-"+hash, name);
            // localStorage.setItem("time-"+hash, timeToDisplay);
            // localStorage.setItem("difficulty-"+hash, difficulty);
            const leaderboard = document.querySelector("leaderboard");
            const row = document.createElement("tr");
            const name1 = document.createElement("td");
            const time1 = document.createElement("td");
            name1.textContent = name;
            time1.textContent = timeToDisplay;
            row.append(name1, time1);
            leaderboard.append(row);
            localStorage.setItem(name, timeToDisplay);
        });
        resetStopWatch();
    }
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
    timeToDisplay = `${hours}:${minutes}:${seconds}`;
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
    score = 0;
    clearInterval(scoreChecker);
    gameContainer = document.querySelector(".game-container");
    while(gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }
}

function addZero(num) {
    return (num < 10 ? "0" : "") + num;
}

startBtn.addEventListener("click", startStopWatch);
resetBtn.addEventListener("click", resetStopWatch);

const leaderboard = document.querySelector("leaderboard");

document.addEventListener("DOMContentLoaded", () => {
    for(let i = 0; i < localStorage.length; i++) {
        const row = document.createElement("tr");
        const name = localStorage.key(i);
        const time = localStorage.getItem(name);
        const name1 = document.createElement("td");
        const time1 = document.createElement("td");
        name1.textContent = name;
        time1.textContent = time;
        row.append(name1, time1);
        leaderboard.append(row);
    }
})



