/*
 * All about sessions weeeeeeeeeeeeeeeeeee......
 */
var db = require('/usr/local/node-psa/db');

module.exports = function (app) {
    app.post('/login', function (req, res) {
        db.query('/login', req, res);
    });
};

