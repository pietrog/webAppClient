var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: { type: String,
	     required: true,
	     unique: true,
	     validate: LoginValidation }, // can be a simple name or an email
    password: { type: String,
		required: true }, // encoded password
    profile: {
	type: { type: String,
		required: true,
		validate: UserTypeValidation }, // either admin or patient or praticien
	module: [new Schema({name: String}, {_id: false})], // list of modules that user can use 
	documents: [{ name: String }] // for type patient, list of documents he can access
    },
    lastAccessDate: Date
});



function LoginValidation(val){
    return val != null;
}


function UserTypeValidation(val){    
    return val == 'admin' || val == 'patient' || val == 'praticien';
}


module.exports = mongoose.model('User', UserSchema);
