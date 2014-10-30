define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListView',
	'models/channelList',
	'views/videoListView',
	'models/videoList',
	'controllers',
	'routes/home',
	'routes/channel'
], function($, _, Backbone, ChannelListView, channelList, VideoListView, videoList, ytService, routeIndex, routeChannel) {

	'use strict';

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

		routeIndex.initialize(router, channelListView);
		routeChannel.initialize(router, channelListView, videoListView);



		router.on('route:video', function(id) {
			console.log('routed to video \'' + id + '\'');

			// find the selected model
			// ( due to 'app.videoList.reset()' resetting the _byId look up we have to do it by hand)
			var m;
			videoList.each(function(e) {
				if (e.id === id) {
					m = e;
				}
			});

			if (m) {
				// change view title
				$('#view-title-text').html(m.get('name'));

				// call for more details
				ytService.videoDetails(m.get('youTube_id'));
			} else {
				// TODO on video look up error
				console.log('err!');
			}
		});

		router.on('route:search', function(term, page) {
			console.log('routed to search for: \'' + term + '\', page: ' + page);

			// set active channels
			channelList.each(function(e) {
				e.set('active', false);
			});

			// render left subscription panel
			channelListView.render();

			// change view title
			$('#view-title-text').html('Search');

			// download data
			ytService.search(term, page);
		});

		Backbone.history.start();

		return router;
	}
});