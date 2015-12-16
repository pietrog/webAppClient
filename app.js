var env         = process.env.NODE_ENV || 'development',
    jwt = require('jsonwebtoken'),
    express     = require('express'),
    favicon     = require('serve-favicon'),
    logger      = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path        = require('path'),
    
    tools       = require('./app/tools'),
    packageJson = require('./package.json'),
    routes = require('./app/routes/index'),
    users = require('./app/routes/users'),
    patients = require('./app/routes/patient'),
    moduleRoutes = require('./app/routes/module.js'),
    User = require('./app/model/users.js'),
    Patient = require('./app/model/patient.js'),
    Module = require('./app/model/module.js'),
    config = require('./app/config/config.js');

global.App = {
    app : express(),
    port : tools.normalizePort(process.env.PORT || '3000'),
    version : packageJson.version,
    root : path.join(__dirname, '..'),
    publicFolder: path.join(__dirname, 'public'),
    appPath : function(path){
	return this.root + '/' + path;
    },
    require : function(path){
	return require(this.appPath(path));
    },
    env : env,
    start : function(){
	if (!this.started){
	    this.started = true;
	    this.app.listen(this.port);
	    console.log('Running node server version ' + this.version + ' on port ' + this.port + ' in env ' + this.env ); 
	}
    }
}


//database connection
mongoose.connect(config.database);
App.app.set('superSecret', config.secret);

// view engine setup
//App.app.set('rootdir', path.join(__dirname, 'app'));

// uncomment after placing your favicon in /public
App.app.use(favicon(App.publicFolder+"/assets/favico.ico"));
App.app.use(logger('dev'));
App.app.use(bodyParser.json());
App.app.use(bodyParser.urlencoded({ extended: false }));
App.app.use(cookieParser());



App.app.use('/', routes);
App.app.use('/users', users);
App.app.use('/modules', moduleRoutes);
App.app.use(express.static(App.publicFolder ));


/**
 * Check token based authorization
 */
App.app.use(function(req, res, next){
    
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token){
	jwt.verify(token, App.app.get('superSecret'), function(err, decoded){
	    if (err){
		console.log("error token: "+ err.toString());
		return res.json({success: false, message: 'Failed to authenticate token'});
	    }
	    else{
		//console.log('OKAYYY TOKEN !!' + decoded.toString());
		req.decodedToken = decoded;
		next();
	    }
	});
    }
    else{

	return res.status(403).send("Ressource non autorisée");
    }
});

App.app.use('/patients', patients);



// // catch 404 and forward to error handler
// /*App.app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });*/




module.exports = App;
