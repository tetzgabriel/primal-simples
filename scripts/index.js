var calculo = "";

var x1;
var x2;

var simbolo1;
var simbolo2;
var simbolo3;


function getCalculo(selectObject) {
    calculo = selectObject.value;
    console.log(calculo);
}

function handleX1() {
    x1 = document.getElementById("x1").value;
    console.log(x1);
    document.getElementById("x2").disabled = false;
}

function handleX2() {
    x2 = document.getElementById("x2").value;
    console.log(x2);

    createTable();
}

function getSimbolo1(selectObject) {
    simbolo1 = selectObject.value;
    console.log(simbolo1);
}

function getSimbolo2(selectObject) {
    simbolo2 = selectObject.value;
    console.log(simbolo2);
}

function getSimbolo3(selectObject) {
    simbolo3 = selectObject.value;
    console.log(simbolo3);
}

function createTable() {
    document.getElementById("matrix").style.display = "flex";
    document.getElementById("botao").disabled = false;  
}

function resetAntAprox() {
    ant_aprox1 = 0;
    ant_aprox2 = 0;
    ant_aprox3 = 0;
}

function calcula() {

    if(precisao !== 0){
        document.getElementById("error2").style.display = "none";
        document.getElementById("error").style.display = "none";
        x11 = document.getElementById("x11").value;
        x12 = document.getElementById("x12").value;
        x13 = document.getElementById("x13").value;
        x21 = document.getElementById("x21").value;
        x22 = document.getElementById("x22").value;
        x23 = document.getElementById("x23").value;
        x31 = document.getElementById("x31").value;
        x32 = document.getElementById("x32").value;
        x33 = document.getElementById("x33").value;

        if (calculo == "potencia") {        
            resetAntAprox();
            calculaPotencia(1, 1, 1, 0, 0,0);
        } else if (calculo == "inversa") {
            
            resetAntAprox();
            calculaInversa();
        } else if (calculo == "qr") {

            resetAntAprox();
            calculaQR(x11, x12, x13, x21, x22, x23, x31, x32, x33);
        } else {
            document.getElementById("error").style.display = "block";
        }
    } else {
        document.getElementById("error2").style.display = "block";
    }
    
}

function calculaPotencia(y1, y2, y3, k, p, alpha, z1, z2, z3) {
    var z1,z2,z3;
    var erro1, erro2, erro3;
    var alpha; 


    if(k){ // se NAO for a primeira iteracao

        y1 = (1/alpha) * z1;
        y2 = (1/alpha) * z2;
        y3 = (1/alpha) * z3;

        z1 = (x11 * y1) + (x12 * y2) + (x13 * y3);
        z2 = (x21 * y1) + (x22 * y2) + (x23 * y3);
        z3 = (x31 * y1) + (x32 * y2) + (x33 * y3);

        aprox1 =  z1/y1;
        aprox2 =  z2/y2;
        aprox3 =  z3/y3;

        alpha2 = Math.max(Math.abs(aprox1),Math.abs(aprox2),Math.abs(aprox3));

        erro1 = Math.abs((aprox1 - ant_aprox1))/Math.abs(aprox1);
        erro2 = Math.abs((aprox2 - ant_aprox2))/Math.abs(aprox2);
        erro3 = Math.abs((aprox3 - ant_aprox3))/Math.abs(aprox3);

        if(erro1 <= erro2 && erro1 <= erro3){
            if(erro1 < precisao){

                if(p){
                    showResult(1/aprox1,y1, y2, y3);
                } else {
                    showResult(aprox1,y1, y2, y3);
                }

                return;
            }else{
                ant_aprox1 = aprox1;
                ant_aprox2 = aprox2;
                ant_aprox3 = aprox3;

                if(p){
                    calculaPotencia(y1, y2, y3, 1, 1, alpha2, z1, z2, z3);
                } else {
                    calculaPotencia(y1, y2, y3, 1, 0, alpha2, z1, z2, z3);
                }
            }
        }
        if(erro2 <= erro1 && erro2 <= erro3){
            if(erro2 < precisao){
                if(p){
                    showResult(1/aprox2,y1, y2, y3);
                } else {
                    showResult(aprox2,y1, y2, y3);
                }
                return;
            }else{
                ant_aprox1 = aprox1;
                ant_aprox2 = aprox2;
                ant_aprox3 = aprox3;
                if(p){
                    calculaPotencia(y1, y2, y3, 1, 1, alpha2, z1, z2, z3);
                } else {
                    calculaPotencia(y1, y2, y3, 1, 0, alpha2, z1, z2, z3);
                }
            }
        }
        if(erro3 <= erro1 && erro3 <= erro2){
            if(erro3 < precisao){
                if(p){
                    showResult(1/aprox3,y1, y2, y3);
                } else {
                    showResult(aprox3,y1, y2, y3);
                }
                return;
            }else{
                ant_aprox1 = aprox1;
                ant_aprox2 = aprox2;
                ant_aprox3 = aprox3;
                if(p){
                    calculaPotencia(y1, y2, y3, 1, 1, alpha2, z1, z2, z3);
                } else {
                    calculaPotencia(y1, y2, y3, 1, 0, alpha2, z1, z2, z3);
                }
            }
        }
    } else { //se for a primeira iteracao

        z1 = (x11 * y1) + (x12 * y2) + (x13 * y3);
        z2 = (x21 * y1) + (x22 * y2) + (x23 * y3);
        z3 = (x31 * y1) + (x32 * y2) + (x33 * y3);
        
        alpha = Math.max(Math.abs(z1),Math.abs(z2),Math.abs(z3))

        y1 = (1/alpha) * z1;
        y2 = (1/alpha) * z2;
        y3 = (1/alpha) * z3;

        z1 = (x11 * y1) + (x12 * y2) + (x13 * y3);
        z2 = (x21 * y1) + (x22 * y2) + (x23 * y3);
        z3 = (x31 * y1) + (x32 * y2) + (x33 * y3);

        aprox1 =  z1/y1;
        aprox2 =  z2/y2;
        aprox3 =  z3/y3;

        ant_aprox1 = aprox1;
        ant_aprox2 = aprox2;
        ant_aprox3 = aprox3;

        alpha2 = Math.max(Math.abs(aprox1),Math.abs(aprox2),Math.abs(aprox3))

        if(p){
            calculaPotencia(y1, y2, y3, 1, 1, alpha2, z1, z2, z3);
        } else {
            calculaPotencia(y1, y2, y3, 1, 0, alpha2, z1, z2, z3);
        }
    }

}

