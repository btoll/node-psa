var fs = require('fs'),
    db = require('/usr/local/node-psa/db');

module.exports = function (app) {
    app.get('/upload/:image', function (req, res) {
        var img;

        img = fs.readFileSync('/usr/local/www/psa/server/images/' + req.params.image);
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(img, 'binary');
    });
};

