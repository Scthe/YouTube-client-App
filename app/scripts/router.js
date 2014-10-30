define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListView',
	'models/channelList',
	// 'views/videoListView',
	// 'models/videoList',
	// 'controllers'
	// ], function($, _, Backbone, channelListView, channelList, videoListView, videoList, YT_Service) {
], function($, _, Backbone, ChannelListView, channelList) {

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
		var router = new Router();
		// TODO separate files in /routes

		router.on('route:home', function() {
			console.log('routed to home');

			// render left subscription panel
			channelListView.render();

			$('#main-panel-content').html('home'); // TODO app.setContent
		});

		/*
		router.on('route:channel', function(id) {
			console.log('routed to channel \'' + id + '\'');

			// set active channels
			channelList.each(function(e) {
				e.set('active', e.id === id);
			});

			// render left subscription panel
			channelListView.render();

			// change view title
			var m = channelList.get(id);
			var newTtitle = m.get('name') + '\'s Channel';
			$('#view-title-text').html(newTtitle); // TODO app.setViewTitle('abc')

			// render content
			videoListView.render();
		});

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
				YT_Service.videoDetails(m.get('youTube_id'));

				// render content
				//app.videoView.setVideo(m);
				//app.videoView.render(); // TODO display video description
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
			YT_Service.search(term, page);


			// render content
			//app.videoListView.render();

		});
*/

		Backbone.history.start();

		return router;
	}
});