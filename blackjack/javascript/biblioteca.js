//+++++++++++++++++ = explicacion de funcion
//----------------- = detalles del la linea
var consoleFunctions=false;
var consoleChips=true;
var consoleFlipDealer=true;

var enJuego=false;
function cuentaTotal(carta) {
    switch (carta.substring(1)) {
    case "A":
    case "K":
    case "Q":
    case "J":
    case "10":
        cuenta++;
        break;
    case "6":
    case "5":
    case "4":
    case "3":
    case "2":
        cuenta--;
        break;
    }
    document.getElementById("cuenta").innerHTML = parseInt(cuenta).toString();
}

function repartir() {
	if(consoleFunctions){
	console.log("repartir");
	}
	
	enJuego=true;
    totalGananciasRonda = 0; //Variable para guardar el valor de las ganancias de cada ronda para usar en la finalización del programa

    if (bet.fichas == 0) { //Indica la cantidad de fichas que se "apuestan"
        alert("Tienes que hacer una apuesta");
    } else {
        desactivarTodo(); //Para asegurar que el usuario no pueda dar a ningun boton durante el reparto de cartas
        if (focus == "mano1") {
            sacarCarta(Mano1);
        } else if (focus == "mano2") {
            sacarCarta(Mano2);
        }
    }
}

function elejirCarta(nCarta) { //+++++++++++++++++++++++++++++COMIENZO de funcion elejirCarta()
	if(consoleFunctions){
	console.log("elegirCarta");
	}
    //Asigna un valor a la carta que se va a sacar
    //La funcion esta separada en dos partes cartaSacada= el reverso de la carta  solo se le aplicara el efecto sacarMitad
    cartaSacada.style.visibility = "visible"; //Como la visiblidad es hidden se le da la visiblidad
    cartaSacada.className = ''; //se asegura de que no tenga clases asignadas
    var carta = mazoBarajado[0]; //Se escogera la primera carta de la baraja
    cuentaTotal(carta); //Modificación de la cuenta
    mazoBarajado.shift(); //Se retira la carta del mazo barajado
    //											RECORDATORIO: cartaSacada= div del contenedor que va del mazo a la carta que se va a sacar
    cartaSacada.style.backgroundImage = "url(imagenes/cartaReverso.jpg)"; //cambia el fondo de cartaSacada
    cartaSacada.classList.add('sacarMitad'); //cartaSacada va hasta la mitad con efecto de dar media vuelta
    setTimeout(function () { //hay que darle tiempo a que haga el efecto anterior
        url = 'imagenes/cards/' + carta + '.png'; //fija la url de la imagen de la carta que se va a sacar
        cartaSacada.style.backgroundImage = "url(" + "'" + url + "'" + ")"; //cambia el fondo(reverso) de la carta con la nueva carta(x)
        cartaSacada.classList.add('sacarEntera'); //cartaSacada va hasta el final con efecto de finalizar la vuelta
        setTimeout(function () { //hay que darle tiempo a que haga el efecto anterior despues fijara el fondo de la carta final
            cartaSacada.className = ''; //Borrar todas las clases
            nCarta.style.backgroundImage = "url(" + "'" + url + "'" + ")"; //la carta final tiene el valor de fondo de la url
            nCarta.style.backgroundSize = dimensiones; //Se le da las dimensiones(variable en archivo blackjack.html)
            nCarta.style.visibility = "visible"; //Como la visiblidad es hidden se le da la visiblidad
            document.getElementById("sacar").style.visibility = "hidden"; //esconder cartaSacada
        }, milisegundos - 20); //No terminara la accion del todo, sino glichea cuando vuelve a su sitio.
    }, milisegundos - 20); //No terminara la accion del todo, sino glichea cuando vuelve a su sitio.
    cuentaCarta = carta;
    return carta; //-------guardar el valor de carta para despues calcular la suma
} //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++FIN de funcion elejirCarta()

function sacarPosicionX(nCarta) { //++++++++++++++++++++++++++COMIENZO de la funcion sacarPosicionX()
    //															*cambia el valor de la variable CSS --leftCarta
    //													RECORDATORIO: nCarta= nombre del estilo de id CSS ej.(#cartaX)
    posicionX = window.getComputedStyle(document.querySelector(nCarta)).getPropertyValue("left");
    document.querySelector(':root').style.setProperty('--leftCarta', posicionX);
} //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++FIN de la funcion sacarPosicionX()

function sacarPosicionY(nCarta) { //++++++++++++++++++++++++++COMIENZO de la funcion sacarPosicionY()
    //															*cambia el valor de la variable CSS --topCarta
    //													RECORDATORIO: nCarta= nombre del estilo de id CSS ej.(#cartaX)
    posicionY = window.getComputedStyle(document.querySelector(nCarta)).getPropertyValue("top");
    document.querySelector(':root').style.setProperty('--topCarta', posicionY);
} //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++FIN de la funcion sacarPosicionY()

function sacarPosicionXFichaInicial(ficha) {
    posicionX = window.getComputedStyle(document.querySelector(ficha)).getPropertyValue("left");
    document.querySelector(':root').style.setProperty('--leftChipInicial', posicionX);
    return posicionX;
}

function sacarPosicionYFichaInicial(ficha) { //++++++++++++++++++++++++++COMIENZO de la funcion sacarPosicionY()
    //															*cambia el valor de la variable CSS --topCarta
    //													RECORDATORIO: nCarta= nombre del estilo de id CSS ej.(#cartaX)
    posicionY = window.getComputedStyle(document.querySelector(ficha)).getPropertyValue("top");
    document.querySelector(':root').style.setProperty('--topChipInicial', posicionY);
    return posicionY;
}

function sacarPosicionXFicha(ficha) {
    posicionX = window.getComputedStyle(document.querySelector(ficha)).getPropertyValue("left");
    document.querySelector(':root').style.setProperty('--leftChipDestino', posicionX);
    return posicionX;
}

function sacarPosicionYFicha(ficha) { //++++++++++++++++++++++++++COMIENZO de la funcion sacarPosicionY()
    //															*cambia el valor de la variable CSS --topCarta
    //													RECORDATORIO: nCarta= nombre del estilo de id CSS ej.(#cartaX)
    posicionY = window.getComputedStyle(document.querySelector(ficha)).getPropertyValue("top");
    document.querySelector(':root').style.setProperty('--topChipDestino', posicionY);
    return posicionY;
} //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++FIN de la funcion sacarPosicionY()

function turnoDealer() { //++++++++++++++++++++++++++COMIENZO de la funcion turnoDealer()
    //												*Saca la siguiente carta del dealer
	if(consoleFunctions){
	console.log("turnoDealer");
	}
    if (Dealer.cartas == 2) {
	if(consoleFlipDealer){
	console.log("FlipCardDealer");
	}
        cartaAbajo = document.getElementById("cartaAbajo");
        cartaAbajo.style.backgroundImage = "url(imagenes/cartaReverso.jpg)";
        cartaAbajo.style.backgroundSize = dimensiones;
        cartaAbajo.className = '';
        sacarPosicionX('#cartaAbajo');
        sacarPosicionY('#cartaAbajo');
        cartaAbajo.classList.add('sacarEscondidaMitad');
        setTimeout(function () {
            url = 'imagenes/cards/' + cartaEscondida + '.png';
            cartaAbajo.style.backgroundImage = "url(" + "'" + url + "'" + ")";
            cartaAbajo.style.backgroundSize = dimensiones;
            cartaAbajo.classList.add('sacarEscondidaEntera');
            setTimeout(function () {
                cartaAbajo.className = '';
                cartaAbajo.style.backgroundImage = "url(" + "'" + url + "'" + ")";
                cartaAbajo.style.backgroundSize = dimensiones;
                cuentaTotal(cartaEscondida);
            }, milisegundos - 30);
        }, milisegundos - 30);
        if (Dealer.totalSuma == 21) {
            Dealer.blackjack = true;
        }
    }

    if (Mano1.bust == true && (Mano1.split == false && Mano1.doubleDown == false)) {
	console.log("1");
        setTimeout(() => {
            perderFichas(bet);
            setTimeout(() => {
                btnPedir.disabled = true;
                btnPlantarse.disabled = true;
                recogerCartas();
            }, (100 * bet.fichas) + 2000);
        }, milisegundos);
    } else if (Dealer.totalSuma < 17 && Mano1.blackjack == false && (Mano1.bust == false && Mano2.bust == false)) {
	console.log("2");
        setTimeout(function () {
            switch (Dealer.cartas) {
            case 2:
                var nCarta = "#cartaDealer3"
                    var posicionCarta = document.getElementById("cartaDealer3");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                carta1Dealer = elejirCarta(posicionCarta);
                Dealer.sumar(carta1Dealer);
                break;
            case 3:
                var nCarta = "#cartaDealer4"
                    var posicionCarta = document.getElementById("cartaDealer4");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                Dealer.sumar(elejirCarta(posicionCarta));
                break;
            case 4:
                var nCarta = "#cartaDealer5"
                    var posicionCarta = document.getElementById("cartaDealer5");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                Dealer.sumar(elejirCarta(posicionCarta));
                break;
            case 5:
                var nCarta = "#cartaDealer6"
                    var posicionCarta = document.getElementById("cartaDealer6");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                Dealer.sumar(elejirCarta(posicionCarta));
                break;
            case 6:
                var nCarta = "#cartaDealer7"
                    var posicionCarta = document.getElementById("cartaDealer7");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                Dealer.sumar(elejirCarta(posicionCarta));
                break;
            }
            Dealer.cartas++;
            cartasSacadas++;
            turnoDealer();
        }, milisegundos * 2);
    } else {
	console.log("3");
        Dealer.fin = true;
        if (Mano1.bust == true && Mano2.bust == true) {
		console.log("31")
            perderFichas(bet);
            setTimeout(() => {
                perderFichas(bet2);
                mensaje();
            }, bet.fichas * 200);
        } else if ((Mano1.fin == true && Mano1.split == false && Mano1.bust == false) || (Mano2.fin == true && (Mano1.bust == false || Mano2.bust == false)) || Mano1.blackjack == true || Dealer.blackjack == true) {
            if (Dealer.totalSuma > 21) {
                Dealer.bust = true;
                if (Mano1.split == false && Mano1.doubleDown == false && Mano1.bust == false) {
                    ganarFichas(bet);
                    mensaje();
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano2.bust == false && Mano1.bust == false) {
                    ganarFichas(bet);
                    setTimeout(() => {
                        ganarFichas(bet2);
                        setTimeout(() => {
                            devolverFichas(bet2);
                            mensaje();
                        }, bet.fichas * 200);
                    }, bet.fichas * 200);
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano2.bust == false && Mano1.bust == true) {
                    perderFichas(bet);
                    setTimeout(() => {
                        ganarFichas(bet2);
                        setTimeout(() => {
                            devolverFichas(bet2);
                            mensaje();
                        }, bet.fichas * 200);
                    }, bet.fichas * 100);
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano2.bust == true && Mano1.bust == false) {
                    ganarFichas(bet);
                    setTimeout(() => {
                        perderFichas(bet2);
                        mensaje();
                    }, bet.fichas * 200);
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano2.bust == false && Mano1.bust == false) {
                    ganarFichas(bet);
                    setTimeout(() => {
                        ganarFichas(bet2);
                        mensaje();
                    }, bet.fichas * 200);
                } else if (Mano1.split == false && Mano1.doubleDown == true) {
                    ganarFichas(bet);
                    setTimeout(() => {
                        ganarFichas(bet2);
                        setTimeout(() => {
                            devolverFichas(bet2);
                            mensaje();
                        }, bet2.fichas * 200);
                    }, bet.fichas * 200);
                }
            } else {
                if (Mano1.split == false && Mano1.doubleDown == false && Mano1.bust == false) {
                    if (Mano1.blackjack == true && Dealer.blackjack == false) {
                        BJ.cantidad = Math.ceil(bet.cantidad * 1.5);
                        totalGananciasRonda += bet.cantidad * 1.5;
                        totalGanancias += bet.cantidad * 1.5;
                        ganarFichas(BJ);
                        mensaje();
                    } else if (Mano1.blackjack == false && Dealer.blackjack == true) {
                        perderFichas(bet);
                        mensaje();
                    } else if (Mano1.blackjack == false && Dealer.blackjack == true) {
                        perderFichas(bet);
                        mensaje();
                    } else if (Dealer.totalSuma > Mano1.totalSuma) {
                        perderFichas(bet);
                        mensaje();
                    } else if (Dealer.totalSuma < Mano1.totalSuma) {
                        ganarFichas(bet);
                        mensaje();
                    } else {
                        mensaje();
                    } //GOOD TO HERE
                } else if (Mano1.split == true && Mano1.bust == false && Mano2.bust == false) {
                    if (Dealer.totalSuma > Mano1.totalSuma) {
                        perderFichas(bet);
                        setTimeout(() => {
                            if (Dealer.totalSuma > Mano2.totalSuma) {
                                perderFichas(bet2);
                                mensaje();
                            } else if (Dealer.totalSuma < Mano2.totalSuma) {
                                ganarFichas(bet2);
                                setTimeout(() => {
                                    devolverFichas(bet2);
                                    mensaje();
                                }, bet2.fichas * 200);
                            } else {
                                setTimeout(() => {
                                    devolverFichas(bet2);
                                    mensaje();
                                }, bet2.fichas * 200);
                            }
                        }, 100 * bet.fichas);
                    } else if (Dealer.totalSuma < Mano1.totalSuma) {
                        ganarFichas(bet);
                        if (Dealer.totalSuma < Mano2.totalSuma) {
                            setTimeout(() => {
                                ganarFichas(bet2);
                                setTimeout(() => {
                                    devolverFichas(bet2);
                                    mensaje();
                                }, bet2.fichas * 200);
                            }, bet.fichas * 200);
                        } else if (Dealer.totalSuma > Mano2.totalSuma) {
                            setTimeout(() => {
                                perderFichas(bet2);
                                mensaje();
                            }, bet.fichas * 200);
                        } else if (Dealer.totalSuma == Mano2.totalSuma) {
                            setTimeout(() => {
                                devolverFichas(bet2);
                                mensaje();
                            }, bet.fichas * 200);
                        }
                    } else if (Dealer.totalSuma == Mano1.totalSuma) {
                        if (Dealer.totalSuma > Mano2.totalSuma) {
                            perderFichas(bet2);
                            mensaje();
                        } else if (Dealer.totalSuma < Mano2.totalSuma && Mano2.bust == false) {
                            ganarFichas(bet2);
                            setTimeout(() => {
                                devolverFichas(bet2);
                                mensaje();
                            }, bet2.fichas * 200);
                        } else {
                            setTimeout(() => {
                                devolverFichas(bet2);
                                mensaje();
                            }, bet2.fichas * 200);
                        }
                    }
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano1.bust == false && Mano2.bust == true) {
                    if (Dealer.totalSuma > Mano1.totalSuma) {
                        perderFichas(bet);
                        setTimeout(() => {
                            perderFichas(bet2);
                            mensaje();
                        }, bet.fichas * 100);
                    } else if (Dealer.totalSuma < Mano1.totalSuma) {
                        ganarFichas(bet);
                        setTimeout(() => {
                            perderFichas(bet2);
                            mensaje();
                        }, bet.fichas * 200);
                    } else if (Dealer.totalSuma == Mano1.totalSuma) {
                        perderFichas(bet2);
                        mensaje();
                    }
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano1.bust == true && Mano2.bust == false) {
                    if (Dealer.totalSuma > Mano2.totalSuma) {
                        perderFichas(bet);
                        setTimeout(() => {
                            perderFichas(bet2);
                            mensaje();
                        }, bet.fichas * 100);
                    } else if (Dealer.totalSuma < Mano2.totalSuma) {
                        perderFichas(bet);
                        setTimeout(() => {
                            ganarFichas(bet2);
                            mensaje();
                        }, bet.fichas * 100);
                    } else if (Dealer.totalSuma == Mano2.totalSuma) {
                        perderFichas(bet);
                        setTimeout(() => {
                            devolverFichas(bet2);
                            mensaje();
                        }, bet.fichas * 100);
                    }
                } else if (Mano1.split == true && Mano1.doubleDown == false && Mano1.bust == true && Mano2.bust == true) {
                    perderFichas(bet);
                    setTimeout(() => {
                        perderFichas(bet2);
                        mensaje();
                    }, bet.fichas * 100);
                } else if (Mano1.doubleDown == true) {
                    if (Dealer.totalSuma > Mano1.totalSuma) {
                        perderFichas(bet);
                        setTimeout(() => {
                            perderFichas(bet2);
                            mensaje();
                        }, bet.fichas * 100);
                    } else if (Dealer.totalSuma < Mano1.totalSuma) {
                        ganarFichas(bet);
                        setTimeout(() => {
                            ganarFichas(bet2);
                            setTimeout(() => {
                                devolverFichas(bet2);
                                mensaje();
                            }, bet2.fichas * 200);
                        }, bet.fichas * 200);
                    } else if (Dealer.totalSuma == Mano1.totalSuma) {
                        devolverFichas(bet2);
                        mensaje();
                    }
                }
            }
        }
    }
}

