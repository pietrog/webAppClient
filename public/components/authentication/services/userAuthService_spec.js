'use strict'

describe('User Authentication Service Tests', function(){

    var $httpBackend,
	userauthfactory,
	authentication;
    
    beforeEach(module('ui.router'));
    beforeEach(module('pietro.authentication'));

    beforeEach(inject(function($injector){
	
	userauthfactory = $injector.get('UserAuthFactory');
	authentication = $injector.get('AuthenticationFactory');

	//configure the httpBackend
	$httpBackend = $injector.get('$httpBackend');
	$httpBackend.when('POST', "/authenticate", { name: "pietro", password: "silvio"})
	    .respond({ success : true,
		       data: {
			   message : "Authentication successed ! ",
			   token: "XXX123"
		       }
		     });

    }));

    it('should be not logged in by default', function(){

	expect(userauthfactory.isAuthenticated()).toBe(false);
	expect(userauthfactory.getToken()).toBe(null);
    });

    it('should give correct credentials after logged in', function(){
	authentication.login({ name: "pietro", password: "silvio"});
	$httpBackend.flush();
	expect(userauthfactory.isAuthenticated()).toBe(true);
	expect(userauthfactory.getToken()).toBe('XXX123');
	expect(userauthfactory.getUserData().name).toBe('pietro');
    });
    
    it('should give correct credentials after logged out', function(){
	authentication.login({ name: "pietro", password: "silvio"});
	$httpBackend.flush();
	authentication.logout();
	expect(userauthfactory.isAuthenticated()).toBe(false);
	expect(userauthfactory.getToken()).toBe(null);
	expect(userauthfactory.getUserData()).toBe(null);
    });

    
});
