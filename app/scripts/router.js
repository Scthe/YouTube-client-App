define([
	'jquery',
	'underscore',
	'backbone',
	'routes/home',
	'routes/channel',
	'routes/video',
	'routes/search',
	'routes/search-channel'
], function($, _, Backbone) {

	'use strict';

	// parameters after first 5 are assumed to be routes modules
	var routes = Array.prototype.slice.call(arguments, 3);

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'video/:id': 'video',
			'channel/:id': 'channel',
			'search/channel/:term': 'search-channel',
			'search/video/:term': 'search'
		}
	});

	return {
		initialize: initialize
	};

	function initialize() {
		console.log('router initialize');

		var router = new Router();

		_.each(routes, function(e) {
			e.initialize(router);
		});

		Backbone.history.start();

		return router;
	}
});