function mensaje() {
	var velocidad=8;//fast
	if(consoleFunctions){
	console.log("mensaje");
	}
    setTimeout(function () {
        if (totalGananciasRonda > 0) {
            var victoria = document.getElementById("victoria");
            victoria.className = "";
            victoria.style.visibility = "visible";
            victoria.classList.add("aumentar");
            setTimeout(() => {
                victoria.classList.add("encoger");
                setTimeout(() => {
                    victoria.className = "";
                    victoria.style.visibility = "hidden";
                    recogerCartas();
                }, 300);
            }, milisegundos * velocidad);
        } else if (totalGananciasRonda < 0) {
            var derrota = document.getElementById("derrota");
            derrota.style.visibility = "visible";
            derrota.classList.add("aumentar");
            setTimeout(() => {
                derrota.classList.add("encoger");
                setTimeout(() => {
                    derrota.className = "";
                    derrota.style.visibility = "hidden";
                    recogerCartas();
                }, 300);
            }, milisegundos * velocidad);
        } else {
            var empate = document.getElementById("empate");
            empate.style.visibility = "visible";
            empate.classList.add("aumentar");
            setTimeout(() => {
                empate.classList.add("encoger");
                setTimeout(() => {
                    empate.className = "";
                    empate.style.visibility = "hidden";
                    recogerCartas();
                }, 300);
            }, milisegundos * velocidad);
        }

        if (bet.cantidad + fichas.cantidad > 10000) {
            alert("Enhorabuena, has ganado!!!");
        }
		
		enJuego=false;
		
    }, (bet2.fichas * 200 + bet.fichas * 200));
	enJuego=false;
}

function repartirDealer() {
	if(consoleFunctions){
	console.log("repartirDealer");
	}
    if (Dealer.cartas == 0) {
        var nCarta = "#cartaArriba";
        cartaArriba.className = '';
        var posicionCarta = document.getElementById("cartaArriba");
        sacarPosicionX(nCarta);
        sacarPosicionY(nCarta);
        Dealer.sumar(elejirCarta(posicionCarta));
        Dealer.cartas++;
        cartasSacadas++;
        setTimeout(function () {
            var nCarta = "#cartaAbajo";
            cartaEscondida = mazoBarajado[0]; //(x)
            mazoBarajado.shift();
            cartaAbajo.className = '';
            cartaAbajo.style.backgroundImage = "url(imagenes/cartaReverso.jpg)";
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            cartaAbajo.classList.add("cartaEscondida");
            cartaAbajo.style.visibility = "visible";
            Dealer.sumar(cartaEscondida);
            if (Dealer.totalSuma == 21) {
                desactivarTodo();
				setTimeout(()=>{
				turnoDealer();
				},milisegundos * 2);
            } else {
                if (Mano1.blackjack == false) {
                    setTimeout(() => {
                        activarTodo();
                        desactivarFichas();
                    }, milisegundos * 2);
                }
            }
        }, milisegundos * 1.9);
        Dealer.cartas++;
        cartasSacadas++;
    }
}

function barajar() {
	if(consoleFunctions){
	console.log("barajar");
	}
    var barajas = document.getElementById("barajas");
    mazoBarajado = new Array(0);
    var posicion;
    for (var i = 0; i < parseInt(barajas.value); i++) {
        mazoBarajado = mazoBarajado.concat(mazo);
    }

    for (var i = 0; i < mazoBarajado.length; i++) {
        posicion = Math.floor(Math.random() * 52);
        aux = mazoBarajado[i];
        mazoBarajado[i] = mazoBarajado[posicion];
        mazoBarajado[posicion] = aux;
    }
}

