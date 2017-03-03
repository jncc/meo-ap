var express = require("express");

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.json('{ success :  true }');
});

app.listen(5000, () => {
    console.log('Server operational on port 5000');
});