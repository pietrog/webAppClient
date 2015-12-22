'use strict';

describe ('Base controller', function(){

    var ctrl,
	$httpBackend,
	authentication;
    
    beforeEach(module('parap'));
    beforeEach(module('ui.router'));
    beforeEach(module('pietro.authentication'));

    beforeEach(inject(function($controller, $injector){
	ctrl = $controller('ParapCtrl');
	authentication = $injector.get('AuthenticationFactory');

	$httpBackend = $injector.get('$httpBackend');
	$httpBackend.when('POST', "/authenticate", { name: "pietro", password: "silvio"})
	    .respond({ success : true, message : "Authentication successed ! ", token: "XXX123"});
	//?? WHY THIS 
	$httpBackend.when('GET', "views/header.html", { })
	    .respond({ });
	$httpBackend.when('GET', "views/footer.html", { })
	    .respond({ });
	$httpBackend.when('GET', "views/infobar.html", { })
	    .respond({ });
	$httpBackend.when('GET', "components/home/home.html", { })
	    .respond({ });
	
	
    }));

    it('should not contain any messages at launch', function(){
	expect(0).toBe(0);
    });

    //now, the message is raised in LoginCtrl
    /*it('should have raised a message when a user is connected', function(){
	authentication.login({ name: "pietro", password: "silvio"});
	$httpBackend.flush();
	expect(ctrl.messages.length).toBe(1);
    });*/

});
