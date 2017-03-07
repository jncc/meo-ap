var express = require('express');
var nunjucks = require('nunjucks');

var app = express();

nunjucks.configure('views', { autoescape : true, express : app });

app.set("view engine", "nunjucks");
app.use(express.static('app/public'));

app.get('/', function(req, res) {
    res.render('index.html', {
        products : [
            { id : 'chloro-a-m', name : 'Chlorophyll-A Monthly', files : 220 },
            { id : 'chloro-a-5d', name : 'Chlorophyll-A 5-day', files : 1341 },
            { id : 'chloro-a-d', name : 'Chlorophyll-A Daily', files : 6666 }
        ]
    });
});

app.get('/data/:product', function(req, res) {
    res.sendStatus(200);
});

app.listen(5000, () => {
    console.log('Server operational on port 5000');
});