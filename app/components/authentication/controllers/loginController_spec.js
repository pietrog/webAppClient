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
	ctrl.logout();
	authentication = $injector.get('AuthenticationFactory');
	usrFact = $injector.get('UserAuthFactory');
	
	$httpBackend = $injector.get('$httpBackend');
	$httpBackend.when('POST', "/authenticate", { name: "pietro", password: "silvio"})
	    .respond(
		{ success : true,
		  message : "Authentication successed ! ",
		  token: "XXX123",
		  profile: {
		      module: [
			  { name: 'patient' },
			  { name: 'sciences'}
		      ]
		  }
		}
	    );
    }));

    afterEach(function(){
    });


    it('should be disconnected', function(){
	expect(ctrl.userAuth.getToken()).toBe(null);
	expect(ctrl.userAuth.isAuthenticated()).toBe(false);
	ctrl.credentials = {name: "pietro", password: "silvio"};
	ctrl.login();
	$httpBackend.flush();

	expect(ctrl.userAuth.isAuthenticated()).toBe(true);
	expect(ctrl.userAuth.getUserData().name).toBe('pietro');
    });

    it('should have the patient module', function(){
	ctrl.credentials = {name: "pietro", password: "silvio"};
	ctrl.login();
	$httpBackend.flush();

	expect(ctrl.checkModuleAccess('patient')).toBe(true);
	expect(ctrl.checkModuleAccess('science')).toBe(false);
	expect(ctrl.checkModuleAccess('sciences')).toBe(true);
    });
    
});
