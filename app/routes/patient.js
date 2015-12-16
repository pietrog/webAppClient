/**
 * REST API for patients
 * Each patient goes in a database and is related to a praticien ID.
 * It is a restricted route, user needs to be logged in as a praticien in order to be able to access this API
 * You can: 
 *    - create/remove a patient
 *    - modify a patient
 *    - get a list of all patient (related to the connected praticient)
 */

var express = require('express');
var router = express.Router();
var Patient = require('../model/patient.js');
var httphandler = require('../httpHandler.js');

function log(req, res, next){
    console.log('Dans une requete: ' + req);
    next();
}


router.get('/all', function(req, res){
    Patient.find({idpraticien: req.decodedToken.id}, null, function(err, patients){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());	
	else
	    httphandler.answerJSonSuccess(res, patients);	
    });
});

/**
  * Create a new patient
  */
router.post('/create', function(req, res){
    var patient = new Patient({
	firstname: req.body.firstname,
	lastname: req.body.lastname,
	email: req.body.email,
	birthdate: new Date(req.body.birthdate),
	phone: req.body.phone,
	adress: req.body.adress,
	idpraticien: req.decodedToken.id
    });
    console.log(req.decodedToken);
    patient.save(function(err, patient, nbAffected){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, patient);
    });
});

/**
  * Update an existing patient
  */
router.patch('/update', function(req, res){

    Patient.findByIdAndUpdate(req.body.id, req.body.data, function(err, patient){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, "Patient updated");
    });
});

/***
   * Return full patient object from its id
   */
router.get('/patient/:patientid', log, function(req, res){
    Patient.findOne({
	_id: req.params.patientid
    }, function(err, patient){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());
	else
	    httphandler.answerJSonSuccess(res, patient);
    })
});


router.delete('/patient/:patientid', function(req, res){
    Patient.remove({ _id: req.params.patientid }, function(err, patient){
	if (err)
	    httpHandler.answerJSonFailure(res, err.toString());
	else
	    Patient.find({idpraticien: req.decodedToken.id}, null, function(err, patients){
		httphandler.answerJSonSuccess(res, patients);
	    });

    });
});



module.exports = router;