function calculaPotenciaInv(y1, y2, y3, k, p) {
    var z1,z2,z3;
    var erro1, erro2, erro3;
    var alpha; 

    z1 = (x11 * y1) + (x12 * y2) + (x13 * y3);
    z2 = (x21 * y1) + (x22 * y2) + (x23 * y3);
    z3 = (x31 * y1) + (x32 * y2) + (x33 * y3);
      
    if(Math.abs(z1) >= Math.abs(z2) && Math.abs(z1) >=Math.abs(z3)){
        alpha = Math.abs(z1);
        
    }
    if(Math.abs(z2) >= Math.abs(z1) && Math.abs(z2) >=Math.abs(z3)){
        alpha = Math.abs(z2);
    }
    if(Math.abs(z3) >= Math.abs(z1) && Math.abs(z3) >=Math.abs(z2)){
        alpha = Math.abs(z3);
    }

    y1 = (1/alpha) * z1;
    y2 = (1/alpha) * z2;
    y3 = (1/alpha) * z3;

    aprox1 =  z1/y1;
    aprox2 =  z2/y2;
    aprox3 =  z3/y3;

    if(k){ // se NAO for a primeira iteracao
        
        erro1 = Math.abs((aprox1 - ant_aprox1));
        erro2 = Math.abs((aprox2 - ant_aprox2));
        erro3 = Math.abs((aprox3 - ant_aprox3));

        erro1 = erro1/Math.abs(aprox1);
        erro2 = erro2/Math.abs(aprox2);
        erro3 = erro3/Math.abs(aprox3);

        if(erro1 <= erro2 && erro1 <= erro3){
            if(erro1 < precisao){

                if(p){
                    showResult(1/aprox1,y1, y2, y3);
                } else {
                    showResult(aprox1,y1, y2, y3);
                }

                return;
            }else{
                ant_aprox1 = aprox1;
                ant_aprox2 = aprox2;
                ant_aprox3 = aprox3;

                if(p){
                    calculaPotenciaInv(y1, y2, y3, 1, 1);
                } else {
                    calculaPotenciaInv(y1, y2, y3, 1, 0);
                }
            }
        }
        if(erro2 <= erro1 && erro2 <= erro3){
            if(erro2 < precisao){
                if(p){
                    showResult(1/aprox2,y1, y2, y3);
                } else {
                    showResult(aprox2,y1, y2, y3);
                }
                return;
            }else{
                ant_aprox1 = aprox1;
                ant_aprox2 = aprox2;
                ant_aprox3 = aprox3;
                if(p){
                    calculaPotenciaInv(y1, y2, y3, 1, 1);
                } else {
                    calculaPotenciaInv(y1, y2, y3, 1, 0);
                }
            }
        }
        if(erro3 <= erro1 && erro3 <= erro2){
            if(erro3 < precisao){
                if(p){
                    showResult(1/aprox3,y1, y2, y3);
                } else {
                    showResult(aprox3,y1, y2, y3);
                }
                return;
            }else{
                ant_aprox1 = aprox1;
                ant_aprox2 = aprox2;
                ant_aprox3 = aprox3;
                if(p){
                    calculaPotenciaInv(y1, y2, y3, 1, 1);
                } else {
                    calculaPotenciaInv(y1, y2, y3, 1, 0);
                }
            }
        }
    } else { //se for a primeira iteracao

        ant_aprox1 = aprox1;
        ant_aprox2 = aprox2;
        ant_aprox3 = aprox3;
        if(p){
            calculaPotenciaInv(y1, y2, y3, 1, 1);
        } else {
            calculaPotenciaInv(y1, y2, y3, 1, 0);
        }
    }

}

