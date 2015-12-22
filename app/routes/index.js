var express = require('express');
var router = express.Router();
var User = require('../model/users.js');
var app = require('../../app.js');
var jwt = require('jsonwebtoken');
var httphandler = require('../httpHandler.js');

/* GET home page. */
/*router.get('*', function(req, res) {
    res.sendFile('/home/pietro/projects/webApp/angularClient/app/index.html');
});*/

//authenticate a user
router.post('/authenticate', function(req, res){
    User.findOne({
	login : req.body.name
    }, function(err, user){
	if (err)
	    httphandler.answerJSonError(res, err.toString());
	else if (!user){
	    console.log('Utilisateur ' + req.body.name + ' inexistant');
	    httphandler.answerJSonWithHTTPCode(res, 401, 'Utilisateur ' + req.body.name + ' inexistant');
	}
	else{
	    if (user.password != req.body.password)
		httphandler.answerJSonWithHTTPCode(res, 401, 'Authentication failed. Wrong password !');
	    else{
		var profile = {
		    user: user.login,
		    id: user.id,
		    module: user.profile.module
		};

		var token = jwt.sign(profile, App.app.get('superSecret'), { expiresIn : 10000 });
		console.log("CONNEXION "+req.body.name);
		httphandler.answerJSonSuccess(res, { success : true,
						     data : "Authentication successed ! ",
						     token: token,
						     access: {},
						     profile: profile
						   });
	    }
	}
    })
});


module.exports = router;
