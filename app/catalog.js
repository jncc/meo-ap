var pgp = require('pg-promise')();

//var connectionString = `postgres://${process.env.PGCONN}@172.31.17.103:5432/topsat`;
var connectionString = `postgres://${process.env.PGCONN}@ec2-52-212-152-232.eu-west-1.compute.amazonaws.com:5432/topsat`;

var db = pgp(connectionString);

var getDatasets = function(product) {
    return db.many({
        name : 'getDatasets',
        text : 'SELECT * FROM chlor_a WHERE product = $1 ORDER BY startDate', 
        values : [product]
    }).catch(error => { console.log(error); });
}

var getDatasetsByDate = function(product, start, end) {
    return db.many({
        name : 'getDatasets',
        text : 'SELECT * FROM chlor_a WHERE product = $1 AND startDate <= $2 AND endDate >= $3 ORDER BY startDate', 
        values : [product, end.format('YYYY-MM-DD'), start.format('YYYY-MM-DD')]
    }).catch(error => { console.log(error); });
}

exports.getDatasets = getDatasets;
exports.getDatasetsByDate = getDatasetsByDate;
