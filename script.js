console.log("script.js cargó exitosamente")
/* Elementos HTML */
let square = document.querySelectorAll(".square")
let titulo = document.querySelector("h1")
let clickedColor = document.getElementById("clickedColor")
let message = document.getElementById("message")
let resetButton = document.getElementById("reset")
let easyButton = document.getElementById("easy")
let hardButton = document.getElementById("hard")
let divButtons = document.getElementById("stripe")
let selected = document.getElementsByClassName("selected")


/* Variables */
let numberOfSquares = 6;
let colors = generaColorRandom(numberOfSquares);
let pickedColor = validarColor()

//Le asignamos al span el texto del color ganador
clickedColor.innerHTML = pickedColor

iniciarPartida()
/* le agregamos la clase selected al boton clickeador */
/* function modeToPlay(modeButtons) {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function() {
            modeButtons[0].classList.remove('selected');
            modeButtons[1].classList.remove('selected');
            this.classList.add('selected');
            numberOfSquares = this.textContent == 'EASY' ? 3 : 6
        });
    }
} */

// Funciones

function iniciarPartida() {
    pintarSquares()
    modoJuego()
    resetearJuego()
}

//Reseteamos el juego
function resetearJuego() {

    resetButton.addEventListener("click", function () {
        resetButton.textContent = "nuevo color"
        colors = generaColorRandom(numberOfSquares)
        pickedColor = validarColor()
        for (let i = 0; i < square.length; i++) {
            square[i].style.backgroundColor = colors[i];
            if (pickedColor !== colors[i]) {
            }
        }
        titulo.style.backgroundColor = " ";
        clickedColor.innerHTML = pickedColor
        message.textContent = " "
        message.style. backgroundColor = "none"
        console.log("Funcion reset ejecutada exitosamente")
    })
}

/* Botones EASY & HARD */

function modoJuego(){
    easyButton.addEventListener("click", function () {
        easyButton.classList.add("selected")
        hardButton.classList.remove("selected")
        numberOfSquares = 3;
        colors = generaColorRandom(numberOfSquares)
        pickedColor = validarColor()
        for (let i = 0; i < square.length; i++) {
            if (colors[i] != undefined) {
                square[i].style.backgroundColor = colors[i];
                square[i].style.display = 'block';
            } else {
                square[i].style.display = "none";
                square[i].style.backgroundColor = null;
                console.log("Modo easy activado")
            }
        }
    })
    hardButton.addEventListener("click", function () {
        hardButton.classList.add("selected")
        easyButton.classList.remove("selected")
        numberOfSquares = 6;
        colors = generaColorRandom(numberOfSquares)
        pickedColor = validarColor()
        for (let i = 0; i < square.length; i++) {
            square[i].style.display = "block";
            square[i].style.backgroundColor = colors[i];
            console.log("Modo HARD activado")
        }
    })
}

//Recorremos los div, square y le asignamos un color diferente
//Verificamos el color del div clickeado y le cambiamos el color no coincide
//Si coincide cambiamos el fondo del titulo y le damos un mensaje de acierto

function pintarSquares(){
    for (let i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = colors[i]
        square[i].addEventListener("click", function(){
            var clickedColor = square[i].style.backgroundColor;
            if(clickedColor == pickedColor){
                message.innerHTML = "Correcto"
                //message.style.backgroundColor = "green"
                titulo.style.backgroundColor = clickedColor;
                changeColors(clickedColor);
                resetButton.textContent = "Nuevo juego?"
            } else {
                this.style.backgroundColor = "transparent"
                message.textContent = "Intentalo Nuevamente"
                //message.style. backgroundColor = "red"
            } 
        }) 
    }
}
//Funcion para cambiar todos los div al color del acierto
function changeColors(color) {
    for (let i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = color;
        
    }
}

/* Elige  un color random para que sea el ganador */
function validarColor() {
    let numRandom
    if(hardButton.classList.contains("selected")) {
        numRandom = Math.trunc(Math.random() * (6))
    } else {
        numRandom = Math.trunc(Math.random() * (3))
    }
    return colors[numRandom]
}

/* Generamos un RGB random*/
function randomColor() {
    let r = Math.trunc(Math.random() * (255))
    let g = Math.trunc(Math.random() * (255))
    let b = Math.trunc(Math.random() * (255))
    return "rgb(" + r + ", " + g + ", " + b + ")" 
    console.log(" retorno rgb ")
}

//Generamos colores randoms para el array de los colores
function generaColorRandom(num) {
    var arr = new Array(num); 
    for (let i = 0; i < arr.length; i++) {
        arr[i] = randomColor();
    }
    return arr
}