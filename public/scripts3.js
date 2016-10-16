var NBOLAS = 60;
var DIM_CASILLA = {ancho: 52, alto: 27};

var DIM_BOLA = {ancho:30, alto:30};

var CARTONES = [
	{x: 20, y: 97},
	{x: 480, y: 97},
	{x: 20, y: 230},
	{x: 480, y: 230}
];

var COLUMNAS_CARTON = 5;
var FILAS_CARTON = 3;
var PADDING_CASILLA = 5;

var inicia_numeros = function(n){
	var bombo = new Array();
	for(var i = 0; i < n; i++){
		bombo[i] = i+1;
	}

	return bombo;
}

var VECTOR_NUMEROS = inicia_numeros(NBOLAS);

var genera_numero = function(){
	//console.log(VECTOR_NUMEROS);
	var pos = Math.floor(Math.random() * VECTOR_NUMEROS.length);
	//console.log('pos: ' + pos);
	var bola = VECTOR_NUMEROS[pos];
	//console.log('bola: ' + bola);
	VECTOR_NUMEROS.splice(pos, 1);
	return bola;
}

var dibuja_carton = function(coordenadas_carton){
	for(var i = 0; i < coordenadas_carton.length; i++){
		var bola = genera_numero(VECTOR_NUMEROS);
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

var saco_de_bolas = function(){
	var saco = new Array();
	var v = 1;
	for(var f = 0; f < 10; f++){
		for(var c = 0; c < 10; c++){
			var bola = {
				valor: v,
				x: c*DIM_BOLA.ancho,
				y: f*DIM_BOLA.alto,
			};
			v++;
			saco.push(bola);
		}
	}

	return saco;
}

var SACO = saco_de_bolas();

var extrae_bola = function(){
	var pos = Math.floor(Math.random() * NBOLAS);
	var bola = SACO[pos];
	SACO.splice(pos, 1)

	return bola;
}

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
	
	var FILAS_BOLA = [
		{x: 17, y: 338, total_bolas: 8},
		{x: 17, y: 368, total_bolas: 7},
		{x: 443, y: 338, total_bolas: 8},
		{x: 443, y: 368, total_bolas: 7}
	];

	for(var f = 0; f < FILAS_BOLA.length; f++){
		var shown = 0;
		console.log("dibujar en: ("+ FILAS_BOLA[f].x + ", " + FILAS_BOLA[f].y +")");
		while(shown <= FILAS_BOLA[f].total_bolas){
			var b = extrae_bola();
			console.log(b);
			var rectangle = new PIXI.Rectangle(b.x, b.y, 30, 30);
			texture.frame = rectangle;
			var bola = new PIXI.Sprite(texture);
			bola.x = FILAS_BOLA[f].x + (DIM_BOLA.ancho*shown);
			bola.y = FILAS_BOLA[f].y;
			console.log("[" + bola.x + ", " + bola.y + "]");
			stage.addChild(bola);
			shown++;			
		}
	}
	renderer.render(stage);
}