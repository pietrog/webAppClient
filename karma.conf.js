module.exports = function(config){
    config.set({
	
	basePath : './',
	
	files : [
	    'public/bower_components/angular/angular.js',
	    'public/bower_components/angular-ui-router/release/angular-ui-router.js',
	    'public/bower_components/angular-mocks/angular-mocks.js',
	    'public/bower_components/js/angular-local-storage.js',
	    'public/*.js',
	    'public/components/home/home.js',
	    'public/components/user/user.js',
	    'public/components/patient/patient.js',
	    'public/components/psychologue/psychologue.js',
	    'public/components/**/*.js',

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
