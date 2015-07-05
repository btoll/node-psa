// TODO: images aren't being cached.
// TODO: imagemagick
// TODO: localization?
//
var express = require('express'),
    favicon = require('serve-favicon'),
    // Formerly express#logger.
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    path = require('path'),
    app = express(),
    // Have the https server read in the private key and cert.
    options = {
        key: fs.readFileSync('../../node-psa/cert/server_key.pem'),
        cert: fs.readFileSync('../../node-psa/cert/server_cert.pem')
    };

app.set('httpPort', process.env.PORT || 3000);
app.set('httpsPort', process.env.PORT || 3001);

// Just set the root dir as the views dir since I only need it to render index.html.
//app.set('views', path.join(__dirname, '.'));
// I don't need to use jade or ejs views since I'm using Ext views.
// http://stackoverflow.com/a/12008228
// For rendering HTML with Jade: http://stackoverflow.com/a/8922097
//app.engine('html', require('ejs').renderFile);

// Middleware.
//app.use(favicon());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(multer({
    dest: './server/images/',
    rename: function (fieldname, filename) {
        return filename;
    }
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: '1234567890QWERTY'
}));

// Add the middleware to redirect any unsecure request to the secure server.
// http://stackoverflow.com/a/10715802
app.use(function (req, res, next) {
    if (!req.secure) {
        return res.redirect('https://localhost:3001' + req.url);
    }

    next();
});

app.use(express.static(path.join(__dirname, '.')));

// Development only.
if ('development' === app.get('env')) {
    app.use(errorHandler());
}

require('./server/routes/index')(app);
require('./server/routes/session')(app);
require('./server/routes/sets')(app);
require('./server/routes/cards')(app);
require('./server/routes/upload')(app);
require('./server/routes/conditions')(app);
require('./server/routes/psa')(app);

// Create the servers.  We create the http server just to bounce any unsecure requests over to the secure server!
http.createServer(app).listen(app.get('httpPort'));
https.createServer(options, app).listen(app.get('httpsPort'), function () {
    console.log('Express server listening on port ' + app.get('httpsPort'));
});

