define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListView',
	'views/videoListView',
	'routes/home',
	'routes/channel',
	'routes/video',
	'routes/search'
], function($, _, Backbone, ChannelListView, VideoListView) {

	'use strict';

	// parameters after first 5 are assumed to be routes modules
	var routes = Array.prototype.slice.call(arguments, 5);

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'video/:id': 'video',
			'channel/:id': 'channel',
			'search/:term/:page': 'search'
		}
	});

	return {
		initialize: initialize
	};

	function initialize() {
		console.log('router initialize');

		var channelListView = new ChannelListView();
		var videoListView = new VideoListView();

		var router = new Router();

		_.each(routes, function(e) {
			e.initialize(router, channelListView, videoListView);
		});

		Backbone.history.start();

		return router;
	}
});