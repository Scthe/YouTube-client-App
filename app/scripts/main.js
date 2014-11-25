require.config({
	paths: {
		jquery: '/bower_components/jquery/dist/jquery.min',
		underscore: '/bower_components/underscore/underscore-min',
		backbone: '/bower_components/backbone/backbone',
		backboneLocalStorage: '/bower_components/backbone.localStorage/backbone.localStorage-min',
		bacon: '/bower_components/bacon/dist/Bacon.min',
		bootstrap: '/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',

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
		},
		'bootstrap':{
			deps: ['jquery'],
		}
	},
	waitSeconds: 10

});

require(['jquery', 'bacon', 'app', 'bootstrap'], function( $, Bacon, App) {
	'use strict';

	// patch jQuery to allow to use with Bacon
	$.fn.asEventStream = Bacon.$.asEventStream;
	
	App.initialize();
});