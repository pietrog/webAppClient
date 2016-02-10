var expect = require('expect.js');
var config = require('./cfg/config.js'),
    Module = require('../app/model/module.js'),
    mongoose = require('mongoose'),
    db;



mongoose.connection.on('error', function(err){
    console.log('Error occured during db connection: ' + err);
});

mongoose.connection.on('connected', function(err){
    console.log('Connected to db : '+config.database);
});


describe('Module model ', function(){

    before(function(done) {
	//Another possibility is to check if mongoose.connection.readyState equals 1
	if (mongoose.connection.db) return done();
	mongoose.connect('mongodb://localhost/puan_test', done);
    });

    
    //clean the collection before each test
    beforeEach(function(){
	Module.remove({}).then(
	    function(err){
		done();
	    });
    })

    it ('should be empty', function(done){
	Module.find(function(err, mods){
	    expect(err).to.be(null);
	    expect(mods.length).to.equal(0);
	    done();
	});
    });

    it ('should have a name', function(done){
	var module = {
	    description: "test",
	    isActive: true
	};
	Module.create(module, function(err, mods){
	    expect(err.toString()).to.contain('`name` is required');
	    done();
	});
    });

    it ('should add a module', function(done){
	var module = {
	    name: "ModTest",
	    description: "test",
	    isActive: true
	};
	Module.create(module, function(err, mod){
	    expect(err).to.be(null);
	    expect(mod.name).to.equal(module.name);
	    expect(mod.description).to.equal(module.description);
	    expect(mod.isActive).to.equal(module.isActive);
	    done();
	});
    });

});