function recogerCartas() {
	if(consoleFunctions){
	console.log("recogerCartas");
	}
    desactivarTodo();
    var blackjack = document.getElementById("blackjack");
    if (blackjack.style.visibility == "visible") {
        blackjack.className = "";
        blackjack.classList.add("desaparecer");
        setTimeout(() => {
            blackjack.style.visibility = "hidden";
        }, 290);
    }
    if (Dealer.cartas == 2 && Mano1.bust == true) {
        cartaAbajo = document.getElementById("cartaAbajo");
        cartaAbajo.style.backgroundImage = "url(imagenes/cartaReverso.jpg)";
        cartaAbajo.style.backgroundSize = dimensiones;
        cartaAbajo.className = '';
        sacarPosicionX('#cartaAbajo');
        sacarPosicionY('#cartaAbajo');
        cartaAbajo.classList.add('sacarEscondidaMitad');
        setTimeout(function () {
            url = 'imagenes/cards/' + cartaEscondida + '.png';
            cartaAbajo.style.backgroundImage = "url(" + "'" + url + "'" + ")";
            cartaAbajo.style.backgroundSize = dimensiones;
            cartaAbajo.classList.add('sacarEscondidaEntera');
            setTimeout(function () {
                cartaAbajo.className = '';
                cartaAbajo.style.backgroundImage = "url(" + "'" + url + "'" + ")";
                cartaAbajo.style.backgroundSize = dimensiones;
            }, milisegundos - 30);
        }, milisegundos - 30);
    }
	
    setTimeout(function () {
        var s = 1;
        var sf = 30;
        sacar.style.backgroundImage = "url(imagenes/cartaReverso.jpg)";

        if (carta211.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta211");
                sacarPosicionY("#carta211");
                carta211.classList.add("recogerCarta");
                setTimeout(function () {
                    carta211.className = "";
                    carta211.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta210.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta210");
                sacarPosicionY("#carta210");
                carta210.classList.add("recogerCarta");
                setTimeout(function () {
                    carta210.className = "";
                    carta210.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta29.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta29");
                sacarPosicionY("#carta29");
                carta29.classList.add("recogerCarta");
                setTimeout(function () {
                    carta29.className = "";
                    carta29.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta28.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta28");
                sacarPosicionY("#carta28");
                carta28.classList.add("recogerCarta");
                setTimeout(function () {
                    carta28.className = "";
                    carta28.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta27.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta27");
                sacarPosicionY("#carta27");
                carta27.classList.add("recogerCarta");
                setTimeout(function () {
                    carta27.className = "";
                    carta27.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta26.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta26");
                sacarPosicionY("#carta26");
                carta26.classList.add("recogerCarta");
                setTimeout(function () {
                    carta26.className = "";
                    carta26.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta25.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta25");
                sacarPosicionY("#carta25");
                carta25.classList.add("recogerCarta");
                setTimeout(function () {
                    carta25.className = "";
                    carta25.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta24.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta24");
                sacarPosicionY("#carta24");
                carta24.classList.add("recogerCarta");
                setTimeout(function () {
                    carta24.className = "";
                    carta24.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta23.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta23");
                sacarPosicionY("#carta23");
                carta23.classList.add("recogerCarta");
                setTimeout(function () {
                    carta23.className = "";
                    carta23.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta22.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta22");
                sacarPosicionY("#carta22");
                carta22.classList.add("recogerCarta");
                setTimeout(function () {
                    carta22.className = "";
                    carta22.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta21.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta21");
                sacarPosicionY("#carta21");
                carta111.classList.add("recogerCarta");
                setTimeout(function () {
                    carta21.className = "";
                    carta21.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta111.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta111");
                sacarPosicionY("#carta111");
                carta111.classList.add("recogerCarta");
                setTimeout(function () {
                    carta111.className = "";
                    carta111.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (carta110.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta110");
                sacarPosicionY("#carta110");
                carta110.classList.add("recogerCarta");
                setTimeout(function () {
                    carta110.className = "";
                    carta110.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta19.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta19");
                sacarPosicionY("#carta19");
                carta19.classList.add("recogerCarta");
                setTimeout(function () {
                    carta19.className = "";
                    carta19.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta18.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta18");
                sacarPosicionY("#carta18");
                carta18.classList.add("recogerCarta");
                setTimeout(function () {
                    carta18.className = "";
                    carta18.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta17.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta17");
                sacarPosicionY("#carta17");
                carta17.classList.add("recogerCarta");
                setTimeout(function () {
                    carta17.className = "";
                    carta17.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta16.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta16");
                sacarPosicionY("#carta16");
                carta16.classList.add("recogerCarta");
                setTimeout(function () {
                    carta16.className = "";
                    carta16.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta15.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta15");
                sacarPosicionY("#carta15");
                carta15.classList.add("recogerCarta");
                setTimeout(function () {
                    carta15.className = "";
                    carta15.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta14.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta14");
                sacarPosicionY("#carta14");
                carta14.classList.add("recogerCarta");
                setTimeout(function () {
                    carta14.className = "";
                    carta14.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta13.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta13");
                sacarPosicionY("#carta13");
                carta13.classList.add("recogerCarta");
                setTimeout(function () {
                    carta13.className = "";
                    carta13.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta12.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta12");
                sacarPosicionY("#carta12");
                carta12.classList.add("recogerCarta");
                setTimeout(function () {
                    carta12.className = "";
                    carta12.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        if (carta11.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#carta11");
                sacarPosicionY("#carta11");
                carta11.classList.add("recogerCarta");
                setTimeout(function () {
                    carta11.className = "";
                    carta11.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer9.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer9");
                sacarPosicionY("#cartaDealer9");
                cartaDealer9.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer9.className = "";
                    cartaDealer9.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer8.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer8");
                sacarPosicionY("#cartaDealer8");
                cartaDealer9.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer9.className = "";
                    cartaDealer9.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer7.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer7");
                sacarPosicionY("#cartaDealer7");
                cartaDealer7.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer7.className = "";
                    cartaDealer7.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer6.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer6");
                sacarPosicionY("#cartaDealer6");
                cartaDealer6.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer6.className = "";
                    cartaDealer6.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer5.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer5");
                sacarPosicionY("#cartaDealer5");
                cartaDealer5.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer5.className = "";
                    cartaDealer5.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer4.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer4");
                sacarPosicionY("#cartaDealer4");
                cartaDealer4.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer4.className = "";
                    cartaDealer4.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaDealer3.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaDealer3");
                sacarPosicionY("#cartaDealer3");
                cartaDealer3.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaDealer3.className = "";
                    cartaDealer3.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaAbajo.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaAbajo");
                sacarPosicionY("#cartaAbajo");
                cartaAbajo.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaAbajo.className = "";
                    cartaAbajo.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }

        if (cartaArriba.style.visibility == "visible") {
            setTimeout(function () {
                sacarPosicionX("#cartaArriba");
                sacarPosicionY("#cartaArriba");
                cartaArriba.classList.add("recogerCarta");
                setTimeout(function () {
                    cartaArriba.className = "";
                    cartaArriba.style.visibility = "hidden";
                    sacar.style.visibility = "visible";
                    sacar.classList.add("recogerSacada");
                    setTimeout(function () {
                        sacar.style.visibility = "hidden";
                        sacar.className = "";
                        document.getElementById("descarte").style.visibility = "visible";
                    }, milisegundos - sf);
                }, milisegundos - sf);
            }, milisegundos * s);
            s += 2;
        }
        setTimeout(function () {
            if (mazoBarajado.length < 10) {
                barajar();
            }

            //Al final de cada mano los valores volveran a los originales del constructor
            //el objeto Mano2 no utilizara la variable split,doubleDown y blackjack.
            Mano1.as = false;
            Mano1.totalSuma = 0;
            Mano1.cartas = 0;
            Mano1.bust = false;
            Mano1.split = false;
            Mano1.doubleDown = false;
            Mano1.blackjack = false;
            Mano1.fin = false;

            Mano2.as = false;
            Mano2.totalSuma = 0;
            Mano2.cartas = 0;
            Mano2.bust = false;
            Mano2.fin = false;

            Dealer.as = false;
            Dealer.totalSuma = 0;
            Dealer.cartas = 0;
            Dealer.bust = false;
            Dealer.split = false;
            Dealer.doubleDown = false;
            Dealer.blackjack = false;
            Dealer.fin = false;

            BJ.cantidad = 0;
            focus = "mano1";
            activarTodo();
            btnPlantarse.disabled = true;
            btnPedir.disabled = true;
			
			activarTodo();
        }, milisegundos * (s + 2));
    }, milisegundos * 2);
}

function sacarCarta(mano) { //++++++++++++++++++++++++++++++++++Comienzo de FUNCION sacarCarta()++++++++++++++++++++++++++++++++++++
	if(consoleFunctions){
	console.log("sacarCarta");
	}
    desactivarTodo();
    btnSplit.style.visibility = "hidden";

    btnDoubleDown.style.visibility = "hidden";
    cartasSacadas++;

    if (mano.totalSuma < 21) {
        var carta;

        var i = (focus.substring((focus.length - 1))).toString();

        switch (mano.cartas) { //--Depende de que carta se tenga que sacar
        case 0: //-----------------------------------------------------Al principio se tiene que sacar dos a la fuerza
            var nCarta = "#carta" + i + "1"; //---------------------------------------coge referencia el estilo del id del contenedor en el CSS (para sacar el top y left)
            var posicionCarta = document.getElementById("carta" + i + "1"); //-------coge referencia del id en HTML
            sacarPosicionX(nCarta); //-------------------------------------para saber donde esta el left de la carta
            sacarPosicionY(nCarta); //-------------------------------------para saber donde esta el top de la carta
            carta1Palo = elejirCarta(posicionCarta);
            carta1 = carta1Palo.substring(1);
            mano.sumar(carta1Palo); //--actualiza la suma de la apuesta del jugador

            setTimeout(function () {
                var nCarta = "#carta" + i + "2";
                var posicionCarta = document.getElementById("carta" + i + "2");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                carta2Palo = elejirCarta(posicionCarta);
                carta2 = carta2Palo.substring(1);
                mano.sumar(carta2Palo);
                mano.cartas++;
                setTimeout(function () {
                    if (Mano1.totalSuma == 21 && focus == "mano1") { //BLACKJACK
                        Mano1.blackjack = true;
                        Mano1.fin = true;
                        var blackjack = document.getElementById("blackjack");
                        blackjack.style.visibility = "visible";
                        blackjack.classList.add("blackjack");
                        desactivarTodo();
                    }
                    repartirDealer();
                    if (Mano1.fin == true && (Mano1.split == false)) {
                        setTimeout(() => {
                            plantarse();
                        }, 3000);
                    }
                    if (carta1 == carta2) {
                        btnSplit.style.visibility = "visible";
                    } else if (Mano1.totalSuma == 10 || Mano1.totalSuma == 11) {
                        btnDoubleDown.style.visibility = "visible";
                    }
                }, milisegundos * 2);
            }, milisegundos * 2);
            cartasSacadas++;
            break;

        case 1:
            setTimeout(function () {
                var nCarta = "#carta" + i + "2"
                    var posicionCarta = document.getElementById("carta" + i + "2");
                sacarPosicionX(nCarta);
                sacarPosicionY(nCarta);
                mano.sumar(elejirCarta(posicionCarta));
                setTimeout(function () {
                    repartirDealer();
                }, milisegundos * 2);
            }, milisegundos * 2);
            break;

        case 2:
            var nCarta = "#carta" + i + "3"
                var posicionCarta = document.getElementById("carta" + i + "3");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 3:
            var nCarta = "#carta" + i + "4"
                var posicionCarta = document.getElementById("carta" + i + "4");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 4:
            var nCarta = "#carta" + i + "5"
                var posicionCarta = document.getElementById("carta" + i + "5");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 5:
            var nCarta = "#carta" + i + "6"
                var posicionCarta = document.getElementById("carta" + i + "6");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 6:
            var nCarta = "#carta" + i + "7"
                var posicionCarta = document.getElementById("carta" + i + "7");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 7:
            var nCarta = "#carta" + i + "8"
                var posicionCarta = document.getElementById("carta" + i + "8");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 8:
            var nCarta = "#carta" + i + "9"
                var posicionCarta = document.getElementById("carta" + i + "9");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 9:
            var nCarta = "#carta" + i + "10"
                var posicionCarta = document.getElementById("carta" + i + "10");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;

        case 10:
            var nCarta = "#carta" + i + "11"
                var posicionCarta = document.getElementById("carta" + i + "11");
            sacarPosicionX(nCarta);
            sacarPosicionY(nCarta);
            mano.sumar(elejirCarta(posicionCarta));
            break;
        }
        mano.cartas++; //-----------------------------------Sumar total de cartas que tiene el jugador------------------------------
        if (Dealer.cartas >= 2 && Mano1.doubleDown == false && mano.totalSuma <= 21) {
            setTimeout(() => {
				console.log("active");
                activarTodo();
                desactivarFichas();
            }, milisegundos * 5);
        }else if(focus=="mano2"){
			
		}
    }

    if (mano.totalSuma > 21) { //---------------------------------------visualizar que el jugador se haya pasado de 21--------------------------
        desactivarTodo();
        if (focus == "mano1") {
            Mano1.bust = true;
            Mano1.fin = true;
        } else if (focus == "mano2") {
            Mano2.bust = true;
            Mano2.fin = true;
        }

        setTimeout(() => {
            plantarse();
        }, milisegundos * 4);
    }
} //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++FIN de FUNCION sacarCarta()++++++++++++++++++++++++++++++++++++++++++++++

function plantarse() {
	if(consoleFunctions){
	console.log("plantarse");
	}
    btnSplit.style.visibility = "hidden";
    btnDoubleDown.style.visibility = "hidden";
    if (focus == "mano1") {
        Mano1.fin = true;
    } else if (focus == "mano2") {
        Mano2.fin = true;
    }

    if (Mano1.split == true && focus == "mano1") {
        focus = "mano2";
        sacarCarta(Mano2);
    } else if (Mano1.fin == true && (Mano1.split == false || Mano2.fin == true)) {

        turnoDealer();
    }
    desactivarTodo();
}

function refresh() {
	if(consoleFunctions){
	console.log("refresh");
	}

    if (descarte.style.visibility == "visible") {
        sacar = document.getElementById("sacar");

        for (var i = 1; i <= cartasSacadas; i++) {
            setTimeout(function () {
                sacar.style.visibility = "visible";
                sacar.classList.add('refresh');
                setTimeout(function () {
                    sacar.className = '';
                    sacar.style.visibility = "hidden";
                }, ((milisegundos / 6)));
            }, (i - 1) * (milisegundos / 3));

        }
        setTimeout(function () {
            descarte.style.visibility = "hidden";
        }, ((cartasSacadas - 1) * milisegundos / 3));

        cartasSacadas = 0;
    }
    barajar();
}

function comprarFichas() {
	if(consoleFunctions){
	console.log("comprarFichas");
	}
    desactivarTodo();
	var cantidadMax=2500;
	
	var fichasPrevias = new hucha();
	var fichasSacar = new hucha();
	
	fichasPrevias.cantidad=fichas.cantidad;
	fichasPrevias.rojas=fichas.rojas;
	fichasPrevias.verdes=fichas.verdes;
	fichasPrevias.azules=fichas.azules;
	fichasPrevias.negras=fichas.negras;
	fichasPrevias.moradas=fichas.moradas;
	
	let isCancelled=false;
    setTimeout(function () {
        do {
                var cantidad = prompt("Introduzca la cantidad de fichas que deseas comprar(€)");
				if(cantidad!=null){
                if (cantidad.substring(cantidad.length - 1) == "€") {
                    cantidad = parseInt(cantidad.substring(0, cantidad.length - 1))
                }
				}
                if ((isNaN(cantidad) || cantidad < 1  || cantidad == null || ((fichas.cantidad+parseInt(cantidad))>cantidadMax))  && (fichas.cantidad<=0)) {
                    alert("Tienes que introducir un digito, la cantidad total de fichas no puede ser mayor que "+cantidadMax+"€ o menor que 1€");
				}else if((fichas.cantidad>0 && cantidad==null) || (cantidad < 1)){
				if(cantidad < 1 && cantidad!=""){
					alert("Tiene que ser un numero positivo");
				}
				isCancelled=true;
				}
		} while ((isNaN(cantidad) || cantidad == undefined || cantidad==""|| (fichas.cantidad+parseInt(cantidad)) < 1 || (fichas.cantidad+parseInt(cantidad)) > cantidadMax) && (fichas.cantidad<=0));
		
		
		if(!isCancelled){
		
        fichas.cantidad = fichasPrevias.cantidad+parseInt(cantidad);
		fichasSacar.cantidad=parseInt(cantidad);

        fichasSacar.moradas = parseInt(cantidad / 500);
		//fichas.moradas = parseInt(fichas.cantidad / 500);

		if (fichasSacar.moradas >= 1 || (fichasSacar.cantidad - (fichasSacar.moradas * 500) == 0)) {
            fichasSacar.moradas--;
        }

        fichasSacar.cantidad = fichasSacar.cantidad - (fichasSacar.moradas * 500);

        fichasSacar.negras = parseInt(fichasSacar.cantidad / 100);
        if (fichasSacar.negras >= 1 || (fichasSacar.cantidad - (fichasSacar.negras * 100) == 0)) {
            fichasSacar.negras--;
        }

        fichasSacar.cantidad = fichasSacar.cantidad - (fichasSacar.negras * 100);

        fichasSacar.azules = parseInt(fichasSacar.cantidad / 50);
        if (fichasSacar.azules >= 1 || fichasSacar.cantidad - (fichasSacar.azules * 50) == 0) {
            fichasSacar.azules--;
        }

        fichasSacar.cantidad = fichasSacar.cantidad - (fichasSacar.azules * 50);

        fichasSacar.verdes = parseInt(fichasSacar.cantidad / 10);

        if (fichasSacar.cantidad % 10 == 0) {
            fichasSacar.verdes--;
        }
		
        fichasSacar.cantidad = fichasSacar.cantidad - (fichasSacar.verdes * 10);

        fichasSacar.rojas = fichasSacar.cantidad;

        fichasSacar.cantidad = fichasSacar.rojas + (fichasSacar.verdes * 10) + (fichasSacar.azules * 50) + (fichasSacar.negras * 100) + (fichasSacar.moradas * 500);
		fichas.rojas += fichasSacar.rojas;
		fichas.verdes += fichasSacar.verdes;
		fichas.azules += fichasSacar.azules;
		fichas.negras += fichasSacar.negras;
		fichas.moradas += fichasSacar.moradas;
		
        /*if (fichas.moradas >= 1 || (fichas.cantidad - (fichas.moradas * 500) == 0)) {
            fichas.moradas--;
        }

        fichas.cantidad = fichas.cantidad - (fichas.moradas * 500);

        fichas.negras = parseInt(fichas.cantidad / 100);
        if (fichas.negras >= 1 || (fichas.cantidad - (fichas.negras * 100) == 0)) {
            fichas.negras--;
        }

        fichas.cantidad = fichas.cantidad - (fichas.negras * 100);

        fichas.azules = parseInt(fichas.cantidad / 50);
        if (fichas.azules >= 1 || fichas.cantidad - (fichas.azules * 50) == 0) {
            fichas.azules--;
        }

        fichas.cantidad = fichas.cantidad - (fichas.azules * 50);

        fichas.verdes = parseInt(fichas.cantidad / 10);

        if (fichas.cantidad % 10 == 0) {
            fichas.verdes--;
        }
		
        fichas.cantidad = fichas.cantidad - (fichas.verdes * 10);

        fichas.rojas = fichas.cantidad;

        fichas.cantidad = fichas.rojas + (fichas.verdes * 10) + (fichas.azules * 50) + (fichas.negras * 100) + (fichas.moradas * 500);*/

        var style = document.createElement('style');
        style.type = 'text/css';
        var nuevoDiv;
        var text = "";

        var posicion = [];
        numFicha = 1;
        for (let i = 0; i <= 4; i++) {
            switch (i) {
            case 0:
                var color = "rojas";
                var imagen = "fichaRoja.png";
                break;
            case 1:
                var color = "verdes";
                var imagen = "fichaVerde.png";
                break;
            case 2:
                var color = "azules";
                var imagen = "fichaAzul.png";
                break;
            case 3:
                var color = "negras";
                var imagen = "fichaNegra.png";
                break;
            case 4:
                var color = "moradas";
                var imagen = "fichaMorada.png";
                break;
            }

            let k = fichasPrevias[color]+1;
            while (k <= fichas[color]) {
                let nuevoDiv = document.createElement("div"); //Crear el elemento div
                var id = (color + k).toString();
                var idElement = "#" + id;
                nuevoDiv.setAttribute("id", id);
                document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                document.getElementById(id).style.height = "var(--alturaChip)";
                document.getElementById(id).style.width = "var(--anchuraChip)";
				document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
				correctZIndex(id,k);
                document.getElementById(id).style.position = "absolute";
                document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + k + ")";
                document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + i + "))";
                document.getElementById(id).style.visibility = "hidden";
                document.getElementById(id).className = "";
                document.getElementById(id).disabled = true;
                var idElement = "#" + id;
                posicion.push(idElement); //top
                k++;
            }
        }

        numFicha = 1;
        var color = "rojas";
        r = fichasPrevias.rojas;
        while (r < fichas[color]) {
            id = (color + (r + 1)).toString();
            fichar(numFicha, posicion[numFicha - 1], id);
            numFicha++;
            r++;
        }
        var color = "verdes";
        v = fichasPrevias.verdes;
        while (v < fichas[color]) {
            id = (color + (v + 1)).toString();
            fichar(numFicha, posicion[numFicha - 1], id);
            numFicha++;
            v++;
        }
        var color = "azules";
        a = fichasPrevias.azules;
        while (a < fichas[color]) {
            id = (color + (a + 1)).toString();
            fichar(numFicha, posicion[numFicha - 1], id);
            numFicha++;
            a++;
        }
        var color = "negras";
        n = fichasPrevias.negras;
        while (n < fichas[color]) {
            id = (color + (n + 1)).toString();
            fichar(numFicha, posicion[numFicha - 1], id);
            numFicha++;
            n++;
        }
        var color = "moradas";
        m = fichasPrevias.moradas;
        while (m < fichas[color]) {
            id = (color + (m + 1)).toString();
            fichar(numFicha, posicion[numFicha - 1], id);
            numFicha++;
            m++;
        }

        function fichar(numFicha, x, id) {
            setTimeout(() => {
                sacarPosicionXFicha(x);
                sacarPosicionYFicha(x);
                document.getElementById(id).classList.add('sacarFicha');
                document.getElementById(id).style.animationFillMode = "forwards";
            }, numFicha * 110);
        }

        setTimeout(() => {
            activarTodo();
            btnPlantarse.disabled = true;
            btnPedir.disabled = true;
            document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
			autoCambiarFichas();
        }, numFicha * 120);
		}else{
		activarTodo();
		}
    }, milisegundos);
	
}

function split() {
    desactivarTodo();
    Mano1.split = true;
    function VerdeARoja() {
        id = "verdes" + fichas.verdes;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function AzulAVerde() {
        id = "azules" + fichas.azules;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function NegraAAzul() {
        id = "negras" + fichas.negras;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function MoradaANegra() {
        id = "moradas" + fichas.moradas;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function RojaAVerde() {
        id = "rojas" + fichas.rojas;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function VerdeAAzul() {
        id = "verdes" + fichas.verdes;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function AzulANegra() {
        id = "azules" + fichas.azules;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function NegraAMorada() {
        id = "negras" + fichas.negras;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function pasarFichas(m, n, a, v, r) {
        bet2.rojas = r;
        bet2.verdes = v;
        bet2.azules = a;
        bet2.negras = n;
        bet2.moradas = m;

        fichas.cantidad -= ((r) + (v * 10) + (a * 50) + (n * 100) + (m * 500));
        document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
        if (r != 0) {
            var i = 1;
            intervaloR = setInterval(function () {
                bet2.fichas++;
                var imagen = "fichaRoja.png";
                var id = "rojas" + fichas.rojas;
                let nuevoDiv = document.createElement("div");
                var idElement = ("#" + id).toString();
                fichas.rojas--;
                sacarPosicionXFichaInicial(idElement);
                sacarPosicionYFichaInicial(idElement);
                document.getElementById(id).remove();
                id = ("rojas" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                idElement = ("#" + id).toString();
                nuevoDiv.setAttribute("id", id);
                document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                document.getElementById(id).style.height = "var(--alturaChip)";
                document.getElementById(id).style.width = "var(--anchuraChip)";
                document.getElementById(id).style.position = "absolute";
                document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
				correctZIndex(id,fichas.rojas);

                if (bet2.fichas <= 15) {
                    document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 1) + ")";
                    document.getElementById(id).style.left = "650px";
                } else if (bet.fichas <= 30) {
                    document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 15 - 1) + ")";
                    document.getElementById(id).style.left = "calc(650px + var(--anchuraChip))";
                } else {
                    document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 30 - 1) + ")";
                    document.getElementById(id).style.left = "calc(650px + (var(--anchuraChip) * 2))";
                }

                sacarPosicionXFicha(idElement);
                sacarPosicionYFicha(idElement);
                document.getElementById(id).className = "";
                document.getElementById(id).classList.add("pasarFicha");

                if (i == r) {
                    clearInterval(intervaloR);
                } else {
                    i++;
                }
            }, 100);
        }

        setTimeout(function () {
            if (v != 0) {
                var i = 1;
                intervaloV = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaVerde.png";
                    var id = "verdes" + fichas.verdes;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.verdes--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("verdes" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.verdes);
                    document.getElementById(id).className = "";

                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 1) + ")";
                        document.getElementById(id).style.left = "650px";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 15 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + var(--anchuraChip))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 30 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + (var(--anchuraChip) * 2))";
                    }
                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == v) {
                        clearInterval(intervaloV);
                    }
                    i++;
                }, 100);
            }
        }, 100 * r);

        setTimeout(function () {
            if (a != 0) {
                var i = 1;
                intervaloA = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaAzul.png";
                    var id = "azules" + fichas.azules;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.azules--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("azules" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.azules);
                    document.getElementById(id).className = "";

                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 1) + ")";
                        document.getElementById(id).style.left = "650px";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 15 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + var(--anchuraChip))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 30 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + (var(--anchuraChip) * 2))";
                    }
                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == a) {
                        clearInterval(intervaloA);
                    }
                    i++;
                }, 100);
            }
        }, (100 * r) + (100 * v));

        setTimeout(function () {
            if (n != 0) {
                var i = 1;
                intervaloN = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaNegra.png";
                    var id = "negras" + fichas.negras;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.negras--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("negras" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.negras);
                    document.getElementById(id).className = "";

                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 1) + ")";
                        document.getElementById(id).style.left = "650px";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 15 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + var(--anchuraChip))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 30 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + (var(--anchuraChip) * 2))";
                    }
                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == n) {
                        clearInterval(intervaloN);
                    }
                    i++;
                }, 100);
            }
        }, (100 * r) + (100 * v) + (100 * a));

        setTimeout(function () {
            if (m != 0) {
                var i = 1;
                intervaloM = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaMorada.png";
                    var id = "moradas" + fichas.moradas;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.moradas--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("moradas" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.moradas);
                    document.getElementById(id).className = "";

                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 1) + ")";
                        document.getElementById(id).style.left = "650px";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 15 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + var(--anchuraChip))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet2.fichas - 30 - 1) + ")";
                        document.getElementById(id).style.left = "calc(650px + (var(--anchuraChip) * 2))";
                    }
                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == m) {
                        clearInterval(intervaloM);
                    }
                    i++;
                }, 100);
            }
        }, (100 * r) + (100 * v) + (100 * a) + (100 * n));

        setTimeout(() => {
            url = 'imagenes/cards/' + carta2Palo + '.png';
            carta21.style.backgroundImage = "url(" + "'" + url + "'" + ")";
            carta21.style.backgroundSize = dimensiones;
            carta21.classList.add('moverCarta');
            carta21.style.visibility = "visible";
            Mano1.nuevaSuma(carta1Palo);
            Mano2.nuevaSuma(carta2Palo);
            carta12.style.visibility = "hidden";
            btnSplit.style.visibility = "hidden";
            setTimeout(function () {
                sacarCarta(Mano1);
            }, milisegundos * 2);
            focus = "mano1";
            Mano1.split = true;
        }, ((100 * r) + (100 * v) + (100 * a) + (100 * n) + 200));
    }

    Mano1.cartas--;
    Mano2.cartas++;
    setTimeout(function () {
        if (bet.cantidad <= fichas.cantidad) {
            btnSplit.style.visibility = "hidden";
            bet2.cantidad = bet.cantidad;

            apuestaTotal += bet2.cantidad;
            document.getElementById("apuestaTabla").innerHTML = apuestaTotal + "€";
            m = parseInt(bet2.cantidad / 500);
            bet2.cantidad = bet2.cantidad - (m * 500);
            n = parseInt(bet2.cantidad / 100);
            bet2.cantidad = bet2.cantidad - (n * 100);
            a = parseInt(bet2.cantidad / 50);
            bet2.cantidad = bet2.cantidad - (a * 50);
            v = parseInt(bet2.cantidad / 10);
            bet2.cantidad = bet2.cantidad - (v * 10);
            r = bet2.cantidad;

            bet2.cantidad = ((m * 500) + (n * 100) + (a * 50) + (v * 10) + (r * 1));

            if (m <= fichas.moradas && n <= fichas.negras && a <= fichas.azules && v <= fichas.verdes && r <= fichas.rojas) {
                pasarFichas(m, n, a, v, r);
            } else {

                function intercambiar() {
                    var ms = 0;

                    if (r < fichas.rojas && (v > fichas.verdes || ((fichas.verdes < 5 && a > fichas.azules) || ((m > fichas.moradas && fichas.negras < 5) || (n > fichas.negras && fichas.azules < 2) || (a > fichas.azules && fichas.verdes < 5))))) {
                        ms = 2200;
                        RojaAVerde(); //2200ms
                    }

                    setTimeout(() => {
                        ms = 0;
                        if (v < fichas.verdes && (a > fichas.azules || ((fichas.azules < 2 && n > fichas.negras)) || ((m > fichas.moradas && fichas.negras < 5) || (n > fichas.negras && fichas.azules < 2)))) {
                            ms = 1220;
                            VerdeAAzul(); //1200ms
                        }

                        setTimeout(() => {
                            ms = 0;
                            if (a < fichas.azules && (n > fichas.negras || ((fichas.negras < 5 && m > fichas.moradas)) || ((m > fichas.moradas && fichas.negras < 5)))) {
                                ms = 620;
                                AzulANegra(); //600ms
                            }

                            setTimeout(() => {
                                ms = 0;
                                if (n < fichas.negras && m > fichas.moradas /*&& (fichas.negras-5>=n)*/) {
                                    ms = 1220;
                                    NegraAMorada(); //1200ms
                                }

                                setTimeout(() => {
                                    ms = 0;
                                    if (m < fichas.moradas && (n > fichas.negras || a > fichas.azules) || ((r > fichas.rojas && fichas.verdes < 1) || (v > fichas.verdes && fichas.azules < 1) || (a > fichas.azules && fichas.negras < 1))) {
                                        ms = 1220;
                                        MoradaANegra(); //1200ms
                                    }

                                    setTimeout(() => {
                                        ms = 0;
                                        if (n < fichas.negras && (a > fichas.azules || v > fichas.verdes) || ((r > fichas.rojas && fichas.verdes < 1) || (v > fichas.verdes && fichas.azules < 1))) {
                                            ms = 620;
                                            NegraAAzul(); //600ms
                                        }

                                        setTimeout(() => {
                                            ms = 0;
                                            if (a < fichas.azules && (v > fichas.verdes || r > fichas.rojas) || ((r > fichas.rojas && fichas.verdes < 1))) {
                                                ms = 1220;
                                                AzulAVerde(); //1200ms
                                            }

                                            setTimeout(() => {
                                                ms = 0;
                                                if (v < fichas.verdes && (r > fichas.rojas || r > fichas.rojas)) {
                                                    ms = 2220;
                                                    VerdeARoja(); //2200ms
                                                }

                                                setTimeout(() => {
                                                    if (m <= fichas.moradas && n <= fichas.negras && a <= fichas.azules && v <= fichas.verdes && r <= fichas.rojas) {
                                                        pasarFichas(m, n, a, v, r);
                                                    } else {
                                                        intercambiar();
                                                    }
                                                }, ms);
                                            }, ms);
                                        }, ms);
                                    }, ms);
                                }, ms);
                            }, ms);
                        }, ms);
                    }, ms);

                }
                intercambiar();
            }
        } else {
            btnSplit.disabled = true;
            btnSplit.innerHTML = "No tienes suficientes fichas";
            btnSplit.style.fontSize = "1em";
			setTimeout(()=>{
				activarTodo();
			},1000);
        }
    }, milisegundos);
}

function doubleDown() {
    desactivarTodo();
    Mano1.doubleDown = true;
    function VerdeARoja() {
        id = "verdes" + fichas.verdes;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function AzulAVerde() {
        id = "azules" + fichas.azules;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function NegraAAzul() {
        id = "negras" + fichas.negras;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function MoradaANegra() {
        id = "moradas" + fichas.moradas;
        if (document.getElementById(id) != null) {
            cambiarMenorApuesta(id);
        }
    }

    function RojaAVerde() {
        id = "rojas" + fichas.rojas;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function VerdeAAzul() {
        id = "verdes" + fichas.verdes;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function AzulANegra() {
        id = "azules" + fichas.azules;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function NegraAMorada() {
        id = "negras" + fichas.negras;
        if (document.getElementById(id) != null) {
            cambiarMayorApuesta(id);
        }
    }

    function pasarFichas(m, n, a, v, r) {
        bet2.rojas = r;
        bet2.verdes = v;
        bet2.azules = a;
        bet2.negras = n;
        bet2.moradas = m;

        fichas.cantidad -= ((r) + (v * 10) + (a * 50) + (n * 100) + (m * 500));
        document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
        if (r != 0) {
            var i = 1;
            intervaloR = setInterval(function () {
                bet2.fichas++;
                var imagen = "fichaRoja.png";
                var id = "rojas" + fichas.rojas;
                let nuevoDiv = document.createElement("div");
                var idElement = ("#" + id).toString();
                fichas.rojas--;
                sacarPosicionXFichaInicial(idElement);
                sacarPosicionYFichaInicial(idElement);
                document.getElementById(id).remove();
                id = ("rojas" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                idElement = ("#" + id).toString();
                nuevoDiv.setAttribute("id", id);
                document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                document.getElementById(id).style.height = "var(--alturaChip)";
                document.getElementById(id).style.width = "var(--anchuraChip)";
                document.getElementById(id).style.position = "absolute";
                document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
				correctZIndex(id,fichas.rojas);

                var k = (bet.fichas <= 30) ? ((bet.fichas <= 15) ? 1 : 2) : 3;
                if (bet2.fichas <= 15) {
                    document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                    document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + k + "))";
                } else if (bet.fichas <= 30) {
                    document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                    document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 1) + "))";
                } else {
                    document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                    document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 2) + ")))";
                }

                sacarPosicionXFicha(idElement);
                sacarPosicionYFicha(idElement);
                document.getElementById(id).className = "";
                document.getElementById(id).classList.add("pasarFicha");

                if (i == r) {
                    clearInterval(intervaloR);
                } else {
                    i++;
                }
            }, 100);
        }

        setTimeout(function () {
            if (v != 0) {
                var i = 1;
                intervaloV = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaVerde.png";
                    var id = "verdes" + fichas.verdes;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.verdes--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("verdes" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.verdes);
                    document.getElementById(id).className = "";

                    var k = (bet.fichas <= 30) ? ((bet.fichas <= 15) ? 1 : 2) : 3;
                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + k + "))";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 1) + "))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 2) + ")))";
                    }

                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == v) {
                        clearInterval(intervaloV);
                    }
                    i++;
                }, 100);
            }
        }, 100 * r);

        setTimeout(function () {
            if (a != 0) {
                var i = 1;
                intervaloA = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaAzul.png";
                    var id = "azules" + fichas.azules;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.azules--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("azules" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.azules);
                    document.getElementById(id).className = "";

                    var k = (bet.fichas <= 30) ? ((bet.fichas <= 15) ? 1 : 2) : 3;
                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + k + "))";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 1) + "))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 2) + ")))";
                    }

                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == a) {
                        clearInterval(intervaloA);
                    }
                    i++;
                }, 100);
            }
        }, (100 * r) + (100 * v));

        setTimeout(function () {
            if (n != 0) {
                var i = 1;
                intervaloN = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaNegra.png";
                    var id = "negras" + fichas.negras;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.negras--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("negras" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.negras);
                    document.getElementById(id).className = "";

                    var k = (bet.fichas <= 30) ? ((bet.fichas <= 15) ? 1 : 2) : 3;
                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + k + "))";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 1) + "))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 2) + ")))";
                    }

                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == n) {
                        clearInterval(intervaloN);
                    }
                    i++;
                }, 100);
            }
        }, (100 * r) + (100 * v) + (100 * a));

        setTimeout(function () {
            if (m != 0) {
                var i = 1;
                intervaloM = setInterval(function () {
                    bet2.fichas++;
                    var imagen = "fichaMorada.png";
                    var id = "moradas" + fichas.moradas;
                    let nuevoDiv = document.createElement("div");
                    var idElement = ("#" + id).toString();
                    fichas.moradas--;
                    sacarPosicionXFichaInicial(idElement);
                    sacarPosicionYFichaInicial(idElement);
                    document.getElementById(id).remove();
                    id = ("moradas" + "NuevaD2" + (bet2.fichas)).toString(); //cambiar nuevo id para despues conocer el numero de ficha y color
                    idElement = ("#" + id).toString();
                    nuevoDiv.setAttribute("id", id);
                    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                    document.getElementById(id).style.height = "var(--alturaChip)";
                    document.getElementById(id).style.width = "var(--anchuraChip)";
                    document.getElementById(id).style.position = "absolute";
                    document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
					correctZIndex(id,fichas.moradas);
                    document.getElementById(id).className = "";

                    var k = (bet.fichas <= 30) ? ((bet.fichas <= 15) ? 1 : 2) : 3;
                    if (bet2.fichas <= 15) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + k + "))";
                    } else if (bet.fichas <= 30) {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 1) + "))";
                    } else {
                        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet2.fichas + ")";
                        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * " + (k + 2) + ")))";
                    }

                    sacarPosicionXFicha(idElement);
                    sacarPosicionYFicha(idElement);
                    document.getElementById(id).className = "";
                    document.getElementById(id).classList.add("pasarFicha");

                    if (i == m) {
                        clearInterval(intervaloM);
                    }
                    i++;
                }, 100);
            }
        }, (100 * r) + (100 * v) + (100 * a) + (100 * n));

        setTimeout(() => {
            Mano1.fin = true;
            sacarCarta(Mano1);
            setTimeout(() => {
                turnoDealer()
            }, 3000);
        }, ((100 * r) + (100 * v) + (100 * a) + (100 * n) + 200));
    }

    setTimeout(function () {
        if (bet.cantidad <= fichas.cantidad) {
            btnDoubleDown.style.visibility = "hidden";
            bet2.cantidad = bet.cantidad;

            apuestaTotal += bet2.cantidad;
            document.getElementById("apuestaTabla").innerHTML = apuestaTotal + "€";
            m = parseInt(bet2.cantidad / 500);
            bet2.cantidad = bet2.cantidad - (m * 500);
            n = parseInt(bet2.cantidad / 100);
            bet2.cantidad = bet2.cantidad - (n * 100);
            a = parseInt(bet2.cantidad / 50);
            bet2.cantidad = bet2.cantidad - (a * 50);
            v = parseInt(bet2.cantidad / 10);
            bet2.cantidad = bet2.cantidad - (v * 10);
            r = bet2.cantidad;

            bet2.cantidad = ((m * 500) + (n * 100) + (a * 50) + (v * 10) + (r * 1));

            if (m <= fichas.moradas && n <= fichas.negras && a <= fichas.azules && v <= fichas.verdes && r <= fichas.rojas) {
                pasarFichas(m, n, a, v, r);
            } else {

                function intercambiar() {
                    var ms = 0;

                    if (r < fichas.rojas && (v > fichas.verdes || ((fichas.verdes < 5 && a > fichas.azules) || ((m > fichas.moradas && fichas.negras < 5) || (n > fichas.negras && fichas.azules < 2) || (a > fichas.azules && fichas.verdes < 5))))) {
                        ms = 2200;
                        RojaAVerde(); //2200ms
                    }

                    setTimeout(() => {
                        ms = 0;
                        if (v < fichas.verdes && (a > fichas.azules || ((fichas.azules < 2 && n > fichas.negras)) || ((m > fichas.moradas && fichas.negras < 5) || (n > fichas.negras && fichas.azules < 2)))) {
                            ms = 1220;
                            VerdeAAzul(); //1200ms
                        }

                        setTimeout(() => {
                            ms = 0;
                            if (a < fichas.azules && (n > fichas.negras || ((fichas.negras < 5 && m > fichas.moradas)) || ((m > fichas.moradas && fichas.negras < 5)))) {
                                ms = 620;
                                AzulANegra(); //600ms
                            }

                            setTimeout(() => {
                                ms = 0;
                                if (n < fichas.negras && m > fichas.moradas /*&& (fichas.negras-5>=n)*/) {
                                    ms = 1220;
                                    NegraAMorada(); //1200ms
                                }

                                setTimeout(() => {
                                    ms = 0;
                                    if (m < fichas.moradas && (n > fichas.negras || a > fichas.azules) || ((r > fichas.rojas && fichas.verdes < 1) || (v > fichas.verdes && fichas.azules < 1) || (a > fichas.azules && fichas.negras < 1))) {
                                        ms = 1220;
                                        MoradaANegra(); //1200ms
                                    }

                                    setTimeout(() => {
                                        ms = 0;
                                        if (n < fichas.negras && (a > fichas.azules || v > fichas.verdes) || ((r > fichas.rojas && fichas.verdes < 1) || (v > fichas.verdes && fichas.azules < 1))) {
                                            ms = 620;
                                            NegraAAzul(); //600ms
                                        }

                                        setTimeout(() => {
                                            ms = 0;
                                            if (a < fichas.azules && (v > fichas.verdes || r > fichas.rojas) || ((r > fichas.rojas && fichas.verdes < 1))) {
                                                ms = 1220;
                                                AzulAVerde(); //1200ms
                                            }

                                            setTimeout(() => {
                                                ms = 0;
                                                if (v < fichas.verdes && (r > fichas.rojas || r > fichas.rojas)) {
                                                    ms = 2220;
                                                    VerdeARoja(); //2200ms
                                                }

                                                setTimeout(() => {
                                                    if (m <= fichas.moradas && n <= fichas.negras && a <= fichas.azules && v <= fichas.verdes && r <= fichas.rojas) {
                                                        pasarFichas(m, n, a, v, r);
                                                    } else {
                                                        intercambiar();
                                                    }
                                                }, ms);
                                            }, ms);
                                        }, ms);
                                    }, ms);
                                }, ms);
                            }, ms);
                        }, ms);
                    }, ms);
                }
                intercambiar();
            }
        } else {
            btnDoubleDown.disabled = true;
            btnDoubleDown.innerHTML = "No tienes suficientes fichas";
            btnDoubleDown.style.fontSize = "1em";
        }
    }, milisegundos);
}

