define([
	'models/channelList',
	'views/videoListView',
	'services/favoriteChannelsService'
], function(channelList, VideoListView, favoriteChannelsService) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {

		var videoListView = new VideoListView(),
			videoList = videoListView.collection;
		videoList.apiSearchFunction = 'getChannel';

		router.on('route:channel', function(id) {
			console.log('routed to channel \'' + id + '\'');

			// set active channels
			favoriteChannelsService.collection.each(function(e) {
				e.set('active', e.get('id') === id); // TODO fix
			});

			// render left subscription panel
			if (app.channelListView) {
				app.channelListView.render();
			}

			// TODO view title
			// change view title TODO load from localstorage, do not wait for api call
			// var m = channelList.get(id);
			// app.setViewTitle('{0}\'s Channel'.fmt(m.get('name')));

			videoListView.render();
			videoList.fetch_(id, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			videoListView.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
