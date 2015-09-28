(function(){

    'use strict';

    angular.module('moduleTest', []);

    angular.module('moduleTest')
	.factory('testService', function(){
	    var test = {};

	    test.cpt = 0;

	    test.incrCpt = function(){
		test.cpt++;
	    }

	    test.getCpt = function(){
		return test.cpt;
	    }

	    return test;
	});

})();
