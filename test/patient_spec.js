var expect = require('expect.js');
var config = require('./cfg/config.js'),
    Patient = require('../app/model/patient.js'),
    User = require('../app/model/users.js'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    db;



mongoose.connection.on('error', function(err){
    console.log('Error occured during db connection: ' + err);
});

mongoose.connection.on('connected', function(err){
    console.log('Connected to db : '+config.database);
});


describe('Patient model ', function(){

    var praticien;

    before(function(done) {
	//Another possibility is to check if mongoose.connection.readyState equals 1
	if (mongoose.connection.db) return done();
	mongoose.connect('mongodb://localhost/puan_test');
	done();

    });

    
    beforeEach(function(){
	Patient.remove({}).then(
	    function(err){
		User.remove({}).then(
		    function(err){
			var user = new User({
			    login: "pietro",
			    password: "brahhh",
			    profile: {
				type: "praticien",
				module: [{name: "patient"}]
			    }
			});
			
			User.create(user, function(err, obj){
			    if (!err){
				praticien = obj;
				done();
			    }
			    else
				throw err;
			});
		    });
	    });
    })
    
    it('should be empty', function(done){
	Patient.find(function(err, patients){
	    expect(patients.length).to.be(0);
	    done();
	});
    });

    it('should not create a patient because of no firstname', function(done){
	var patientID = praticien._id;
	var patient = new Patient({
	    //firstname: "coucou",
	    lastname: "herculanum",
	    email: "rome@it.it",
	    phone: "+443456789023",
	    adress: "3 via flamini, Roma",
	    idpraticien: patientID
	});

	Patient.create(patient, function(err, user){
	    expect(err.toString()).to.contain('`firstname` is required');

	    patient.firstname = "b";
	    
	    Patient.create(patient, function(err, user){
		expect(err.toString()).to.contain('`firstname` with value');
		done();
	    });
	});
	
    });

    it('should not create a patient because of no lastname', function(done){
	var patientID = praticien._id;
	var patient = new Patient({
	    firstname: "coucou",
	    email: "rome@it.it",
	    phone: "+443456789023",
	    adress: "3 via flamini, Roma",
	    idpraticien: patientID
	});

	Patient.create(patient, function(err, user){
	    expect(err.toString()).to.contain('`lastname` is required');
	    patient.lastname = "b";
	    
	    Patient.create(patient, function(err, user){
		expect(err.toString()).to.contain('`lastname` with value');
		done();
	    });

	});
	
    });

    it('should not create a patient because of neither email nor phone', function(done){
	//var id = new Schema.Types.ObjectId(
	var patient = new Patient({
	    firstname: "coucou",
	    lastname: "herculanum",
	    //email: "rome@it.it",
	    //phone: "+443456789023",
	    adress: "3 via flamini, Roma",
	    idpraticien: praticien._id
	});

	Patient.create(patient, function(err, user){
	    expect(err.toString()).to.contain('You should provide at least email or phone');
	    done();
	});
	
    });

    it('should not create a patient when not related to an existing praticien', function(done){
	var patient = new Patient({
	    firstname: "coucou",
	    lastname: "herculanum",
	    email: "rome@it.it",
	    phone: "+443456789023",
	    adress: "3 via flamini, Roma",
	});

	Patient.create(patient, function(err, user){
	    expect(err.toString()).to.contain('`idpraticien` is required');

	    patient.idpraticien = praticien._id;
	    Patient.create(patient, function(err, patient){
		expect(patient.firstname).to.equal('coucou');
		done();
	    });
	});
    });

    
    it('should create the patient', function(done){
	var patient = new Patient({
	    firstname: "coucou",
	    lastname: "herculanum",
	    email: "rome@it.it",
	    phone: "+443456789023",
	    adress: "3 via flamini, Roma",
	    idpraticien: praticien._id
	});

	Patient.create(patient, function(err, user){
	    expect(err).to.be(null);
	    expect(user.firstname).to.be("coucou");
	    expect(user.lastname).to.be("herculanum");
	    expect(user.email).to.be("rome@it.it");
	    expect(user.phone).to.be("+443456789023");
	    expect(user.adress).to.be("3 via flamini, Roma");
	    expect(user.idpraticien).to.be(praticien._id);
	    
	    done();
	});
    });

    
});

describe('Patients and Documents ', function(){

    var patient1 = new Patient({
	firstname: "herble",
	lastname: "glouton",
	email: "rome@it.it",
	phone: "+443456789023",
	adress: "3 via flamini, Roma",
    });
    var patient2 = new Patient({
	firstname: "jean",
	lastname: "valjean",
	email: "rome@it.it",
	phone: "+443456789023",
	adress: "3 via flamini, parios",
    });
    var patient3 = new Patient({
	firstname: "lucie",
	lastname: "lapluie",
	email: "lutexe@it.it",
	phone: "+443456789864",
	adress: "3 via flamini, U-S",
    });
    var user1 = new User({
	login: "pietrog",
	password: "brahhh",
	profile: {
	    type: "praticien",
	    module: [{name: "patient"}]
	}
    });
    var user2 = new User({
	login: "Poulette",
	password: "brahhh",
	profile: {
	    type: "praticien",
	    module: [{name: "patient"}]
	}
    });


    before(function(done) {
	//Another possibility is to check if mongoose.connection.readyState equals 1
	if (mongoose.connection.db) return done();
	mongoose.connect('mongodb://localhost/puan_test', function(err){
	    if (err)
		throw err;
	    Patient.remove({}, function(err){
		if (err)
		    throw err;
		User.remove({}, function(err){
		    if (err)
			throw err;
		    User.create(user1, function(err, _user1){
			if (err)
			    throw err;
			expect(_user1.login).to.be("pietrog");
			User.create(user2, function(err, _user2){
			    if (err)
				throw err;

			    patient1.idpraticien = _user1._id;
			    patient2.idpraticien = _user2._id;
			    patient3.idpraticien = _user2._id;
			    Patient.create(patient, function(err, patient1){
				if (err)
				    throw err;
				Patient.create(patient, function(err, patient2){
				    if (err)
					throw err;
				    Patient.create(patient, function(err, patient3){
					if (err)
					    throw err;
					done()
				    });
				});
			    });
			})
		    });
		})
	    });
	});
    })
	    

    it('should contain 3 patients', function(done){
	User.find(function(err, users){
	    if (err)
		throw err;
	    
	    expect(users.length).to.be(2);
	    
	    Patient.find(function(err, patients){
		if (err)
		    throw err;

		expect(patients.length).to.be(3);
		done();
	    });
	});
    })

});

