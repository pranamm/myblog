/* 
 * @Author: pranam
 * @Date:   2014-10-28 23:09:21
 * @Last Modified by:   pranam
 * @Last Modified time: 2014-11-05 23:05:30
 */

var http = require('http'),
    express = require('express'),
    logger = require('morgan'),
    multer = require('multer'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient;

var settings = require('./settings'),
    routes = require('./server/routes');

var App = function() {
    var self = this;

    self.dbUser = process.env.OPENSHIFT_MONGODB_DB_USERNAME;
    self.dbPass = process.env.OPENSHIFT_MONGODB_DB_PASSWORD;
    self.dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST;
    self.dbPort = parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT);
    self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
    self.port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 5000;

    if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
        self.dbName = 'admin'
        self.connectionString = 'mongodb://' + self.dbUser + ":" + self.dbPass + '@' + self.dbHost + ":" + self.dbPort + "/" + self.dbName
    } else {
        self.dbName = 'blogs'
        self.connectionString = 'mongodb://localhost:27017/' + self.dbName;
    }

    if (process.env.OPENSHIFT_REPO_DIR) {
        self.dirName = process.env.OPENSHIFT_REPO_DIR;
    } else {
        self.dirName = __dirname;
    }

    if (typeof self.ipaddress === "undefined") {
        console.warn('No OPENSHIFT_NODEJS_IP environment variable');
    };

    // Web app logic
    self.routes = {};

    //default response with info about app URLs
    self.routes['root'] = function(req, res) {
        res.send('test route');
    };

    // Web app urls
    self.app = express();


    self.app.use(logger('combined'));
    self.app.use(cookieParser());
    self.app.use(bodyParser.urlencoded({
        extended: true
    }));
    self.app.use(bodyParser.json());
    self.app.use(methodOverride('X-HTTP-Method-Override'));
    self.app.use(session({
        secret: 'misthi',
        saveUninitialized: true,
        resave: true
    }));
    self.app.use(passport.initialize());
    self.app.use(passport.session());
    self.app.use(multer({
        dest: './uploads/'
    }));

    /*passport.use('local-signin', new LocalStrategy({
            passReqToCallback: true
        }, //allows us to pass back the request to the callback
        function(req, username, password, done) {
            settings.DB.collection('users').findOne({
                email: username,
                password: password,
                isAdmin: true
            }, function(err, user) {
                if (err) {
                    done(err, null);
                }

                done(null, {
                    user: user
                });
            });
        }
    ));*/

    self.app.use("/", express.static(self.dirName + "/public/"));

    self.connectDb = function(cb) {
        MongoClient.connect(self.connectionString, function(err, db) {
            "use strict";
            if (err) {
                throw err;
            } else {
                settings.DB = db;
                self.app.get('/api', self.routes['root']);
                routes.initApp(self.app);
                //self.app.get('/api', self.routes['root']);
                //self.app.post('/api/login', routes.loginRoutes);
                /*self.app.post('/api/login', passport.authenticate('local-signin'), function(req, res) {
                    //res.send(req.user);
                    console.log("test user");
                });*/
                cb();
            }
        });
    };

    //starting the nodejs server with express
    self.startServer = function() {
        var server = http.createServer(self.app);
        server.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), self.ipaddress, self.port);
        });
    };

    // Destructors
    self.terminator = function(sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating Node server ...', Date(Date.now()), sig);
            process.exit(1);
        };
        console.log('%s: Node server stopped.', Date(Date.now()));
    };

    process.on('exit', function() {
        self.terminator();
    });

    self.terminatorSetup = function(element, index, array) {
        process.on(element, function() {
            self.terminator(element);
        });
    };

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'].forEach(self.terminatorSetup);

};

//make a new express app
var app = new App();

app.connectDb(app.startServer);
