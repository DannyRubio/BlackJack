class persona{

	constructor(){
		this.as=false;
		this.totalSuma=0;
		this.cartas=0;
		this.bust=false;
		this.split=false;
		this.doubleDown=false;
		this.blackjack=false;
		this.fin=false;
	}
	
	sumar(carta){//++++++++++++++++++++++++++++++Comienzo del METODO sumar()++++++++++++++++++++++++++++++++++++
//												*Coge como parametros la carta que se sacará.
//												*Devuelve la suma total de cartas.
// 													*ej{
//														(as pe picas, rey de corazones, nueve de treboles)  
//															==>  (SA,HK,C9)  
//																==>  suma += (1 || 11, 10, 9)}
		var suma;
		if(carta.length==1){
			valor=carta;
		}else{
		var valor=carta.substring(1);
		}
		switch(valor){
			case "A": 
				suma = (this.totalSuma<=10) ? suma=11 : suma=1;
				if(this.totalSuma<=10)
				this.as=true;
			break;
		
			case "K":
			case "Q":
			case "J":
			suma=10;
			break;
			default:
				suma=parseInt(valor);	
		}
	
		var sumaTemp=this.totalSuma+suma;
		if(sumaTemp>21 && this.as==true){
			this.totalSuma=this.totalSuma+suma-10;
			this.as=false;
		}else{
				this.totalSuma+=suma;
		}
	}//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++FIN del METODO sumar()++++++++++++++++++++++++++++++++++++++++++++


	nuevaSuma(carta){
		
		switch(carta.substring(1)){
			case "A": 
			this.totalSuma=11;
			break;
			case "K":
			case "Q":
			case "J":
				this.totalSuma=10;
			break;
			default:
				this.totalSuma=parseInt(carta.substring(1));	
		}	
	}
}


class hucha{	
	constructor(){
		this.cantidad=0;
		this.rojas=0;
		this.verdes=0;
		this.azules=0;
		this.negras=0;
		this.moradas=0;
	}
}

class apuesta{
	constructor(nombre){
		this.nombre=nombre;
		this.fichas=0;
		this.rojas=0;
		this.verdes=0;
		this.azules=0;
		this.negras=0;
		this.moradas=0;
		this.cantidad=0;	
	}
}

class BlckJck{
	constructor(){
		this.cantidad=0;
	}
}