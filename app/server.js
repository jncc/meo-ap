var express = require('express');
var nunjucks = require('nunjucks');
var catalog = require('./catalog.js');
var moment = require('moment');

var app = express();

nunjucks.configure('views', { autoescape : true, express : app });

app.set("view engine", "nunjucks");
app.use(express.static('app/public'));

var products = {
    monthly : { id : 'monthly', name : 'Chlorophyll-A Monthly', files : 220, catalogProduct : 'monthly' },
    fiveday : { id : 'fiveday', name : 'Chlorophyll-A 5-day', files : 1341, catalogProduct : '5day' },
    daily : { id : 'daily', name : 'Chlorophyll-A Daily', files : 6666, catalogProduct : 'daily' }
};

app.get('/', function(req, res) {
    res.render('index.html', {
        products : products
    });
});

app.get('/data/:product', function(req, res) {
    catalog.getDatasets(products[req.params.product].catalogProduct).then(datasets => {
        res.render('data.html', {
            product : products[req.params.product],
            data : datasets,
            moment : moment
        });
    });
});

app.listen(5000, () => {
    console.log('Server operational on port 5000');
});
