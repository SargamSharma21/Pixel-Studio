const container = document.querySelector(".container");

const gridButton = document.getElementById("submit-grid");
const gridWidth = document.getElementById("width-range");
const gridHeight = document.getElementById("height-range");

const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");


// Canvas setup
const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");


// Application state
let rows = 16;
let cols = 16;

const CELL_SIZE = 20;


// Create the pixel grid
function createGrid(r, c) {

    rows = parseInt(r);
    cols = parseInt(c);

    canvas.width = cols * CELL_SIZE;
    canvas.height = rows * CELL_SIZE;

    renderCanvas();
}


// Render the grid
function renderCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let i = 0; i < rows; i++) {

        for (let j = 0; j < cols; j++) {

            const x = j * CELL_SIZE;
            const y = i * CELL_SIZE;

            // // Cell background
            ctx.fillStyle = "white";
            ctx.fillRect(
                x,
                y,
                CELL_SIZE,
                CELL_SIZE
            );

            // Cell border
            ctx.strokeStyle = "#ddd";
            ctx.lineWidth = 1;

            ctx.strokeRect(
                x,
                y,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }
}


// Create grid
gridButton.addEventListener("click", () => {

    createGrid(
        gridHeight.value,
        gridWidth.value
    );

});


// Width display
gridWidth.addEventListener("input", () => {

    widthValue.innerText =
        gridWidth.value < 10
            ? `0${gridWidth.value}`
            : gridWidth.value;

});


// Height display
gridHeight.addEventListener("input", () => {

    heightValue.innerText =
        gridHeight.value < 10
            ? `0${gridHeight.value}`
            : gridHeight.value;

});


// Initial grid
createGrid(16, 16);