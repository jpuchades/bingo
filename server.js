var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('./public'));

app.get('*', function(req, res){
	res.sendFile('index.html', { root: './public'});
});

app.listen(port, function(){
	console.log('Listening on port ' + port);
});