function calculaInversa() {
  
    {
    var det;
    var c11, c12, c13, c21, c22, c23, c31, c32, c33;

    //Fazendo a matriz inversa
    det = x11*x22*x33 + x12*x23*x31 + x13*x21*x32 - x13*x22*x31 - x11 * x23*x32 - x12*x21*x33;

    c11 = (x22*x33 - x23*x32);
    c12 = -(x21*x33 - x23*x31);
    c13 = (x21*x32 - x22*x31);

    c21 = -(x12*x33 - x13*x32); 
    c22 = (x11*x33 - x13*x31);
    c23 = -(x11*x32 - x12*x31);

    c31 = (x12*x23 - x13*x22);
    c32 = -(x11*x23 - x13*x21);
    c33 = (x11*x22 - x12*x21);

    x11 = (1/det) * c11;
    x12 = (1/det) * c21;
    x13 = (1/det) * c31;
    
    x21 = (1/det) * c12;
    x22 = (1/det) * c22;
    x23 = (1/det) * c32;

    x31 = (1/det) * c13;
    x32 = (1/det) * c23;
    x33 = (1/det) * c33;
    } 

    calculaPotenciaInv(1, 1, 1, 0, 1);
}

function calculaSen(xqp, xpp) { //xqp eh a posicao que queremos transformar em 0; (q linha, p coluna).
    return xqp/Math.sqrt(Math.pow(xpp,2) + Math.pow(xqp,2));
}

function calculaCos(xqp, xpp) {
    return xpp/Math.sqrt(Math.pow(xpp,2) + Math.pow(xqp,2));
}

