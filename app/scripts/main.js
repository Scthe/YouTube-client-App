require.config({
	// baseUrl: 'lib', TODO use baseUrl
	paths: {
		jquery: '../../bower_components/jquery/dist/jquery.min',
		underscore: '../../bower_components/underscore/underscore',
		backbone: '../../bower_components/backbone/backbone',
		backboneLocalStorage: '../../bower_components/backbone.localStorage/backbone.localStorage-min'
	},
    shim: {
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        }
    },
    waitSeconds: 10

});

require(['app'], function(App) {
	App.initialize();
});