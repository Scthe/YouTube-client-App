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
		'bootstrap': {
			deps: ['jquery'],
		}
	},
	waitSeconds: 10

});

require([
	'jquery',
	'underscore',
	'backbone',
	'bacon',
	'backboneLocalStorage',
	'app',
	'bootstrap'
], function($, _, Backbone, Bacon, BackboneLocalStorage, App) {

	'use strict';

	// patch jQuery to allow to use with Bacon
	$.fn.asEventStream = Bacon.$.asEventStream;

	// allow Backbone view to close gracefully
	Backbone.View.prototype.close = function() {
		if (this.onClose) {
			this.onClose();
		}
		this.remove();
		this.unbind();
	};

	// patch BackboneLocalStorage to allow to store models without collections
	// it would be much easier to just copy __proto__ but we are on a critical path here..
	BackboneLocalStorage.prototype.saveItem = function(e) {
		var collectionStub = {
			records: [],
			localStorage: this.localStorage,
			_itemName: this._itemName,
			name: this.name,
			serializer: this.serializer,
			find: _.identity,
			save: _.identity
		};
		e.attributes.id = e.id;
		this.update.bind(collectionStub)(e);
	};

	App.initialize();
});
