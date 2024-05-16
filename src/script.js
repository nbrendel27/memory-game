
const body = document.querySelector("body");
const gameContainer = document.querySelector(".game-container");
const form = document.querySelector("#options");

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

    while(currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

const displayCards = (array) => {
    while(gameContainer.firstChild) {
        gameContainer.firstChild.remove();
    }
    array.forEach((card) => {
        gameContainer.append(card);
    })
}


const submitListener = (e) => {
    // console.log("here")
    e.preventDefault();
    const difficulty = document.querySelector("#difficulty").value;
    const amount = difficulty === "easy" ? 4 : difficulty === "medium" ? 6 : 8;
    const cards = [];
    for(let i = 0; i < amount; i++) {
        const newDiv1 = document.createElement("div");
        const newImg1 = document.createElement("img");
        newImg1.src = "./assets/" + assets[i];
        newDiv1.append(newImg1);
        cards.push(newDiv1);
        const newDiv2 = document.createElement("div");
        const newImg2 = document.createElement("img");
        newImg2.src = "./assets/" + assets[i];
        newDiv2.append(newImg2);
        cards.push(newDiv2);  
        // push to array  
    }
    shuffle(cards);
    displayCards(cards);
    // gameContainer.append(newDiv1, newDiv2);
}

form.addEventListener("submit", submitListener);


document.addEventListener("DOMContentLoaded", () => {
    
})



