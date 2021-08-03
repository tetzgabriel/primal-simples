// min ou max
var calculo = "";

// valores de x1 e x2 na equacao principal
var x1;
var x2;

// valores de x1 nas linhas 1, 2 e 3
var x11;
var x12;
var x13;

// valores de x2 nas linhas 1, 2 e 3
var x21;
var x22;
var x23;

// <=, >= ou = nas linhas 1, 2 e 3
var simbolo1;
var simbolo2;
var simbolo3;

// resultados das linhas 1, 2 e 3
var res1;
var res2;
var res3;

// pega min ou max
function getCalculo(selectObject) {
    calculo = selectObject.value;
    console.log(calculo);
}

// pega valor de x1 na equacao principal
function handleX1() {
    x1 = document.getElementById("x1").value;
    console.log(x1);
    document.getElementById("x2").disabled = false;
}

// pega valor de x2 na equacao principal
function handleX2() {
    x2 = document.getElementById("x2").value;
    console.log(x2);

    createTable();
}

// pega simbolo linha 1
function getSimbolo1(selectObject) {
    simbolo1 = selectObject.value;
    console.log(simbolo1);
}

// pega simbolo linha 2
function getSimbolo2(selectObject) {
    simbolo2 = selectObject.value;
    console.log(simbolo2);
}

// pega simbolo linha 3
function getSimbolo3(selectObject) {
    simbolo3 = selectObject.value;
    console.log(simbolo3);
}

// exibe matrizes
function createTable() {
    document.getElementById("matrix").style.display = "flex";
    document.getElementById("botao").disabled = false;  
}

function calcula() {

    
}
