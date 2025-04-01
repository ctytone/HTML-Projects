//Written by Christopher Tytone

var errors = 0;

var cardList = [
    "darkness",
    "double",
    "fairy",
    "fighting",
    "fire",
    "grass",
    "lightning",
    "metal",
    "psychic",
    "water"
]

var cardSet;
var board = [];
var rows = 4;
var columns = 5;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); //double the cards

    //shuffle
    for(let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random()*cardSet.length); //Get random index
        //swap
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

function startGame() {
    //arrange the board 4x5
    for (r = 0; r < rows; r++) {
        let row = [];
        for(let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg); //JS

            // <img>
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = cardImg + ".jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    setTimeout(hideCards, 1000); //hide cards after 1 seconds
}

function hideCards() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {
    if(this.src.includes("back")) {
        if(!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".jpg";
        } else if (card1Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".jpg";
            setTimeout(update, 1000); //wait 1 second to check for match
        }
    }
}

function update() {
    //if cards arent the same, flip back
    if(card1Selected.src != card2Selected.src) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;
}