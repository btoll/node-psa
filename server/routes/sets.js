var db = require('/usr/local/node-psa/db');

/*
 * RESTful API for Sets.
 */
module.exports = function (app) {
    app.get('/sets', function (req, res) {
        db.query('/sets', req, res);
    });
};

