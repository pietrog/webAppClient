'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('parapp e2e tests', function() {
    

    it ('should redirect index.html to /home/acceuil', function(){
	browser.get('index.html');
	browser.getLocationAbsUrl().then(function(url){
	    expect(url).toEqual('/home/accueil');
	});
    });


    describe('home view', function(){

	beforeEach(function(){
	    browser.get('index.html#/home');
	});
	
	it ('should redirect index.html to /home/acceuil', function(){
	    browser.getLocationAbsUrl().then(function(url){
		expect(url).toEqual('/home/accueil');
	    });
	});

	it ('should display information page when click informations', function(){
	    browser.get('index.html');
	    
	});
    });
    
/*    describe('view1', function() {
	
	beforeEach(function() {
	    browser.get('index.html#/view1');
	});
	
	
	it('should render view1 when user navigates to /view1', function() {
	    expect(element.all(by.css('[ng-view] p')).first().getText()).
		toMatch(/partial for view 1/);
	});
	
    });*/
    
    
});