const apostar = function () {
	if(consoleFunctions){
	console.log("apostar");
	}
    desactivarTodo();
    id = this.id.toString();
	
let numeroFichaPrevia=bet.fichas;

	for (let cId = 0; cId <= 4; cId++) {
        switch (cId) {
        case 0:
            color = "rojas";
            break;
        case 1:
            color = "verdes";
            break;
        case 2:
            color = "azules";
            break;
        case 3:
            color = "negras";
            break;
        case 4:
            color = "moradas";
            break;
        }
		
		if (document.getElementById(color+"Nueva"+numeroFichaPrevia) != null) {
			document.getElementById(color+"Nueva"+numeroFichaPrevia).onclick=null;
			document.getElementById(color+"Nueva"+numeroFichaPrevia).style.cursor="not-allowed";
			}
    }

    let colorId = id.substring(0, 3);
    switch (colorId) {
    case "roj":
        colorId = "rojas";
        var imagen = "fichaRoja.png";
        fichas.cantidad = fichas.cantidad - 1;
        bet.cantidad = bet.cantidad + 1;
        break;
    case "ver":
        colorId = "verdes";
        var imagen = "fichaVerde.png";
        fichas.cantidad = fichas.cantidad - 10;
        bet.cantidad = bet.cantidad + 10;
        break;
    case "azu":
        colorId = "azules";
        var imagen = "fichaAzul.png";
        fichas.cantidad = fichas.cantidad - 50;
        bet.cantidad = bet.cantidad + 50;
        break;
    case "neg":
        colorId = "negras";
        var imagen = "fichaNegra.png";
        fichas.cantidad = fichas.cantidad - 100;
        bet.cantidad = bet.cantidad + 100;
        break;
    case "mor":
        colorId = "moradas";
        var imagen = "fichaMorada.png";
        fichas.cantidad = fichas.cantidad - 500;
        bet.cantidad = bet.cantidad + 500;
        break;
    }
    bet.fichas++;
    bet[colorId]++;
    fichas[colorId]--;
    var numId = parseInt(id.substring(colorId.length));
    let nuevoDiv = document.createElement("div");
    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
    var idElement = ("#" + id).toString();
    sacarPosicionXFichaInicial(idElement);
    sacarPosicionYFichaInicial(idElement);
    document.getElementById(id).remove();
    id = ((colorId + "Nueva" + bet.fichas).toString()); //cambiar nuevo id para despues conocer el numero de ficha y color
    idElement = ("#" + id).toString();
    nuevoDiv.setAttribute("id", id);

    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
    document.getElementById(id).style.height = "var(--alturaChip)";
    document.getElementById(id).style.width = "var(--anchuraChip)";
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.zIndex = (bet.fichas+fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
    document.getElementById(id).className = "";

    if (bet.fichas <= 15) {
        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + bet.fichas + ")";
        document.getElementById(id).style.left = "100px";
    } else if (bet.fichas <= 30) {
        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet.fichas - 15) + ")";
        document.getElementById(id).style.left = "calc(100px + var(--anchuraChip))";
    } else {
        document.getElementById(id).style.top = "calc(650px - var(--alturaChip) - 10px * " + (bet.fichas - 30) + ")";
        document.getElementById(id).style.left = "calc(100px + (var(--anchuraChip) * 2))";
    }
    sacarPosicionXFicha(idElement);
    sacarPosicionYFicha(idElement);
    document.getElementById(id).classList.add('moverFicha');

    nuevoColorId = colorId;
    setTimeout(function () {
        activarTodo();
        btnPlantarse.disabled = true;
        btnPedir.disabled = true;
        apuestaTotal = bet.cantidad;
        document.getElementById("apuestaTabla").innerHTML = apuestaTotal + "€";
        document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
    }, 200);

}