function calculaQR(x11, x12, x13, x21, x22, x23, x31, x32, x33) {
    
    var a;
    var u1, u2, u3;
    var r = math.zeros(3, 3), q = math.zeros(3, 3);

    a = math.matrix([
        [ x11, x12, x13], 
        [ x21, x22, x23], 
        [ x31, x32, x33]
    ]);

    var s, c;

    //gerar as tabelas U's

    //zerando o primeiro elemento de baixo da diagonal principal
    if(math.subset(a, math.index(1,0)) >= precisao){
        s = calculaSen(math.subset(a, math.index(1,0)), math.subset(a, math.index(0,0)));
        c = calculaCos(math.subset(a, math.index(1,0)), math.subset(a, math.index(0,0)));

        u1 = math.matrix([
            [ c, s, 0],
            [-s, c, 0],
            [ 0, 0, 1]
        ]);

        r = math.multiply(u1, a);
    } else { 
        u1 = math.identity(3);
        r = a;
    }

    if(math.subset(r, math.index(2,0)) >= precisao){
        s = calculaSen(math.subset(r, math.index(2,0)), math.subset(r, math.index(0,0)));
        c = calculaCos(math.subset(r, math.index(2,0)), math.subset(r, math.index(0,0)));

        u2 = math.matrix([
            [ c, 0, s],
            [ 0, 1, 0],
            [-s, 0, c]
        ]);

        r = math.multiply(u2, r);

    } else { 

        u2 = math.identity(3);
        
    }

    if(math.subset(r, math.index(2,1)) >= precisao){
        s = calculaSen(math.subset(r, math.index(2,1)), math.subset(r, math.index(1,1)));
        c = calculaCos(math.subset(r, math.index(2,1)), math.subset(r, math.index(1,1)));

        u3 = math.matrix([
            [ 1, 0, 0],
            [ 0, c, s],
            [ 0,-s, c]
        ]);

        r = math.multiply(u3, r);
    } else { 

        u3 = math.identity(3);
        
    }

    r = math.multiply(u3,u2);
    r = math.multiply(r,u1);
    r = math.multiply(r,a);
    

//    r = math.multiply(math.multiply(math.multiply(u3,u2),u1),a) //r = u3*u2*u1*a;

    console.log('r11:  ' + math.subset(r, math.index(0,0)));
    console.log('r12:  ' + math.subset(r, math.index(0,1)));
    console.log('r12:  ' + math.subset(r, math.index(0,2)));

    console.log('r21:  ' + math.subset(r, math.index(1,0)));
    console.log('r22:  ' + math.subset(r, math.index(1,1)));
    console.log('r23:  ' + math.subset(r, math.index(1,2)));

    console.log('r31:  ' + math.subset(r, math.index(2,0)));
    console.log('r32:  ' + math.subset(r, math.index(2,1)));
    console.log('r33:  ' + math.subset(r, math.index(2,2)));

    q = math.multiply(math.multiply(math.transpose(u1), math.transpose(u2)), math.transpose(u3)); // q = u1t*u2t*u3t; t = transpose

    console.log('q11:  ' + math.subset(q, math.index(0,0)));
    console.log('q12:  ' + math.subset(q, math.index(0,1)));
    console.log('q12:  ' + math.subset(q, math.index(0,2)));

    console.log('q21:  ' + math.subset(q, math.index(1,0)));
    console.log('q22:  ' + math.subset(q, math.index(1,1)));
    console.log('q23:  ' + math.subset(q, math.index(1,2)));

    console.log('q31:  ' + math.subset(q, math.index(2,0)));
    console.log('q32:  ' + math.subset(q, math.index(2,1)));
    console.log('q33:  ' + math.subset(q, math.index(2,2)));

    a = math.multiply(r, q);

    var resultadobom;

    resultadobom = math.subset(q, math.index(0,0)) * math.subset(r, math.index(0,0)) + math.subset(q, math.index(1,0)) * math.subset(r, math.index(0,1)) + math.subset(q, math.index(2,0)) * math.subset(r, math.index(0,2))

    console.log('RESULTADO QUE DA: ' + resultadobom);

    resultadobom = 0.8944 * 2.2360 + 0.4472 * 1.316;
    console.log('RESULTADO QUE QUERO: ' + resultadobom);

    console.log(math.subset(q, math.index(0,0)) + '*' + math.subset(r, math.index(0,0)) + ' + ' + math.subset(q, math.index(1,0)) + 
    '*'+ math.subset(r, math.index(0,1)) + ' +  ' + math.subset(q, math.index(2,0)) + '*' + math.subset(r, math.index(0,2)) + 
    ' = '+ math.subset(a, math.index(0,0)));

    x11 = math.subset(a, math.index(0,0));
    x12 = math.subset(a, math.index(0,1));
    x13 = math.subset(a, math.index(0,2));
    
    x21 = math.subset(a, math.index(1,0));
    x22 = math.subset(a, math.index(1,1));
    x23 = math.subset(a, math.index(1,2));

    x31 = math.subset(a, math.index(2,0));
    x32 = math.subset(a, math.index(2,1));
    x33 = math.subset(a, math.index(2,2)); 

    if(x21 < precisao && x31 < precisao && x32 < precisao){
        showResultQR(x11, x22, x33);
    } else { 
        calculaQR(x11, x12, x13, x21, x22, x23, x31, x32, x33);
    }
}

function showResultQR(autovalor1, autovalor2, autovalor3) {
    document.getElementById("result-section").style.display = "block";
    document.getElementById("result").textContent = "Autovalores: " + autovalor1 + ", " + autovalor2 + ", " + autovalor3;
    document.getElementById("autovet").style.display = "none";
}

function showResult(result, auto1, auto2, auto3) {
    document.getElementById("result-section").style.display = "block";
    document.getElementById("result").textContent = "Autovalores: " + result;
    document.getElementById("autovet").textContent = "Autovetores: (" + auto1 + ", " + auto2 + ", " + auto3 + ")";
}

function cleanGlobals() {
    precisao = 0;

    x11 = 0;
    x12 = 0;
    x13 = 0;
    x21 = 0;
    x22 = 0;
    x23 = 0;
    x31 = 0;
    x32 = 0;
    x33 = 0;

    document.getElementById("x11").value = 0;
    document.getElementById("x12").value = 0;
    document.getElementById("x13").value = 0;
    document.getElementById("x21").value = 0;
    document.getElementById("x22").value = 0;
    document.getElementById("x23").value = 0;
    document.getElementById("x31").value = 0;
    document.getElementById("x32").value = 0;
    document.getElementById("x33").value = 0;

    ant_aprox1 = 0;
    ant_aprox2 = 0;
    ant_aprox3 = 0;
}