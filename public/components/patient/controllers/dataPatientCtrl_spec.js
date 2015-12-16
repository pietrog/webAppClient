'use strict';

describe('DataPatient controller', function(){

    var ctrl;
    
    beforeEach(module('ui.router'));
    beforeEach(module('pietro.authentication'));
    beforeEach(module('parap.patient'));

    beforeEach(inject(function($controller, $injector){
	ctrl = $controller('DataPatientCtrl');
    }));

    it('should instanciate the controller', function(){
	expect(ctrl).not.toBe(null);
    });
});
