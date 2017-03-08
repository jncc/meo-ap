var pgp = require('pg-promise')();

var db = pgp(process.env.PGCONN);

var getDatasets = function(product) {
    return db.many({
        name : 'getDatasets',
        text : 'SELECT * FROM chlor_a WHERE product = $1 ORDER BY startDate', 
        values : [product]
    }).catch(error => { console.log(error); });
}

exports.getDatasets = getDatasets;

