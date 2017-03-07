var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('views', { autoescape : true, express : app });

app.set("view engine", "nunjucks");
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index.html', {});
});

app.get('/:product', function(req, res) {

});

app.listen(5000, () => {
    console.log('Server operational on port 5000');
});