const retirar = function () {
	if(consoleFunctions){
	console.log("retirar");
	}
    desactivarTodo();
    id = this.id.toString();
	
	
    bet.fichas--;
    let colorId = id.substring(0, 3);
    switch (colorId) {
    case "roj":
        colorId = "rojas";
        var imagen = "fichaRoja.png";
        fichas.cantidad = fichas.cantidad + 1;
        bet.cantidad = bet.cantidad - 1;
        var col = 0;
        break;
    case "ver":
        colorId = "verdes";
        var imagen = "fichaVerde.png";
        fichas.cantidad = fichas.cantidad + 10;
        bet.cantidad = bet.cantidad - 10;
        var col = 1;
        break;
    case "azu":
        colorId = "azules";
        var imagen = "fichaAzul.png";
        fichas.cantidad = fichas.cantidad + 50;
        bet.cantidad = bet.cantidad - 50;
        var col = 2;
        break;
    case "neg":
        colorId = "negras";
        var imagen = "fichaNegra.png";
        fichas.cantidad = fichas.cantidad + 100;
        bet.cantidad = bet.cantidad - 100;
        var col = 3;
        break;
    case "mor":
        colorId = "moradas";
        var imagen = "fichaMorada.png";
        fichas.cantidad = fichas.cantidad + 500;
        bet.cantidad = bet.cantidad - 500;
        var col = 4;
        break;
    }

    fichas[colorId]++;
    bet[colorId]--;
    idElement = ("#" + id).toString();
    sacarPosicionXFichaInicial(idElement);
    sacarPosicionYFichaInicial(idElement);

    document.getElementById(id).remove();
    id = ((colorId + fichas[colorId]).toString()); //cambiar nuevo id para despues conocer el numero de ficha y color
    idElement = ("#" + id).toString();
    let nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("id", id);
    document.body.appendChild(nuevoDiv); //Insertarlo en el documento

    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
    document.getElementById(id).style.height = "var(--alturaChip)";
    document.getElementById(id).style.width = "var(--anchuraChip)";
    document.getElementById(id).style.position = "absolute";
	document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
	correctZIndex(id,fichas[colorId]);
    document.getElementById(id).className = "";
    document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + fichas[colorId] + ")";
    document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + col + "))";
    sacarPosicionXFicha(idElement);
    sacarPosicionYFicha(idElement);
    document.getElementById(id).classList.add('moverFicha');
    document.getElementById(id).onclick = apostar;
	betOnStackClick(id);

    setTimeout(function () {
        for (var i = 0; i <= 4; i++) {
            switch (i) {
            case 0:
                colorId = "rojas";
                break;
            case 1:
                colorId = "verdes";
                break;
            case 2:
                colorId = "azules";
                break;
            case 3:
                colorId = "negras";
                break;
            case 4:
                colorId = "moradas";
                break;
            }
		var anadirEvento = colorId + "Nueva" + bet.fichas;
            if (document.getElementById(anadirEvento) != null) {
                document.getElementById(anadirEvento).onclick = retirar;
				document.getElementById(anadirEvento).style.cursor = "pointer";
                document.getElementById(anadirEvento).className = "";
            }
        }
        activarTodo();
        btnPlantarse.disabled = true;
        btnPedir.disabled = true;
        apuestaTotal = bet.cantidad;
        document.getElementById("apuestaTabla").innerHTML = apuestaTotal + "€";

        document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
    }, 200);

}

