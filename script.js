let gridSize = 16;
    

let slider = document.querySelector('#slider');
let rangeValue = document.querySelector('#rangeValue');

slider.oninput = function() {
    rangeValue.textContent = slider.value;
    gridSize = slider.value;
    
    
    container.innerHTML = '';
    visualiseGrid();
}



let container = document.querySelector('.grid-container');


function visualiseGrid () {
    for (let x = 0; x < (gridSize*gridSize); x++) {
            let cell = document.createElement('div');
            cell.style.width = `${640/gridSize}px`;
            container.appendChild(cell);
    }
}

let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', function (){
    container.innerHTML = '';
    visualiseGrid();
})

let mouseDown = false;
container.addEventListener('mousedown', function(e) {
    mouseDown = true;
    if (rainbow) {e.target.style.backgroundColor = `hsl(${rainbowColor()},100%,50%)`}
    if (black) {e.target.style.backgroundColor = 'black'};
    if (eraser) {e.target.style.backgroundColor = 'white'};
});
container.addEventListener('mouseup', () => mouseDown = false);

let drawingTool = {
    eraser: false,
    rainbow: false,
    black: false,
};

function updateTool (selection) {
    drawingTool.eraser = false;
    drawingTool.black = false;
    drawingTool.rainbow = false;

    drawingTool[selection] = true;
};

let buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', function (e){
    updateTool(e.target.id);
})



container.addEventListener('mouseover', function (e) {
    if (mouseDown) {
        if (drawingTool.rainbow) {e.target.style.backgroundColor = `hsl(${rainbowColor()},100%,50%)`}
        if (drawingTool.black) {e.target.style.backgroundColor = 'black'};
        if (drawingTool.eraser) {e.target.style.backgroundColor = 'white'};
    }
});


rainbowHSL = 0;
function rainbowColor() {
if(rainbowHSL <= 360) {
rainbowHSL += 20;
return rainbowHSL-20;
} else {
    rainbowHSL = 0;
    return rainbowHSL;
    }
}


visualiseGrid();

