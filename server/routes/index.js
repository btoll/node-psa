/*
 * GET home page or redirect to login if no session.
 */
module.exports = function (app) {
    app.get('/', function (req, res) {
        if (!req.session.username) {
            res.redirect('./login.html');
        } else {
            res.render('index.html');
        }
    });

    app.get('/index.html', function (req, res) {
        if (!req.session.username) {
            res.redirect('../login.html');
        } else {
            res.render('index.html');
        }
    });
};

