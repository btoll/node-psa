var db = require('/usr/local/node-psa/db');

/*
 * RESTful API for Sets.
 */
module.exports = function (app) {
    app.route('/cards')
        .get(function (req, res) {
            var set = req.query.set;

            if (set !== undefined) {
                db.query('/cards/:set', req, res);
            } else {
                // TODO: throw here.
            }
        })

        .post(function (req, res) {
            db.query('/cards', req, res);
        })

        .put(function (req, res) {
            db.query('/cards', req, res);
        });
};