function perderFichas(apuesta) {
	if(consoleFunctions){
	console.log("perderFichas");
	}
    totalGanancias -= apuesta.cantidad;
    totalGananciasRonda -= apuesta.cantidad;
    apuestaTotal -= apuesta.cantidad;
    document.getElementById("apuestaTabla").innerHTML = apuestaTotal + "€";
    if (apuesta.nombre == "bet") {
        var n = "";
    } else if (apuesta.nombre == "bet2") {
        var n = "D2";
    }
    var k = apuesta.fichas;
    intervalo = setInterval(function () {

        for (var i = 0; i <= 4; i++) {
            switch (i) {
            case 0:
                var colorId = "rojas";
                var imagen = "fichaRoja.png";
                break;
            case 1:
                var colorId = "verdes";
                var imagen = "fichaVerde.png";
                break;
            case 2:
                var colorId = "azules";
                var imagen = "fichaAzul.png";
                break;
            case 3:
                var colorId = "negras";
                var imagen = "fichaNegra.png";
                break;
            case 4:
                var colorId = "moradas";
                var imagen = "fichaMorada.png";
                break;
            }

            var id = colorId + "Nueva" + n + (k).toString();
            if (document.getElementById(id) != null) {
                var elementId = "#" + id;
                sacarPosicionXFichaInicial(elementId);
                sacarPosicionYFichaInicial(elementId);
                document.getElementById(id).remove();
                let nuevoDiv = document.createElement("div");
                id = colorId + "Final" + n + (k).toString();
                elementId = "#" + id;
                nuevoDiv.setAttribute("id", id);
                document.body.appendChild(nuevoDiv);
                document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                document.getElementById(id).style.height = "var(--alturaChip)";
                document.getElementById(id).style.width = "var(--anchuraChip)";
                document.getElementById(id).style.position = "absolute";
                document.getElementById(id).className = "";
                document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
				correctZIndex(id,n);
                var leftPantalla = screen.width + "px";
                document.getElementById(id).style.top = "calc(-1 * " + "var(--alturaChip))";
                document.getElementById(id).style.left = "calc(" + leftPantalla + " + " + "var(--anchuraChip))";
                sacarPosicionXFicha(elementId);
                sacarPosicionYFicha(elementId);
                document.getElementById(id).classList.add('moverFicha');
            }

        }
        k--;
        if (k == 0) {
            clearInterval(intervalo);
        }
    }, 100);

    setTimeout(function () {
        for (k = apuesta.fichas; k > 0; k--) {
            for (var i = 0; i <= 4; i++) {
                switch (i) {
                case 0:
                    var colorId = "rojas";
                    var imagen = "fichaRoja.png";
                    break;
                case 1:
                    var colorId = "verdes";
                    var imagen = "fichaVerde.png";
                    break;
                case 2:
                    var colorId = "azules";
                    var imagen = "fichaAzul.png";
                    break;
                case 3:
                    var colorId = "negras";
                    var imagen = "fichaNegra.png";
                    break;
                case 4:
                    var colorId = "moradas";
                    var imagen = "fichaMorada.png";
                    break;
                }
                id = (colorId + "Nueva" + n + k).toString();
                if (document.getElementById(id) != null) {
                    document.getElementById(id).remove();
                }
            }
        }
        apuesta.cantidad = 0;
        apuesta.rojas = 0;
        apuesta.verdes = 0;
        apuesta.azules = 0;
        apuesta.negras = 0;
        apuesta.moradas = 0;
        apuesta.fichas = 0;
    }, (110 * apuesta.fichas));
}

function ganarFichas(apuesta) {
	if(consoleFunctions){
	console.log("ganarFichas");
	}
    totalGanancias += apuesta.cantidad;
    totalGananciasRonda += apuesta.cantidad
    m = parseInt(apuesta.cantidad / 500);

    if (m >= 1 && (apuesta.cantidad - (m * 500) == 0 || apuesta.cantidad <= 710)) {
        m--;
    }

    apuesta.cantidad = apuesta.cantidad - (m * 500);

    n = parseInt(apuesta.cantidad / 100);
    if (n > 1) {
        n--;
        if (apuesta.cantidad - (n * 100) == 0 || apuesta.cantidad <= 210) {
            n--;
        }
    }
    apuesta.cantidad = apuesta.cantidad - (n * 100);

    a = parseInt(apuesta.cantidad / 50);
    if (a > 1) {
        a--;
        if (apuesta.cantidad - (a * 50) == 0 || apuesta.cantidad <= 60) {
            a--;
        }
    }
    apuesta.cantidad = apuesta.cantidad - (a * 50);

    v = parseInt(apuesta.cantidad / 10);
    if (v > 1 && apuesta.cantidad - (v * 10) == 0) {
        v--;
    }

    apuesta.cantidad = apuesta.cantidad - (v * 10);

    r = apuesta.cantidad;

    apuesta.cantidad = r + (v * 10) + (a * 50) + (n * 100) + (m * 500);
    if (apuesta.nombre == "blackjack") {
        BJ.rojas = r;
        BJ.verdes = v;
        BJ.azules = a;
        BJ.negras = n;
        BJ.moradas = m;
    }

    var rT = r + fichas.rojas;
    var vT = v + fichas.verdes;
    var aT = a + fichas.azules;
    var nT = n + fichas.negras;
    var mT = m + fichas.moradas;

    fichas.cantidad += apuesta.cantidad;
    var i = 0;
    var total;
    var totalT;
    var intervalo = setInterval(function () {
        switch (i) {
        case 0:
            var color = "rojas";
            var imagen = "fichaRoja.png";
            totalT = rT;
            total = r;
            break;
        case 1:
            var color = "verdes";
            var imagen = "fichaVerde.png";
            totalT = vT;
            total = v;
            break;
        case 2:
            var color = "azules";
            var imagen = "fichaAzul.png";
            totalT = aT;
            total = a;
            break;
        case 3:
            var color = "negras";
            var imagen = "fichaNegra.png";
            totalT = nT;
            total = n;
            break;
        case 4:
            var color = "moradas";
            var imagen = "fichaMorada.png";
            totalT = mT;
            total = m;
            break;
        }

        if (total != 0) {
            fichas[color]++;
            let nuevoDiv = document.createElement("div"); //Crear el elemento div
            var id = (color + fichas[color]).toString();
            var idElement = "#" + id;
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv); //Insertarlo en el documento
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
            document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
			correctZIndex(id,fichas[color]);
            document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + (fichas[color]) + ")";
            document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + i + "))";
            sacarPosicionXFicha(idElement);
            sacarPosicionYFicha(idElement);
            document.getElementById(id).className = "";
            document.getElementById(id).classList.add('sacarFicha');
        }
        if (fichas[color] >= totalT) {
            i++;
        }
        if (i > 4) {
            clearInterval(intervalo);
            document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
			autoCambiarFichas();
        }
    }, 220);
}


function devolverFichas(apuesta) {
	if(consoleFunctions){
	console.log("devolverFichas");
	}
	
	console.log("devolverFichas        "+apuesta.nombre);
    apuestaTotal -= apuesta.cantidad;
    document.getElementById("apuestaTabla").innerHTML = apuestaTotal + "€";
    fichas.cantidad += apuesta.cantidad;
    document.getElementById("totalDinero").innerHTML = fichas.cantidad + "€";
    if (apuesta.nombre == "bet") {
        numBet = "";
    } else if (apuesta.nombre == "bet2") {
        numBet = "D2";
    }
    var i = apuesta.fichas;
    var intervalo1 = setInterval(() => {
        for (var k = 0; k <= 4; k++) {
            switch (k) {
            case 0:
                var color = "rojas";
                var imagen = "fichaRoja.png";
                break;
            case 1:
                var color = "verdes";
                var imagen = "fichaVerde.png";
                break;
            case 2:
                var color = "azules";
                var imagen = "fichaAzul.png";
                break;
            case 3:
                var color = "negras";
                var imagen = "fichaNegra.png";
                break;
            case 4:
                var color = "moradas";
                var imagen = "fichaMorada.png";
                break;
            }
            if (document.getElementById((color + "Nueva" + numBet + i).toString()) != null) {
                fichas[color]++;
                apuesta.fichas--;
                var id = (color + "Nueva" + numBet + i).toString();
                idElement = "#" + id;
                sacarPosicionXFichaInicial(idElement);
                sacarPosicionYFichaInicial(idElement);
                document.getElementById(id).remove();
                idElement = "#" + id;

                let nuevoDiv = document.createElement("div"); //Crear el elemento div
                var id = (color + fichas[color]).toString();
                var idElement = "#" + id;
				nuevoDiv.setAttribute("id", id);
                document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                document.getElementById(id).style.height = "var(--alturaChip)";
                document.getElementById(id).style.width = "var(--anchuraChip)";
                document.getElementById(id).style.position = "absolute";
                document.getElementById(id).style.zIndex = fichas[color];
				
                document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + fichas[color] + ")";
                document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + k + "))";
                sacarPosicionXFicha(idElement);
                sacarPosicionYFicha(idElement);
                document.getElementById(id).className = "";
                document.getElementById(id).classList.add('moverFicha');

                i--;
                if (i == 0) {
                    clearInterval(intervalo1);
                }
            }
        }
    }, 120);
}

function cambiarFichasPlus() {
	if(consoleFunctions){
	console.log("cambiarFichasPlus");
	}
	document.getElementById("refresh").disabled=true;
	document.getElementById("comprarFichas").disabled=true;
	document.getElementById("jugar").disabled=true;
	document.getElementById("pedir").disabled=true;
	document.getElementById("plantarse").disabled=true;


if (document.getElementById(("moradas" + fichas[color]).toString()) != null) {
        document.getElementById(("moradas" + fichas[color]).toString()).onclick = null;
    }
    for (i = 0; i <= 3; i++) {
        switch (i) {
        case 0:
            var color = "rojas";
            break;
        case 1:
            var color = "verdes";
            break;
        case 2:
            var color = "azules";
            break;
        case 3:
            var color = "negras";
            break;
		case 4:
            var color = "moradas";
            break;
        }

        if (document.getElementById(color + "Nueva" + bet.fichas) != null){
            document.getElementById(color + "Nueva" + bet.fichas).onclick = null;
            document.getElementById(color + "Nueva" + bet.fichas).style.cursor="not-allowed";
		}

        if (document.getElementById(color + fichas[color]) != null) {
            document.getElementById(color + fichas[color]).onclick = null;
            document.getElementById(color + fichas[color]).style.cursor = "pointer";
            document.getElementById(color + fichas[color]).onclick = cambiarMayor;
        }
    }
}

const cambiarMayor = function () {
	if(consoleFunctions){
	console.log("cambiarMayor");
	}
    desactivarTodo();
    id = this.id.toString();
    let color = id.substring(0, 1);
    switch (color) {
    case "r":
        color = "rojas";
        var color2 = "verdes";
        var imagen = "fichaRoja.png";
        var imagen2 = "fichaVerde.png";
        var cantidad = 10;
        var col = 1;
        break;
    case "v":
        color = "verdes";
        var color2 = "azules";
        var imagen = "fichaVerde.png";
        var imagen2 = "fichaAzul.png";
        var cantidad = 5;
        var col = 2;
        break;
    case "a":
        color = "azules";
        var color2 = "negras";
        var imagen = "fichaAzul.png";
        var imagen2 = "fichaNegra.png";
        var cantidad = 2;
        var col = 3;
        break;
    case "n":
        color = "negras";
        var color2 = "moradas";
        var imagen = "fichaNegra.png";
        var imagen2 = "fichaMorada.png";
        var cantidad = 5;
        var col = 4;
        break;

    }
    if (fichas[color] >= cantidad) {
        i = 0;
        intervalo = setInterval(function () {
            id = (color + fichas[color]).toString();
            fichas[color]--;
            var idElement = "#" + id;
            sacarPosicionXFichaInicial(idElement);
            sacarPosicionYFichaInicial(idElement);
            document.getElementById(id).remove();
            id = (color + "Final" + (i + 1)).toString();
            let nuevoDiv = document.createElement("div");
            idElement = "#" + id;
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv);
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
			document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
			correctZIndex(id,fichas[color]);
            document.getElementById(id).style.top = "calc( -1 * var(--alturaChip))";
            document.getElementById(id).style.left = "calc( -1 * var(--anchuraChip))"
                document.getElementById(id).className = "";
            document.getElementById(id).classList.add('cambioFichaSacar');
            i++;
            if (i == cantidad) {
                clearInterval(intervalo);
            }
        }, 200);

        setTimeout(function () {
            for (var i = 1; i <= cantidad; i++) {
                id = (color + "Final" + i).toString();
                document.getElementById(id).remove();
            }

            i = (fichas[color2] + 1).toString();
            id = color2 + i;
            idElement = "#" + id;
            let nuevoDiv = document.createElement("div");
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv); //Insertarlo en el documento
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen2 + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
            document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + i + ")";
            document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + col + "))";
			document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
			correctZIndex(id,i);
            document.getElementById(id).className = "";
            sacarPosicionXFicha(idElement);
            sacarPosicionYFicha(idElement);
            document.getElementById(id).classList.add('cambioFichaMeter');

            fichas[color2]++;
            for (var k = 0; k <= 4; k++) {
                switch (k) {
                case 0:
                    id = "rojas" + fichas.rojas;
                    break;
                case 1:
                    id = "verdes" + fichas.verdes;
                    break;
                case 2:
                    id = "azules" + fichas.azules;
                    break;
                case 3:
                    id = "negras" + fichas.negras;
                    break;
                case 4:
                    id = "moradas" + fichas.moradas;
                    break;
                }
                if (document.getElementById(id) != null) {
                    document.getElementById(id).onclick = cambiarMayor;
                }
            }
            cambiarFichasPlus();
        }, 200 * cantidad);
    }
	else{
		document.getElementById("cambiarFichas").disabled=false;
	}
    document.getElementById("cambiarFichas").onclick = null;
    document.getElementById("cambiarFichas").onclick = cambiarFichasCerrar;
}

function cambiarFichasMinus() {
	if(consoleFunctions){
	console.log("cambiarFichasMinus");
	}
	document.getElementById("refresh").disabled=true;
	document.getElementById("comprarFichas").disabled=true;
	document.getElementById("jugar").disabled=true;
	document.getElementById("pedir").disabled=true;
	document.getElementById("plantarse").disabled=true;
	
    for (i = 0; i <= 4; i++) {
        switch (i) {
        case 0:
            var color = "rojas";
            break;
        case 1:
            var color = "verdes";
            break;
        case 2:
            var color = "azules";
            break;
        case 3:
            var color = "negras";
            break;
        case 4:
            var color = "moradas";
            break;
        }

        if (document.getElementById(color + "Nueva" + bet.fichas) != null){
            document.getElementById(color + "Nueva" + bet.fichas).onclick = null;
            document.getElementById(color + "Nueva" + bet.fichas).style.cursor="not-allowed";
		
		}
        if (document.getElementById(color + fichas[color]) != null) {
            document.getElementById(color + fichas[color]).onclick = null;
            document.getElementById(color + fichas[color]).onclick = cambiarMenor;
            document.getElementById(color + fichas[color]).style.cursor = "pointer";
        }
    }
	
            document.getElementById("rojas" + fichas.rojas).onclick = null;
            document.getElementById("rojas" + fichas.rojas).style.cursor = "not-allowed";
    document.getElementById("cambiarFichas").onclick = null;
    document.getElementById("cambiarFichas").onclick = cambiarFichasCerrar;
}

