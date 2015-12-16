var expect = require('expect.js');
var config = require('./cfg/config.js'),
    User = require('../app/model/users.js'),
    mongoose = require('mongoose'),
    db;



mongoose.connection.on('error', function(err){
    console.log('Error occured during db connection: ' + err);
});

mongoose.connection.on('connected', function(err){
    console.log('Connected to db : '+config.database);
});


describe('User model ', function(){

    before(function(done) {
	//Another possibility is to check if mongoose.connection.readyState equals 1
	if (mongoose.connection.db) return done();
	mongoose.connect('mongodb://localhost/puan_test', done);
    });

    
    //clean the collection before each test
    beforeEach(function(){
	User.remove({}).then(
	    function(err){
		done();
	    });
    })

    it ('should be empty', function(done){
	User.find(function(err, users){
	    expect(err).to.be(null);
	    expect(users.length).to.equal(0);
	    done();
	});
    });

    it ('should have a valid login', function(done){
	var user = new User({
	    login: "",
	    password: "ddd",
	    profile: {
		type: "admin",
		module: [{ name: "patient"}]
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err.toString()).to.contain('login');
	    done();
	});
    });

    it ('should have a valid password', function(done){
	var user = new User({
	    login: "pietro",
	    password: "",
	    profile: {
		type: "admin",
		module: [{ name: "patient"}]
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err.toString()).to.contain('password');
	    done();
	});
    });

    it ('should have a valid profile type', function(done){
	var user = new User({
	    login: "pietro",
	    password: "jsjsjs",
	    profile: {
		type: "",
		module: [{ name: "patient"}]
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err.toString()).to.contain('type');
	    done();
	});
    });

    it ('should create the patient', function(done){
	var user = new User({
	    login: "pietro",
	    password: "brahhh",
	    profile: {
		type: "patient",
		module: []
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err).to.be(null);
	    expect(user.login).to.equal("pietro");
	    expect(user.password).to.equal("brahhh");
	    expect(user.profile.type).to.equal("patient");
	    expect(user.profile.module.length).to.be(0);
	    done();
	});
    });

    it ('should create the admin', function(done){
	var user = new User({
	    login: "pietro",
	    password: "brahhh",
	    profile: {
		type: "admin",
		module: [{name: "patient"}]
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err).to.be(null);
	    expect(user.login).to.equal("pietro");
	    expect(user.password).to.equal("brahhh");
	    expect(user.profile.type).to.equal("admin");
	    expect(user.profile.module.length).to.be(1);
	    done();
	});
    });

    it ('should create the praticien', function(done){
	var user = new User({
	    login: "pietro",
	    password: "brahhh",
	    profile: {
		type: "praticien",
		module: [{name: "patient"}]
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err).to.be(null);
	    expect(user.login).to.equal("pietro");
	    expect(user.password).to.equal("brahhh");
	    expect(user.profile.type).to.equal("praticien");
	    expect(user.profile.module.length).to.be(1);
	    done();
	});
    });

    it ('should not create two users with the same login', function(done){
	var user = new User({
	    login: "pietro",
	    password: "brahhh",
	    profile: {
		type: "praticien",
		module: [{name: "patient"}]
	    }
	});
	
	User.create(user, function(err, user){
	    expect(err).to.be(null);
	    expect(user.login).to.equal("pietro");
	    expect(user.password).to.equal("brahhh");
	    expect(user.profile.type).to.equal("praticien");
	    expect(user.profile.module.length).to.be(1);

	    User.create(user, function(err, user){
		expect(err.toString()).to.contain("duplicate key");

		User.find(function(err, users){
		    expect(err).to.be(null);
		    expect(users.length).to.equal(1);
		    done();
		});
		done();
	    });
	});


    });



});
