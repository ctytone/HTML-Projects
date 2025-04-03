//Written by Christopher Tytone

var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    //Initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";
            
            //drag and drop
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver); //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image out of another one
            tile.addEventListener("drop", dragDrop); //drop an image onto another one
            tile.addEventListener("dragend", dragEnd); //after you completed dragDrop
            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for(let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put 1 to 25 in the array 
    }

    pieces.reverse(); //reverse the array to shuffle the pieces
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length); //randomly select a piece to swap with

        let temp = pieces[i]; //store the piece in a temp variable
        pieces[i] = pieces[j]; //swap the pieces
        pieces[j] = temp; //swap the pieces back
    }

    for(let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpg";

        //drag and drop
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver); //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image out of another one
        tile.addEventListener("drop", dragDrop); //drop an image onto another one
        tile.addEventListener("dragend", dragEnd); //after you completed dragDrop
        document.getElementById("pieces").append(tile);
    }
}

//Drag tiles
function dragStart() {
    currTile = this; //refers to the image clicked on

}

function dragOver(e) {
    e.preventDefault(); //prevents the default action of the event
}

function dragEnter(e) {
    e.preventDefault(); //prevents the default action of the event
}

function dragLeave() {  

}

function dragDrop() {
    otherTile = this; //refers to the image dragged over
}

function dragEnd() {
    if(currTile.src.includes("blank.jpg")) { //if the current tile is blank, do nothing
        return;
    }
    let currImg = currTile.src; //get the image of the current tile
    let otherImg = otherTile.src; //get the image of the other tile

    //swap
    currTile.src = otherImg; //set the current tile to the other tile's image
    otherTile.src = currImg; //set the other tile to the current tile's image

    turns++; //increment the number of turns
    document.getElementById("turns").innerText = turns; //update the number of turns
}
