const DEFAULT_GRID_SIZE = 16;
const DRAWING_SIZE = 60;
let currentColor = "black";
let drag = false;
let erase = false;
let mode = "color";


const drawingArea = document.querySelector(".drawing-area");
const slider = document.querySelector("#grid-size");
const newColor = document.querySelector("#color");
const eraseButton = document.querySelector(".erase");
const clearButton = document.querySelector(".clear");
const randomButton = document.querySelector(".random-mode");
const colorButton = document.querySelector(".color-mode");

window.addEventListener("load", () => drawGrid(DEFAULT_GRID_SIZE));
drawingArea.addEventListener("mousedown", checkDrag);
drawingArea.addEventListener("mouseup", checkDrag);
drawingArea.addEventListener("mouseleave", checkDrag);
slider.addEventListener("input", () => resetGrid(slider.value));
newColor.addEventListener("change", (e) => currentColor = e.target.value);
eraseButton.addEventListener("click", eraseGrid);
clearButton.addEventListener("click", clearGrid);
randomButton.addEventListener("click", (e) => {
    mode = "random";
    activeButton(e);
})
colorButton.addEventListener("click", (e) => {
    mode = "color"
    activeButton(e);
})


function drawGrid(gridSize) {
    let temp;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            temp = document.createElement("div");
            temp.style.width = `${DRAWING_SIZE/gridSize}rem`;
            temp.style.height = `${DRAWING_SIZE/gridSize}rem`
            drawingArea.appendChild(temp);
        }
    }

    for (let i = 0; i < drawingArea.children.length; i++){
        drawingArea.children[i].addEventListener("mouseenter", colorGrid);
    }
}

function resetGrid(gridSize){
    document.querySelector(".grid-size-value").textContent = `${gridSize} x ${gridSize}`;
    while(drawingArea.children[0] != undefined)
        drawingArea.children[0].remove();
    drawGrid(gridSize);
}

function checkDrag(e){
    if(e.type === "mousedown"){
        drag = true;
        colorGrid(e);
    }
    else
        drag = false;
}

function colorGrid(e) {
    if(drag){
        if(mode === "random"){
            let r = Math.ceil(Math.random() * 255);
            let g = Math.ceil(Math.random() * 255);
            let b = Math.ceil(Math.random() * 255);
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
        else
            e.target.style.backgroundColor = currentColor;
    }
}

function eraseGrid(e){
    currentColor = "#fefae0"
    activeButton(e)
}

function clearGrid(){
    console.log(drawingArea.children.length);
    for (let i = 0; i < drawingArea.children.length; i++)
        drawingArea.children[i].style.backgroundColor = "#fefae0";
}

function activeButton(e){
    if(e.target === colorButton){
        colorButton.classList.add("active");
        eraseButton.classList.remove("active");
        randomButton.classList.remove("active");
    }
    else if(e.target === randomButton){
        randomButton.classList.add("active");
        eraseButton.classList.remove("active");
        colorButton.classList.remove("active");
    }
    else{
        eraseButton.classList.add("active");
        colorButton.classList.remove("active");
        randomButton.classList.remove("active");
    }
}