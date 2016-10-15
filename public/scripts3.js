var NBOLAS = 60;
var DIM_CASILLA = {ancho: 52, alto: 27};
var CARTONES = [
	{x: 20, y: 97},
	{x: 480, y: 97},
	{x: 20, y: 230},
	{x: 480, y: 230}
];

var COLUMNAS_CARTON = 5;
var FILAS_CARTON = 3;
var PADDING_CASILLA = 5;

var rellena_bombo = function(n){
	var bombo = new Array();
	for(var i = 0; i < n; i++){
		bombo[i] = i+1;
	}

	return bombo;
}

var BOMBO = rellena_bombo(NBOLAS);

var saca_bola = function(){
	//console.log(BOMBO);
	var pos = Math.floor(Math.random() * BOMBO.length);
	//console.log('pos: ' + pos);
	var bola = BOMBO[pos];
	//console.log('bola: ' + bola);
	BOMBO.splice(pos, 1);
	return bola;
}

var dibuja_carton = function(coordenadas_carton){
	for(var i = 0; i < coordenadas_carton.length; i++){
		var bola = saca_bola(BOMBO);
		coordenadas_carton[i]._b = bola;
	}
}

var coordenadas_carton = function(n, callback){
	var carton = CARTONES[n];
	var resultado = [];
	for(var f = 0; f < FILAS_CARTON; f++){
		for(var c = 0; c < COLUMNAS_CARTON; c++){
			pos_x = carton.x + (c * DIM_CASILLA.ancho);
			pos_y = carton.y + (f * DIM_CASILLA.alto);
			resultado.push({_x: pos_x, _y: pos_y});
		}
	}

	callback(resultado);

	return resultado;
};

var renderer = PIXI.autoDetectRenderer(760, 480);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

PIXI.loader
	.add("background", "assets/bg.png")
	.add("assets/balls-tileset.png")
	.load(setup);

function setup(){
	var sprite_back = new PIXI.Sprite(PIXI.loader.resources.background.texture);
	stage.addChild(sprite_back);

	var style = {
	    fontFamily : 'consolas',
	    fontWeight: 'bold',
	    fontSize : '20px',
	};

	for(var n = 0; n < CARTONES.length; n++){
		las_coordenadas = coordenadas_carton(n, dibuja_carton);
	
		for(var i = 0; i < las_coordenadas.length; i++){
	
			var numero = new PIXI.Text(las_coordenadas[i]._b, style);
			numero.x = las_coordenadas[i]._x + (PADDING_CASILLA*2);
			numero.y = las_coordenadas[i]._y + PADDING_CASILLA;
			stage.addChild(numero);
		}
	}

	var texture = PIXI.utils.TextureCache["assets/balls-tileset.png"];

	var rectangle = new PIXI.Rectangle(0, 0, 30, 30);
	texture.frame = rectangle;
	var bola = new PIXI.Sprite(texture);
	bola.x = 17;
	bola.y = 338;
	stage.addChild(bola);
			
	renderer.render(stage);
}