const cambiarMenor = function () {
	if(consoleFunctions){
	console.log("cambiarMenor");
	}
	desactivarTodo();
    id = this.id.toString();

    let color = id.substring(0, 1);
    switch (color) {
    case "v":
        color = "verdes";
        var color2 = "rojas";
        var imagen = "fichaVerde.png";
        var imagen2 = "fichaRoja.png";
        var cantidad = 10;
        var col = 0;
        break;
    case "a":
        color = "azules";
        var color2 = "verdes";
        var imagen = "fichaAzul.png";
        var imagen2 = "fichaVerde.png";
        var cantidad = 5;
        var col = 1;
        break;
    case "n":
        color = "negras";
        var color2 = "azules";
        var imagen = "fichaNegra.png";
        var imagen2 = "fichaAzul.png";
        var cantidad = 2;
        var col = 2;
        break;
    case "m":
        color = "moradas";
        var color2 = "negras";
        var imagen = "fichaMorada.png";
        var imagen2 = "fichaNegra.png";
        var cantidad = 5;
        var col = 3;
        break;
    }
    fichas[color]--;

    var idElement = "#" + id;
    sacarPosicionXFichaInicial(idElement);
    sacarPosicionYFichaInicial(idElement);
    document.getElementById(id).remove();

    let nuevoDiv = document.createElement("div"); //Crear el elemento div
    idElement = "#" + id;
    nuevoDiv.setAttribute("id", id);
    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
    document.getElementById(id).style.height = "var(--alturaChip)";
    document.getElementById(id).style.width = "var(--anchuraChip)";
    document.getElementById(id).style.position = "absolute";
	document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
    document.getElementById(id).style.top = "calc( -1 * var(--alturaChip))";
    document.getElementById(id).style.left = "calc( -1 * var(--anchuraChip))"
        document.getElementById(id).className = "";

    document.getElementById(id).classList.add('cambioFichaSacar');
    setTimeout(function () {
        document.getElementById(id).remove();
        var total = fichas[color2] + cantidad;

        const intervalo = setInterval(function () {
            var i = fichas[color2] + 1;
            id = color2 + i;
            idElement = "#" + id;
            let nuevoDiv = document.createElement("div");
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv); //Insertarlo en el documento
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen2 + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
            document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + i + ")";
            document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + col + "))";
			document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
			correctZIndex(id,i);
            document.getElementById(id).className = "";
            sacarPosicionXFicha(idElement);
            sacarPosicionYFicha(idElement);
            document.getElementById(id).classList.add('cambioFichaMeter');

            fichas[color2]++;
            if (i == total) {
                clearInterval(intervalo);
                setTimeout(function () {
                    cambiarFichasMinus();
                }, 200);

                for (var k = 0; k <= 4; k++) {
                    switch (k) {
                    case 0:
                        id = "rojas" + fichas.rojas;
                        break;
                    case 1:
                        id = "verdes" + fichas.verdes;
                        break;
                    case 2:
                        id = "azules" + fichas.azules;
                        break;
                    case 3:
                        id = "negras" + fichas.negras;
                        break;
                    case 4:
                        id = "moradas" + fichas.moradas;
                        break;
                    }
                    if (document.getElementById(id) != null) {
                        document.getElementById(id).onclick = cambiarMenor;
                    }
					
					if(k>=4){
				document.getElementById("cambiarFichas").disabled=false;
				}
                }
            }
        }, 200);
    }, 200);
    document.getElementById("cambiarFichas").onclick = null;
    document.getElementById("cambiarFichas").onclick = cambiarFichasCerrar;
}

function cambiarFichas() {
	if(consoleFunctions){
	console.log("cambiarFichas");
	}
		document.getElementById("refresh").disabled=true;
	document.getElementById("comprarFichas").disabled=true;
	document.getElementById("jugar").disabled=true;
	document.getElementById("pedir").disabled=true;
	document.getElementById("plantarse").disabled=true;

	desactivarTodo();
    var CFM = document.getElementById("cambiarFichasMinus");
    var CFP = document.getElementById("cambiarFichasPlus");
    CFM.style.visibility = "visible";
    CFP.style.visibility = "visible";
    CFM.className = "";
    CFP.className = "";
    CFM.classList.add("expandir");
    CFP.classList.add("expandir");
    setTimeout(function () {
		if(CFM.classList.contains("reducir") || CFP.classList.contains("reducir")){
		CFM.classList.remove("reducir");
		CFP.classList.remove("reducir");
		}
		document.getElementById("cambiarFichas").disabled = false;
        document.getElementById("cambiarFichas").onclick = cambiarFichasCerrar;
        
        CFM.disabled = false;
        CFP.disabled = false;
    }, 300);
}

function cambiarFichasCerrar() {
	if(consoleFunctions){
	console.log("cambiarFichasCerrar");
	}
    var CFM = document.getElementById("cambiarFichasMinus");
    var CFP = document.getElementById("cambiarFichasPlus");
    CFM.className = "";
    CFP.className = "";
    CFM.classList.add("reducir");
    CFP.classList.add("reducir");
    setTimeout(function () {
		if(CFM.classList.contains("expandir") || CFP.classList.contains("expandir")){
		CFM.classList.remove("expandir");
		CFP.classList.remove("expandir");
		}
        CFM.disabled = true;
        CFP.disabled = true;
        CFM.style.visibility = "hidden";
        CFP.style.visibility = "hidden";
        activarTodo();
    }, 300);

    document.getElementById("cambiarFichas").onclick = cambiarFichas;
}

function cambiarMenorApuesta(id) {
	if(consoleFunctions){
console.log("cambiarMenorApuesta");
    }
	let color = id.substring(0, 1);
    switch (color) {
    case "v":
        color = "verdes";
        var color2 = "rojas";
        var imagen = "fichaVerde.png";
        var imagen2 = "fichaRoja.png";
        var cantidad = 10;
        var col = 0;
        break;
    case "a":
        color = "azules";
        var color2 = "verdes";
        var imagen = "fichaAzul.png";
        var imagen2 = "fichaVerde.png";
        var cantidad = 5;
        var col = 1;
        break;
    case "n":
        color = "negras";
        var color2 = "azules";
        var imagen = "fichaNegra.png";
        var imagen2 = "fichaAzul.png";
        var cantidad = 2;
        var col = 2;
        break;
    case "m":
        color = "moradas";
        var color2 = "negras";
        var imagen = "fichaMorada.png";
        var imagen2 = "fichaNegra.png";
        var cantidad = 5;
        var col = 3;
        break;
    }
    fichas[color]--;

    var idElement = "#" + id;
    sacarPosicionXFichaInicial(idElement);
    sacarPosicionYFichaInicial(idElement);
    document.getElementById(id).remove();

    let nuevoDiv = document.createElement("div"); //Crear el elemento div
    idElement = "#" + id;
    nuevoDiv.setAttribute("id", id);
    document.body.appendChild(nuevoDiv); //Insertarlo en el documento
    document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
    document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
    document.getElementById(id).style.height = "var(--alturaChip)";
    document.getElementById(id).style.width = "var(--anchuraChip)";
    document.getElementById(id).style.position = "absolute";
    document.getElementById(id).style.top = "calc( -1 * var(--alturaChip))";
    document.getElementById(id).style.left = "calc( -1 * var(--anchuraChip))"
	document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
	correctZIndex(id,id.substring(color.length));
        document.getElementById(id).className = "";

    document.getElementById(id).classList.add('cambioFichaSacar');
    setTimeout(function () {
        document.getElementById(id).remove();
        var total = fichas[color2] + cantidad;

        const intervalo = setInterval(function () {
            var i = fichas[color2] + 1;
            id = color2 + i;
            idElement = "#" + id;
            let nuevoDiv = document.createElement("div");
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv); //Insertarlo en el documento
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen2 + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
            document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + i + ")";
            document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + col + "))";
			document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
			correctZIndex(id,i);
            document.getElementById(id).className = "";
            sacarPosicionXFicha(idElement);
            sacarPosicionYFicha(idElement);
            document.getElementById(id).classList.add('cambioFichaMeter');

            fichas[color2]++;
            if (i == total) {
                clearInterval(intervalo);
                setTimeout(function () {
                    cambiarFichasMinus();
                }, 200);

                for (var k = 0; k <= 4; k++) {
                    switch (k) {
                    case 0:
                        id = "rojas" + fichas.rojas;
                        break;
                    case 1:
                        id = "verdes" + fichas.verdes;
                        break;
                    case 2:
                        id = "azules" + fichas.azules;
                        break;
                    case 3:
                        id = "negras" + fichas.negras;
                        break;
                    case 4:
                        id = "moradas" + fichas.moradas;
                        break;
                    }
                    if (document.getElementById(id) != null) {
                        document.getElementById(id).onclick = apostar;
						betOnStackClick(id);
                    }
                }
            }
        }, 200);
    }, 200);
    document.getElementById("cambiarFichas").onclick = null;
    document.getElementById("cambiarFichas").onclick = cambiarFichasCerrar;
}

function cambiarMayorApuesta(id) {
	if(consoleFunctions){
console.log("cambiarMayorApuesta");
	}
    let color = id.substring(0, 1);
    switch (color) {
    case "r":
        color = "rojas";
        var color2 = "verdes";
        var imagen = "fichaRoja.png";
        var imagen2 = "fichaVerde.png";
        var cantidad = 10;
        var col = 1;
        break;
    case "v":
        color = "verdes";
        var color2 = "azules";
        var imagen = "fichaVerde.png";
        var imagen2 = "fichaAzul.png";
        var cantidad = 5;
        var col = 2;
        break;
    case "a":
        color = "azules";
        var color2 = "negras";
        var imagen = "fichaAzul.png";
        var imagen2 = "fichaNegra.png";
        var cantidad = 2;
        var col = 3;
        break;
    case "n":
        color = "negras";
        var color2 = "moradas";
        var imagen = "fichaNegra.png";
        var imagen2 = "fichaMorada.png";
        var cantidad = 5;
        var col = 4;
        break;
    }
    if (fichas[color] >= cantidad) {
        i = 0;
        intervalo = setInterval(function () {
            id = (color + fichas[color]).toString();
            fichas[color]--;
            var idElement = "#" + id;
            sacarPosicionXFichaInicial(idElement);
            sacarPosicionYFichaInicial(idElement);
            document.getElementById(id).remove();
            id = (color + "Final" + (i + 1)).toString();
            let nuevoDiv = document.createElement("div");
            idElement = "#" + id;
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv);
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
            document.getElementById(id).style.top = "calc( -1 * var(--alturaChip))";
            document.getElementById(id).style.left = "calc( -1 * var(--anchuraChip))"
                document.getElementById(id).className = "";
            document.getElementById(id).classList.add('cambioFichaSacar');
            i++;
            if (i == cantidad) {
                clearInterval(intervalo);
            }
        }, 200);

        setTimeout(function () {
            for (var i = 1; i <= cantidad; i++) {
                id = (color + "Final" + i).toString();
                document.getElementById(id).remove();
            }

            i = (fichas[color2] + 1).toString();
            id = color2 + i;
            idElement = "#" + id;
            let nuevoDiv = document.createElement("div");
            nuevoDiv.setAttribute("id", id);
            document.body.appendChild(nuevoDiv); //Insertarlo en el documento
            document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen2 + "')";
            document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
            document.getElementById(id).style.height = "var(--alturaChip)";
            document.getElementById(id).style.width = "var(--anchuraChip)";
            document.getElementById(id).style.position = "absolute";
			document.getElementById(id).style.zIndex = (fichas.rojas+fichas.verdes+fichas.azules+fichas.negras+fichas.moradas).toString();
			correctZIndex(id,i);
            document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + i + ")";
            document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + col + "))";
            document.getElementById(id).className = "";
            sacarPosicionXFicha(idElement);
            sacarPosicionYFicha(idElement);
            document.getElementById(id).classList.add('cambioFichaMeter');

            fichas[color2]++;
            for (var k = 0; k <= 4; k++) {
                switch (k) {
                case 0:
                    id = "rojas" + fichas.rojas;
                    break;
                case 1:
                    id = "verdes" + fichas.verdes;
                    break;
                case 2:
                    id = "azules" + fichas.azules;
                    break;
                case 3:
                    id = "negras" + fichas.negras;
                    break;
                case 4:
                    id = "moradas" + fichas.moradas;
                    break;
                }
                if (document.getElementById(id) != null) {
                    document.getElementById(id).onclick = apostar;
					betOnStackClick(id);
                }
            }
            cambiarFichasPlus();
        }, 200 * cantidad);
    }
}

function desactivarTodo() {
	if(consoleFunctions){
	console.log("desactivarTodo");
	}
    btnDoubleDown.disabled = true;
    btnDoubleDown.style.cursor = "not-allowed";
    btnSplit.disabled = true;
    btnSplit.style.cursor = "not-allowed";
    btnJugar.disabled = true;
    btnJugar.style.cursor = "not-allowed";
    btnPedir.disabled = true;
    btnPedir.style.cursor = "not-allowed";
    btnPlantarse.disabled = true;
    btnPlantarse.style.cursor = "not-allowed";
    btnRefresh.disabled = true;
    btnRefresh.style.cursor = "not-allowed";
    btnComprarFichas.disabled = true;
    btnComprarFichas.style.cursor = "not-allowed";
	btnCambiarFichas.disabled=true;
	btnCambiarFichas.style.cursor = "not-allowed";

    var form = document.getElementById("formulario");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = true;
    }

    for (var i = 0; i <= 4; i++) {
        switch (i) {
        case 0:
            color = "rojas";
            break;
        case 1:
            color = "verdes";
            break;
        case 2:
            color = "azules";
            break;
        case 3:
            color = "negras";
            break;
        case 4:
            color = "moradas";
            break;
        }

        if (document.getElementById(color + "Nueva" + bet[color].toString()) != null) {
            document.getElementById(color + "Nueva" + bet[color].toString()).onclick = null;
            document.getElementById(color + "Nueva" + bet[color].toString()).style.cursor = "not-allowed";
        }

        if (document.getElementById(color + fichas[color].toString()) != null) {
            document.getElementById(color + fichas[color].toString()).onclick = null;
            document.getElementById(color + fichas[color].toString()).style.cursor = "not-allowed";
        }
    }
}

