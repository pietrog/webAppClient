var express = require('express');
var router = express.Router();
var User = require('../model/users.js');
var Module = require('../model/module.js');
var app = require('../../app.js');
var httphandler = require('../httpHandler.js');

function checkIfUserIsAdmin(userFromToken){
    if (userFromToken != null){
	return true;
    }

    return false;
}


/* GET users listing. */
//Add a user in database
router.post('/add', function(req, res){
    // create a sample user
    // check if user is admin !!
    /*if (checkIfUserIsAdmin(req.decodedToken) == false)
    {
	console.log('User tried to access admin routes !! ');
	res.status(403).json({success: false, data: "NO ACCESS !!!!"});	
    }
    else{*/
	var user = new User({ 
	    login: req.body.login,
	    password: req.body.password,
	    profile: req.body.profile
	});

    console.log("add - " + user);
	
    // save the sample user
	user.save(function(err) {
	    if (err)
		httpHandler.answerJSonFailure(res, err.toString());	
	    else
		httphandler.answerJSonSuccess(res, null);	
	});
//    }
});

//list all users
router.get('/list', function(req, res){
    User.find({}, function (err, users){
	var result = {};
	users.forEach(function(current, index, array){
	    result[current._id] = current;
	});
	httphandler.answerJSonSuccess(res, result);	
    });
});

//delete a user following his name
router.delete('/user/:userID', function(req, res){
    console.log("remove user : " + req.params.userID);
    User.remove({
	_id : req.params.userID
    }, function (err, user){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());	
	else{
	    //send the list of users
	    User.find({}, function (err, users){
		if (err)
		    httpHandler.answerJSonFailure(res, err.toString());	
		else
		    httphandler.answerJSonSuccess(res, users);	
	    });
	}
    });

});


router.patch('/updateUserModules', function(req, res){
    
    var modName = req.body.module;

    User.findById(req.body.id, function(err, user){
	if (err)
	    res.status(500).json({ success: false });
	else{

	    //check if module exists
	    Module.findOne({ name: modName }, function(err, module){
		if (err)
		    console.log("error: " + err.toString());

		if (module){
		    var added = user.profile.module.addToSet({ name: modName });
		    if (added.length == 1){
			user.save();
			httphandler.answerJSonSuccess(res, null);	
		    }
		    else
			httphandler.answerJSonFailure(res, null);	
		}		
		else
		    httphandler.answerJSonFailure(res, null);	
	    })
	}
    });
});

/*
 * Remove a module from a given user's list
 */
router.patch('/deleteUserModule', function(req, res){
    var modName = req.body.module;
    User.findById(req.body.id, function(err, user){
	if (err)
	    res.status(500).json({ success: false });
	else if (!user){
	    res.json({ success: false });
	}
	else{
	    var resu = user.profile.module.length;
	    //resu = user.profile.module.$pop();
	    user.profile.module.pull({name: modName});
	    resu -= user.profile.module.length;
	    
	    if (resu == 1){
		
		user.save(function(err){
		    if (err) console.log("error : "+ err.toString())
		    console.log("HOURRA");
		});
		httphandler.answerJSonSuccess(res, null);	
	    }
	    else
		httphandler.answerJSonFailure(res, null);
	    
	}
    });
})
module.exports = router;
