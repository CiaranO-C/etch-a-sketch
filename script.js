
    
let slider = document.querySelector('#slider');
let rangeValue = document.querySelector('#rangeValue');
let container = document.querySelector('.grid-container');

let gridSize = 16;

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
    }
};


let drawingTool = {
    eraser: false,
    rainbow: false,
    black: false,
};


let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', function (){
    container.innerHTML = '';
    visualiseGrid();
})

let mouseDown = false;
container.addEventListener('mousedown', function(e) {
    mouseDown = true;
    if (drawingTool.rainbow) {e.target.style.backgroundColor = `hsl(${rainbowColor()},100%,50%)`}
    if (drawingTool.black) {e.target.style.backgroundColor = 'black'};
    if (drawingTool.eraser) {e.target.style.backgroundColor = 'white'};
});
container.addEventListener('mouseup', () => mouseDown = false);



function updateTool (selection, event) {
    drawingTool.eraser = false;
    drawingTool.black = false;
    drawingTool.rainbow = false;

    drawingTool[selection] = true;

    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.color = 'whitesmoke';
        event.target.style.color = 'blue';
        if(event.target.id === 'reset') {
            setTimeout(() => event.target.style.color = 'whitesmoke', 180)
        };
    });

};

let buttonContainer = document.querySelector('.button-container');
buttonContainer.addEventListener('click', function (e){
    updateTool(e.target.id, e);
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





