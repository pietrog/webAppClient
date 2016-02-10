'use strict';


describe('LoginCtrl controller ', function(){
    var ctrl,
	authentication,
	$httpBackend,
	usrFact;
    
    beforeEach(module('parap'));
    beforeEach(module('ui.router'));
    beforeEach(module('pietro.authentication'));
    
    beforeEach(inject(function($controller, $injector){
	ctrl = $controller('UserLoginCtrl');
	//make sure to be disconnected
	ctrl.auth.logout();
	authentication = $injector.get('AuthenticationFactory');
	usrFact = $injector.get('UserAuthFactory');
	
	$httpBackend = $injector.get('$httpBackend');
	$httpBackend.when('POST', "/authenticate", { name: "pietro", password: "silvio"})
	    .respond(
		{ success : true,
		  data:{
		      message : "Authentication successed ! ",
		      token: "XXX123",
		      profile: {
			  module: [
			      { name: 'patient' },
			      { name: 'sciences'}
			  ]
		      }
		  }
		}
	    );
    }));

    afterEach(function(){
    });


    it('should be disconnected', function(){
	expect(ctrl.user.getToken()).toBe(null);
	expect(ctrl.user.isAuthenticated()).toBe(false);
    });

    it('should have the patient module', function(){
	var credentials = {name: "pietro", password: "silvio"};
	ctrl.auth.login(credentials);
	$httpBackend.flush();

	expect(ctrl.user.checkModuleAccess('patient')).toBe(true);
	expect(ctrl.user.checkModuleAccess('science')).toBe(false);
	expect(ctrl.user.checkModuleAccess('sciences')).toBe(true);
    });

    it('should connect with credentials and return right informations', function(){
	var credentials = {name: "pietro", password: "silvio"};
	ctrl.auth.login(credentials);
	$httpBackend.flush();

	expect(ctrl.user.isAuthenticated()).toBe(true);
	expect(ctrl.user.getUserName()).toBe('pietro');
	
    });
    
});
