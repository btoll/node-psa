var db = require('/usr/local/node-psa/db');

/*
 * RESTful API for Conditions.
 */
module.exports = function (app) {
    app.get('/conditions/:card', function (req, res, next) {
        var card = req.params.card;

        // TODO: is this whole branch necessary?
        if (card) {
            db.query('/conditions/:card', req, res);
        } else {
            next();
        }
    });

    app.post('/conditions', function (req, res) {
        db.query('/conditions', req, res);
    });
};

