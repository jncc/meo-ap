var express = require('express');
var nunjucks = require('nunjucks');
var catalog = require('./catalog.js');
var moment = require('moment');

var app = express();

nunjucks.configure('views', { autoescape : true, express : app });

app.set("view engine", "nunjucks");
app.use(express.static('app/public'));

var products = {
    monthly : { id : 'monthly', name : 'Chlorophyll-a Concentration for UK Waters - Monthly', files : 220, catalogProduct : 'monthly' },
    fiveday : { id : 'fiveday', name : 'Chlorophyll-a Concentration for UK Waters - 5-day', files : 1341, catalogProduct : '5day' },
    daily : { id : 'daily', name : 'Chlorophyll-a Concentration for UK Waters - Daily', files : 6666, catalogProduct : 'daily' }
};

app.get('/', function(req, res) {
    res.render('index.html', {
        products : products
    });
});

app.get('/data/:product/:start/:end', function(req, res) {
    try {
        var sm = moment(req.params.start);
        var em = moment(req.params.end);

        catalog.getDatasetsByDate(products[req.params.product].catalogProduct, sm, em).then(datasets => {
            res.render('data.html', {
                product : products[req.params.product],
                data : datasets,
                moment : moment,
                start : sm.format('YYYY-MM-DD'),
                end : em.format('YYYY-MM-DD')
            });
        });
    } catch (e) {
        res.sendStatus(500);
    }
});

app.get('/about', function(req, res) {
    res.render('about.html');
});

app.get('/contact', function(req, res) {
    res.render('contact.html');
});

app.listen(process.env.PORT, () => {
    console.log('Server operational on port ' + process.env.PORT);
});
