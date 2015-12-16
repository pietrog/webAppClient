var express = require('express');
var router = express.Router();
var Module = require('../model/module.js');
var httphandler = require('../httpHandler.js');

router.get('/list', function(req, res){
    Module.find(function(err, modules){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());	
	else
	    httphandler.answerJSonSuccess(res, modules);	
    });
});


router.post('/add', function(req, res){
    console.log("ajout module " + req.body.name);
    var newMod = new Module({
	name: req.body.name,
	description: req.body.description
    });

    newMod.save(function(err){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());	
	else
	    Module.find(function(err, modules){
		httphandler.answerJSonSuccess(res, modules);	
	    })
    });
});

router.delete('/module/:module_id', function(req, res){
    Module.remove({_id: req.params.module_id}, function(err){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());	
	else
	    httphandler.answerJSonSuccess(res, null);	
    })
});

router.patch('/update', function(req, res){
    Module.findByIdAndUpdate(req.body.id, req.body.data, function(err){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());	
	else
	    httphandler.answerJSonSuccess(res, null);	
    });
});


module.exports = router;
