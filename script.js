
    
let slider = document.querySelector('#slider');
let rangeValue = document.querySelector('#rangeValue');
let container = document.querySelector('.grid-container');

let gridSize = 16;

//updates grid sized based on user input
slider.oninput = function() {
    rangeValue.textContent = slider.value;
    gridSize = slider.value;
    
    container.innerHTML = '';
    visualiseGrid();
};


visualiseGrid();


function visualiseGrid () {
    for (let x = 0; x < (gridSize*gridSize); x++) {
        let cell = document.createElement('div');
        cell.style.width = `${640/gridSize}px`;
        container.appendChild(cell);
    };
};


let drawingTool = {
    eraser: false,
    rainbow: false,
    black: false,
};

//drawing tool event listener
let buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', function (e){
    updateTool(e.target.id, e);
});

//updates drawing choice based on user selection, along with button color
function updateTool (selection, event) {
    drawingTool.eraser = false;
    drawingTool.black = false;
    drawingTool.rainbow = false;

    drawingTool[selection] = true;

    //updates button color to show current drawing tool choice
    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.color = 'whitesmoke';
        event.target.style.color = 'blue';
        if(event.target.id === 'reset') {
            setTimeout(() => event.target.style.color = 'whitesmoke', 180)
        };
    });

};

//handles single clicks on grid and mouse down state
let mouseDown = false;
container.addEventListener('mousedown', function(e) {
    mouseDown = true;
    if (drawingTool.rainbow) {e.target.style.backgroundColor = `hsl(${rainbowColor()},100%,50%)`}
    if (drawingTool.black) {e.target.style.backgroundColor = 'black'};
    if (drawingTool.eraser) {e.target.style.backgroundColor = 'white'};
});
container.addEventListener('mouseup', () => mouseDown = false);

//handles dragging mouse over grid items
container.addEventListener('mouseover', function (e) {
    if (mouseDown) {
        if (drawingTool.rainbow) {e.target.style.backgroundColor = `hsl(${rainbowColor()},100%,50%)`}
        if (drawingTool.black) {e.target.style.backgroundColor = 'black'};
        if (drawingTool.eraser) {e.target.style.backgroundColor = 'white'};
    };
});

//iterates through hsl color wheel
rainbowHsl = 0;
function rainbowColor() {
    if(rainbowHsl <= 360) {
        rainbowHsl += 20;
        return rainbowHsl-20;
    } else {
        rainbowHsl = 0;
        return rainbowHsl;
    };
};

//creates blank grid
let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', function (){
    container.innerHTML = '';
    visualiseGrid();
});




