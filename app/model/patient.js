var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./users.js');

var PatientSchema = new Schema({
    firstname: {
	type: String,
	required: true,
	validate: nameValidation
    },
    lastname: {
	type: String,
	required: true,
	validate: nameValidation
    },
    idpraticien: {
	type: Schema.Types.ObjectId,
	required: true,
	validate: idPraticienValidation
    },

    email: String,
    birthdate: Date,
    phone: {
	type: String,
	validate: phoneValidation
    },
    adress: String    
});

/******* HOOKS *******/
function idPraticienValidation(val){
    User.find({_id: val}, function(err, user){
	if (user){
	    return false;
	}
	else{
	    return false;
	}
    });
}
    
function nameValidation(val){
    return /\D{2,}/i.test(val);
}

//@TODO implement phone regexp validator and unit test
function phoneValidation(val){
    return true;
}

//@TODO implement email regexp validator and unit test
function emailValidation(val){
    return true;
}

PatientSchema.pre('save', function(next){
    if (!this.email && !this.phone)
	next(new Error('You should provide at least email or phone'));
    next();
});


/**
 * Describe a document belonging to a patient
 * A document has a description, can contain a file, and has a add date
 * The document contains the id pointing to the patient having it
 */
var DocumentSchema = new Schema({
    idpraticien: {
	type: Schema.Types.ObjectId,
	required: true,
	validate: idPraticienValidation
    },
    name: {
	type: String,
	required: true
    },
    addDate: {
	type: Date,
	required: true
    },
    description: {
	type: String
    },
    pathToFile: {
	type: String
    },
    filename: {
	type: String
    }

});



/******* INSTANCE METHODS *******/

/******* STATIC METHODS *******/
DocumentSchema.statics.getDocuments = function (patientID, cb){
    return DocumentSchema.find({ idpraticien: patientID }, cb);
}


/******* INSTANCE METHODS *******/
PatientSchema.methods.getDocuments = function(cb){
    return DocumentSchema.getDocuments(this._id);
};


module.exports = mongoose.model('Patient', PatientSchema);