function activarTodo() {
	if(consoleFunctions){
	console.log("activarTodo");
	}
    btnDoubleDown.disabled = false;
    btnDoubleDown.style.cursor = "pointer";
    btnSplit.disabled = false;
    btnSplit.style.cursor = "pointer";
    btnJugar.disabled = false;
    btnJugar.style.cursor = "pointer";
	if(enJuego){
    btnPedir.style.cursor = "pointer";
    btnPedir.disabled = false;
    btnPlantarse.style.cursor = "pointer";
    btnPlantarse.disabled = false;
	if((btnSplit.style.visibility == "visible" || btnDoubleDown.style.visibility == "visible") && bet.cantidad>fichas.cantidad){
		btnComprarFichas.disabled = false;
    btnComprarFichas.style.cursor = "pointer";
	}else if((btnSplit.style.visibility == "visible" || btnDoubleDown.style.visibility == "visible")){
		btnSplit.innerHTML="split";
		btnSplit.style.fontSize="1.5em";
		btnDoubleDown.style.fontSize = "1.5em";
		btnDoubleDown.innerHTML="Double Down";
	}
	}
	if(!enJuego){
    btnRefresh.disabled = false;
    btnRefresh.style.cursor = "pointer";
    btnCambiarFichas.disabled = false;
    btnCambiarFichas.style.cursor = "pointer";
    btnComprarFichas.disabled = false;
    btnComprarFichas.style.cursor = "pointer";
	activateStacks();
	}
	
    var form = document.getElementById("formulario");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].readOnly = false;
    }

    for (var i = 0; i <= 4; i++) {
        switch (i) {
        case 0:
            color = "rojas";
            break;
        case 1:
            color = "verdes";
            break;
        case 2:
            color = "azules";
            break;
        case 3:
            color = "negras";
            break;
        case 4:
            color = "moradas";
            break;
        }
		
		if(enJuego==false){
		betOnStackClick(color);
        if (document.getElementById(color + "Nueva" + bet.fichas) != null) {
            document.getElementById(color + "Nueva" + bet.fichas).onclick = null;
            document.getElementById(color + "Nueva" + bet.fichas).onclick = retirar;
            document.getElementById(color + "Nueva" + bet.fichas).style.cursor = "pointer";
        }

        if (document.getElementById(color + fichas[color].toString()) != null) {
            document.getElementById(color + fichas[color].toString()).onclick = apostar;
			betOnStackClick(color + fichas[color].toString());
            document.getElementById(color + fichas[color].toString()).style.cursor = "pointer";
        }
		}
    }
}

function desactivarFichas() {
	if(consoleFunctions){
	console.log("desactivarFichas");
	}
    for (var i = 0; i <= 4; i++) {
        switch (i) {
        case 0:
            color = "rojas";
            break;
        case 1:
            color = "verdes";
            break;
        case 2:
            color = "azules";
            break;
        case 3:
            color = "negras";
            break;
        case 4:
            color = "moradas";
            break;
        }
        if (document.getElementById((color + "Nueva" + bet[color]).toString()) != null) {
            document.getElementById(color + "Nueva" + bet[color].toString()).onclick = null;
            document.getElementById(color + "Nueva" + bet[color].toString()).style.cursor = "not-allowed";

        }

        if (document.getElementById((color + "NuevaD2" + bet[color]).toString()) != null) {
            document.getElementById(color + "NuevaD2" + bet[color].toString()).onclick = null;
            document.getElementById(color + "NuevaD2" + bet[color].toString()).style.cursor = "not-allowed";
        }

        if (document.getElementById((color + fichas[color]).toString()) != null) {
            document.getElementById(color + fichas[color].toString()).onclick = null;
            document.getElementById(color + fichas[color].toString()).style.cursor = "not-allowed";
        }
    }
}

function cerrar() {
    desactivarTodo();
    document.getElementById("FinJuego").style.visibility = "visible";
    document.getElementById("FinJuego").innerHTML = "<u>Tus Ganancias son</u>\n" + (bet.cantidad + bet2.cantidad + fichas.cantidad).toString();
    setTimeout(() => {
        window.location.replace("../index.html");
    }, 5000);
}

function autoCambiarFichas() {
    if (consoleFunctions) {
        console.log("autocambiarFichas");
    }

    desactivarTodo();

    rojasMax = 15;
    verdesMax = 8;
    azulesMax = 5;
    negrasMax = 8;

    var timeToWaitForWholeRound = 0;
    var timeToWaitPerChipStack = 0;
    var timePerChipStack = 0;
    var timePerPreviousWholeRound = 0;
    var timePerPreviousRounds = 0;
    var totalTime = 0;
    var isComplete = false;

    var iteraciones = 1;

    var calculoTiempo = new hucha();
    calculoTiempo.rojas = fichas.rojas;
    calculoTiempo.verdes = fichas.verdes;
    calculoTiempo.azules = fichas.azules;
    calculoTiempo.negras = fichas.negras;
    while (!isComplete) {
        (function (timePerPreviousRounds) { //IIFE runs with setTimeout to run after the whole previous round starts at 0 ;
            setTimeout(() => {
                timeToWaitPerChipStack = 0;
                for (fichaColumna = 1; fichaColumna <= 4; fichaColumna++) { //iterates through the stacks
                    let id = null;
                    var cantidadCambio = 0;
                    timePerChipStack = 0; //time that it takes to change current stack
                    switch (fichaColumna) {
                    case 1:
                        if (fichas.rojas >= rojasMax) {
                            id = "rojas" + fichas.rojas;
                            cantidadCambio = 10;
                        }
                        break;

                    case 2:
                        if (fichas.verdes >= verdesMax) {
                            id = "verdes" + fichas.verdes;
                            cantidadCambio = 5;
                        }
                        break;

                    case 3:
                        if (fichas.azules >= azulesMax) {
                            id = "azules" + fichas.azules;
                            cantidadCambio = 2;
                        }
                        break;

                    case 4:
                        if (fichas.negras >= negrasMax) {
                            id = "negras" + fichas.negras;
                            cantidadCambio = 5;
                            break;
                        }
                    } //switch case returns id of changed chip + number of chips to change

                    if (id != null) {
                        (function cambiarFicha(id, timeToWaitPerChipStack) {
                            setTimeout(function () {
                                let color = id.substring(0, 1);
                                switch (color) {
                                case "r":
                                    color = "rojas";
                                    var color2 = "verdes";
                                    var imagen = "fichaRoja.png";
                                    var imagen2 = "fichaVerde.png";
                                    var cantidad = 10;
                                    var col = 1;
                                    break;
                                case "v":
                                    color = "verdes";
                                    var color2 = "azules";
                                    var imagen = "fichaVerde.png";
                                    var imagen2 = "fichaAzul.png";
                                    var cantidad = 5;
                                    var col = 2;
                                    break;
                                case "a":
                                    color = "azules";
                                    var color2 = "negras";
                                    var imagen = "fichaAzul.png";
                                    var imagen2 = "fichaNegra.png";
                                    var cantidad = 2;
                                    var col = 3;
                                    break;
                                case "n":
                                    color = "negras";
                                    var color2 = "moradas";
                                    var imagen = "fichaNegra.png";
                                    var imagen2 = "fichaMorada.png";
                                    var cantidad = 5;
                                    var col = 4;
                                    break;
                                }

                                if (fichas[color] >= cantidad) {
                                    i = 0;
                                    intervalo = setInterval(function () { //+200ms depending on how many chips
                                        id = (color + fichas[color]).toString();
                                        fichas[color]--;
                                        var idElement = "#" + id;
                                        sacarPosicionXFichaInicial(idElement);
                                        sacarPosicionYFichaInicial(idElement);
                                        document.getElementById(id).remove();
                                        id = (color + "Final" + (i + 1)).toString();
                                        let nuevoDiv = document.createElement("div");
                                        idElement = "#" + id;
                                        nuevoDiv.setAttribute("id", id);
                                        document.body.appendChild(nuevoDiv);
                                        document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen + "')";
                                        document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                                        document.getElementById(id).style.height = "var(--alturaChip)";
                                        document.getElementById(id).style.width = "var(--anchuraChip)";
                                        document.getElementById(id).style.position = "absolute";
                                        document.getElementById(id).style.top = "calc( -1 * var(--alturaChip))";
                                        document.getElementById(id).style.left = "calc( -1 * var(--anchuraChip))"
                                        document.getElementById(id).style.zIndex = (fichas.rojas + fichas.verdes + fichas.azules + fichas.negras + fichas.moradas).toString();
                                        //correctZIndex(id, i);
                                        document.getElementById(id).className = "";
                                        document.getElementById(id).classList.add('cambioFichaSacar');
                                        i++;
                                        if (i == cantidad) {
											console.log("cleared");
                                            clearInterval(intervalo);
                                        }
                                    }, 200);

									(function(color,color2,cantidad){
                                    setTimeout(function () {
                                        for (var i = 1; i <= cantidad; i++) {
                                            id = (color + "Final" + i).toString();
                                            document.getElementById(id).remove();

                                        }

                                        i = (fichas[color2] + 1).toString();
                                        id = color2 + i;
                                        idElement = "#" + id;
                                        let nuevoDiv = document.createElement("div");
                                        nuevoDiv.setAttribute("id", id);
                                        document.body.appendChild(nuevoDiv); //Insertarlo en el documento
                                        document.getElementById(id).style.backgroundImage = "url('imagenes/chips/" + imagen2 + "')";
                                        document.getElementById(id).style.backgroundSize = "var(--anchuraChip) var(--alturaChip)";
                                        document.getElementById(id).style.height = "var(--alturaChip)";
                                        document.getElementById(id).style.width = "var(--anchuraChip)";
                                        document.getElementById(id).style.position = "absolute";
                                        document.getElementById(id).style.top = "calc(var(--topChip) - 10px * " + i + ")";
                                        document.getElementById(id).style.left = "calc((var(--leftChip) + (var(--anchuraChip) + 20px) * " + col + "))";
                                        document.getElementById(id).style.zIndex = i;
                                        document.getElementById(id).className = "";
                                        sacarPosicionXFicha(idElement);
                                        sacarPosicionYFicha(idElement);
                                        document.getElementById(id).classList.add('cambioFichaMeter');

                                        fichas[color2]++;
                                        document.getElementById(id).style.cursor = "not-allowed";
                                    }, 200 * cantidad);
									})(color,color2,cantidad);
                                }
                            }, timeToWaitPerChipStack);
                        })(id, timeToWaitPerChipStack);

                        timePerChipStack = (cantidadCambio == 0) ? 0 : (200 + (cantidadCambio * 200)); //defines how long the whole process for one stack takes
                        timeToWaitPerChipStack += timePerChipStack; //adds to the time for one stack to the whole time per function
                    }
                }
            }, timePerPreviousRounds);
        })(timePerPreviousRounds);

        timePerPreviousWholeRound = 0;

        if (((calculoTiempo.rojas >= rojasMax) || calculoTiempo.verdes >= verdesMax || calculoTiempo.azules >= azulesMax || calculoTiempo.negras >= negrasMax)) {
            var tiempoSumar = 0;

            if (calculoTiempo.rojas >= rojasMax) {
                calculoTiempo.rojas -= 10;
                calculoTiempo.verdes++;
                tiempoSumar += (200 + (10 * 200));
            }

            if (calculoTiempo.verdes >= verdesMax) {
                calculoTiempo.verdes -= 5;
                calculoTiempo.azules++;
                tiempoSumar += (200 + (5 * 200));
            }

            if (calculoTiempo.azules >= azulesMax) {
                calculoTiempo.azules -= 2;
                calculoTiempo.negras++;
                tiempoSumar += (200 + (2 * 200));
            }

            if (calculoTiempo.negras >= negrasMax) {
                calculoTiempo.negras -= 5;
                calculoTiempo.moradas++;
                tiempoSumar += (200 + (5 * 200));
            }

            timePerPreviousWholeRound += tiempoSumar;
            timePerPreviousRounds += timePerPreviousWholeRound;
            totalTime += timePerPreviousWholeRound;
            if (!(calculoTiempo.rojas >= rojasMax || calculoTiempo.verdes >= verdesMax || calculoTiempo.azules >= azulesMax || calculoTiempo.negras >= negrasMax)) {

                if (consoleChips) {
                    console.log("r = " + calculoTiempo.rojas + "\nv = " + calculoTiempo.verdes + "\na = " + calculoTiempo.azules + "\nn = " + calculoTiempo.negras);
                }
                isComplete = true;  
                setTimeout(() => {
                    activarTodo();
                }, totalTime);
            }
        } else {
            isComplete = true;
            setTimeout(() => {
                activarTodo();
            }, totalTime);
        }
    }
}

function correctZIndex(id,numZIndex){
	(function(id,numZIndex){
	var color;
	
	if(id.includes("NuevaD")){
	document.getElementById(id).style.zIndex=bet2.fichas
	}else if(id.includes("Nueva")){
	document.getElementById(id).style.zIndex=bet.fichas;
	}else{
	switch (id.charAt(0)){
	case "r":
		color="rojas";
		break;
	case "v":
		color="verdes";
		break;
	case "a":
		color="azules";
		break;
	case "n":
		color="negras";
		break;
	case "m":
		color="moradas";
		break;
	}
	
	document.getElementById(id).style.zIndex=numZIndex;
	}
	})(id,numZIndex);
}

function activateStacks(){
	var color;
	for(var i=0;i<5;i++){
	switch(i){
	case 0:
	color="rojas";
	break;
	case 1:
	color="verdes";
	break;
	case 2:
	color="azules";
	break;
	case 3:
	color="negras";
	break;
	case 4:
	color="moradas";
	break;
	}
	
	for(var c=1;c<fichas[color];c++){
		document.getElementById(color+c).style.cursor="crosshair";
	}
	}
}

function betOnStackClick(id){
	if(consoleFunctions){
	console.log("betOnStackClick");
	}
	switch (id.charAt(0)){
	case "r":
		color="rojas";
		break;
	case "v":
		color="verdes";
		break;
	case "a":
		color="azules";
		break;
	case "n":
		color="negras";
		break;
	case "m":
		color="moradas";
		break;
	}
	
	for(let i=1;i<=fichas[color];i++){
		//document.getElementById(color+fichas[color]).style.cursor="crosshair";
	}
}