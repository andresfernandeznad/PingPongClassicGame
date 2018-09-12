//CLASE POSICION

class posicion {

	public x:string;
	public y:string;
	
	constructor(x:string, y:string) {
		this.x = x;
		this.y = y;
	}

	public getX():string {
		return this.x;
	}
	public getY(): string{
		return this.y;
	}
}

//CLASE BOLA

class bola {

	private pos:posicion;

	
	constructor(pos:posicion) {
		this.pos = pos;
	}

	public getPos():posicion {
		return this.pos;
	}
}

//CLASE BARRERA

class barrera {

	private pos:posicion;

	
	constructor(pos:posicion) {
		this.pos = pos;
	}

	public getPos():posicion {
		return this.pos;
	}
}

//POSICIONAMOS BARRERAS

var barrera1 = new barrera(new posicion("10px", "255px"));
document.getElementById("barrera1").style.left = barrera1.getPos().getX();
var barrera2 = new barrera(new posicion("770px", "255px"));
document.getElementById("barrera2").style.left = barrera2.getPos().getX();
document.getElementById("barrera1").style.top = barrera1.getPos().getY();
document.getElementById("barrera2").style.top = barrera2.getPos().getY();

//POSICIONAMOS PELOTA

//var pelota = new bola(new posicion("385px", "285px")); CENTRADO

var pelota = new bola(new posicion((Math.random()*(300)+250 + "px"), (Math.random()*(200)+100 + "px")));
document.getElementById("pelota").style.left = pelota.getPos().getX();
document.getElementById("pelota").style.top = pelota.getPos().getY();

//FUNCIONAMIENTO DEL PING PONG

//SENTIDO DE LA PELOTA

var moverX: number;
var moverY: number;

var puntoizquierda: number;
var puntoDerecha: number;

puntoizquierda = 0;
puntoDerecha = 0;

moverX = Math.random();
if (moverX >= 0.5) {
	moverX = 1;
} else {
	moverX = -1;
}

moverY = Math.random();
if (moverY >= 0.5) {
	moverY = 1;
} else {
	moverY = -1;
}

//FUNCION QUE MUEVE LA BOLA
function moverBola() {
	var posBola = new posicion(document.getElementById("pelota").style.left, document.getElementById("pelota").style.top);
	//Saca el num para sumarle nueva posicion
	var num = posBola.getX().substring(0, posBola.getX().length - 2);
	var num2 = parseInt(num);
	document.getElementById("pelota").style.left = (num2 + moverX) + "px";

	var num = posBola.getY().substring(0, posBola.getY().length - 2);
	var num2 = parseInt(num);
	document.getElementById("pelota").style.top = (num2 + moverY) + "px";

	if (parseInt(posBola.getY().substring(0, posBola.getY().length - 2)) >= 570) {
		moverY = -1;
	}
	if (parseInt(posBola.getY().substring(0, posBola.getY().length - 2)) <= 0) {
		moverY = 1;
	}
	if (parseInt(posBola.getX().substring(0, posBola.getX().length - 2)) >= 770) {
		moverX = -1;
		puntoDerecha++;
	}
	document.getElementById("score1").innerHTML = puntoDerecha/3 + "";
	if (puntoDerecha/3 >= 10) {
		document.getElementById("score2").style.width = "176px";
	}
	if (puntoDerecha/3 >= 20) {
		document.getElementById("score2").style.width = "220px";
	}
	if (parseInt(posBola.getX().substring(0, posBola.getX().length - 2)) <= 0) {
		moverX = 1;
		puntoizquierda++;
	}
	document.getElementById("score2").innerHTML = puntoizquierda/3 + "";
	if (puntoizquierda/3 >= 10) {
		document.getElementById("score1").style.width = "176px";
	}
	if (puntoizquierda/3 >= 20) {
		document.getElementById("score1").style.width = "220px";
	}
}

//MOVER PALETAS

/*function encontrarPosicionPaleta(element): number {
	var posBarrera1: any = document.getElementById("barrera1").style.top;
	posBarrera1 = posBarrera1.substring(0, posBarrera1.length - 2);
	posBarrera1 = parseInt(posBarrera1);
	return posBarrera1;
}*/

var posBarrera1: any = document.getElementById("barrera1").style.top;
posBarrera1 = posBarrera1.substring(0, posBarrera1.length - 2);
posBarrera1 = parseInt(posBarrera1);

var posBarrera2: any = document.getElementById("barrera2").style.top;
posBarrera2 = posBarrera2.substring(0, posBarrera2.length - 2);
posBarrera2 = parseInt(posBarrera2);

function mover(event) {

	if (event.keyCode == 87) {
		if (posBarrera1 > 0) {
			posBarrera1 -= 5;
		}
		document.getElementById("barrera1").style.top = posBarrera1 + "px";
	} else if (event.keyCode == 83) {
		if (posBarrera1 < 510) {
			posBarrera1 += 5;
		}
		document.getElementById("barrera1").style.top = posBarrera1 + "px";
	} else if (event.keyCode == 38) {
		if (posBarrera2 > 0) {
			posBarrera2 -= 5;
		}
		document.getElementById("barrera2").style.top = posBarrera2 + "px";
	} else if (event.keyCode == 40) {
		if (posBarrera2 < 510) {
			posBarrera2 += 5;
		}
		document.getElementById("barrera2").style.top = posBarrera2 + "px";
	}
}

//FUNCION DE REBOTE DE LA BOLA

function rebota() {
	var posBola = new posicion(document.getElementById("pelota").style.left, document.getElementById("pelota").style.top);
	//Saca el num para sumarle nueva posicion
	var numx = posBola.getX().substring(0, posBola.getX().length - 2);
	var numX = parseInt(numx);

	var numy = posBola.getY().substring(0, posBola.getY().length - 2);
	var numY = parseInt(numy);
	if ((numX == 30) && (numY >= posBarrera1 - 20 && numy <= posBarrera1 + 110)) {
		moverX = 1;
		console.log("SAD");
	}

	if ((numX == 740) && (numY >= posBarrera2 - 20 && numy <= posBarrera2 + 110)) {
		moverX = -1;
		console.log("SAD");
	}
}

function main() {
	moverBola();
	rebota();
}

//INTERVALO DE FRECUENCIA

setInterval(main, 1);