var db = require('/usr/local/node-psa/db');

/*
 * RESTful API for PSA.
 */
module.exports = function (app) {
    app.get('/psa/:card', function (req, res, next) {
        var card = req.params.card;

        // TODO: is this whole branch necessary?
        if (card) {
            db.query('/psa/:card', req, res);
        } else {
            next();
        }
    });

    app.post('/psa', function (req, res) {
        db.query('/psa', req, res);
    });
};

