require.config({
	paths: {
		jquery: '/bower_components/jquery/dist/jquery.min',
		underscore: '/bower_components/underscore/underscore',
		backbone: '/bower_components/backbone/backbone',
		backboneLocalStorage: '/bower_components/backbone.localStorage/backbone.localStorage-min',

		templates: '/templates',
		models: 'models',
		views: 'views',
		routes: 'routes',
		services: 'services'
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
	'use strict';
	
	App.initialize();
});