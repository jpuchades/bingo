// Inicializamos el bombo
var el_bombo = [];
var nbolas = 60;

for(var i = 1; i <= nbolas; i++){
	el_bombo.push(i);
}


console.log(el_bombo);


var dim_casilla = {ancho: 52, alto: 27};
var cartones = [
	{x: 20, y: 97},
	{x: 480, y: 97},
	{x: 20, y: 230},
	{x: 480, y: 230}
];
var columnas_carton = 5;
var filas_carton = 3;
var padding_casilla = 5;

var saca_bola = function(el_bombo){
	//console.log('limite: ' + limite);
	var r = Math.floor(Math.random() * (el_bombo.length-1));
	//r = r - 1;
	console.log('el_bombo = ' + el_bombo);
	console.log('r = ' + r);
	//console.log('el_bombo[' + r + '] = ' + el_bombo[r]);
	el_bombo.splice(r, 1);
	return el_bombo[r];
};

var coordenadas_carton = function(n, callback){
	var carton = cartones[n];
	//console.log(carton);
	var resultado = [];
	var pos_x, pos_y;
	for(var f = 0; f < filas_carton; f++){
		for(var c = 0; c < columnas_carton; c++){
			pos_x = carton.x + (c*dim_casilla.ancho);
			pos_y = carton.y + (f*dim_casilla.alto);
			resultado.push({
				_x: pos_x, 
				_y: pos_y, 
				_b: 'x'
			});
		}
	}

	callback(resultado);
};

var dibuja_carton = function(coordenadas_carton){
	//console.log(coordenadas_carton);
	for(var i = 0; i < coordenadas_carton.length; i++){
		var bola = saca_bola(el_bombo);
		console.log('bola: ' + bola);		
		coordenadas_carton[i]._b = bola;
		//console.log(bola);
	}
};

//console.log(dibuja_carton(coordenadas_carton(0)));
var renderer = PIXI.autoDetectRenderer(760, 480);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

PIXI.loader
	.add("assets/bg.png")
	.load(setup);


function setup(){
	var las_coordenadas;
	var sprite_back = new PIXI.Sprite(PIXI.loader.resources["assets/bg.png"].texture);
	stage.addChild(sprite_back);

	var style = {
	    fontFamily : 'consolas',
	    fontWeight: 'bold',
	    fontSize : '20px',
	};

	for(var n = 0; n < cartones.length; n++){
		las_coordenadas = coordenadas_carton(n, dibuja_carton);

		console.log(las_coordenadas);
		
		//console.log('carton:');
		//dibuja_carton(las_coordenadas);
		//console.log(las_coordenadas);
		for(var i = 0; i < las_coordenadas.length; i++){
			//console.log(las_coordenadas[i]);
			var numero = new PIXI.Text(las_coordenadas[i]._b, style);
			numero.x = las_coordenadas[i]._x + (padding_casilla*2);
			numero.y = las_coordenadas[i]._y + padding_casilla;

			console.log(las_coordenadas[i]._b);
			stage.addChild(numero);
		}
	}
	
	/*
	var basicText = new PIXI.Text('34', style);
	basicText.x = 30;
	basicText.y = 90;
	stage.addChild(basicText);
	*/

		
	renderer.render(stage);
}

