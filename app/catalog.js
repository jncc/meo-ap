var pgp = require('pg-promise')();

var connectionString = `postgres://${process.env.PGCONN}@172.31.17.103:5432/topsat`;

var db = pgp(connectionString);

var getDatasets = function(product) {
    return db.many({
        name : 'getDatasets',
        text : 'SELECT * FROM chlor_a WHERE product = $1 ORDER BY startDate', 
        values : [product]
    }).catch(error => { console.log(error); });
}

exports.getDatasets = getDatasets;

