module.exports = function(config){
    config.set({
	
	basePath : './',
	
	files : [
	    'app/bower_components/angular/angular.js',
	    'app/bower_components/angular-route/angular-route.js',
	    'app/bower_components/angular-mocks/angular-mocks.js',
	    'app/bower_components/js/angular-local-storage.js',
	    'app/components/home/home.js',
	    'app/components/user/user.js',
	    'app/components/**/*.js',

	],

	autoWatch : true,
	
	frameworks: ['jasmine'],
	
	browsers : ['Chrome'],
	
	plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
	
	junitReporter : {
	    outputFile: 'test_out/unit.xml',
	    suite: 'unit'
	}
	
    });
};
