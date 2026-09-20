const container = document.querySelector(".container");
const colorButton = document.getElementById("color-input");
const gridButton = document.getElementById("submit-grid");
const gridWidth = document.getElementById("width-range");
const gridHeight = document.getElementById("height-range");
const eraseBtn = document.getElementById("erase-btn");
const paintBtn = document.getElementById("paint-btn");
const widthValue = document.getElementById("width-value");
const heightValue = document.getElementById("height-value");


// Canvas setup
const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");


// Application state
let rows = 16;
let cols = 16;
let draw = false;
let erase = false;

const CELL_SIZE = 20;

// Store pixel colors
let matrix = [];


// Create the pixel grid
function createGrid(r, c) {

    rows = parseInt(r);
    cols = parseInt(c);

    canvas.width = cols * CELL_SIZE;
    canvas.height = rows * CELL_SIZE;

    // Create empty matrix
    matrix = Array.from(
        { length: rows },
        () => Array(cols).fill("transparent")
    );

    renderCanvas();
}


// Render canvas
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

            const color = matrix[i][j];

            // Draw pixel
            if (color !== "transparent") {

                ctx.fillStyle = color;

                ctx.fillRect(
                    x,
                    y,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }

            // Draw grid
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


// Convert mouse position into grid coordinates
function getCellFromCoordinates(e) {

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);

    return {
        row,
        col
    };
}


// Paint a pixel
function paintCell(e) {

    const { row, col } = getCellFromCoordinates(e);

    if (
        row >= 0 &&
        row < rows &&
        col >= 0 &&
        col < cols
    ) {

        const targetColor =
            erase
                ? "transparent"
                : colorButton.value;

        matrix[row][col] = targetColor;

        renderCanvas();
    }
}

// Mouse painting
canvas.addEventListener("mousedown", (e) => {

    draw = true;

    paintCell(e);
});


canvas.addEventListener("mousemove", (e) => {

    if (!draw) return;

    paintCell(e);
});


window.addEventListener("mouseup", () => {

    draw = false;

});


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

eraseBtn.addEventListener("click", () => {

    erase = true;

    eraseBtn.classList.add("selected");
    paintBtn.classList.remove("selected");

});


paintBtn.addEventListener("click", () => {

    erase = false;

    paintBtn.classList.add("selected");
    eraseBtn.classList.remove("selected");

});

// Initial grid
createGrid(16, 16);

paintBtn.classList.add("selected");