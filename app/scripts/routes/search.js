define([
	'jquery',
	'underscore',
	'views/channelListView',
	'models/channelList',
	'views/videoListView',
	'services/YouTubeService'
], function($, _, ChannelListView, channelList, VideoListView, ytService) {

	'use strict';
	/*global app*/



	return {
		initialize: initialize
	};


	function initialize(router, channelListView) {
		router.on('route:search', function(term, page) {
			// TODO if just changing the pages it would be easier
			// to reset model and request new data instead
			// of recreating the whole view
			console.log('routed to search for: \'' + term + '\', page: ' + page);

			// left subscription panel
			channelList.deselectAll();
			channelListView.render(); // TODO not 'ChannelListView' ?

			app.setViewTitle('Searching: ' + term);

			var videoListView = new VideoListView(term, parseInt(page));
			videoListView.render();

			// kick off search // TODO move to collection class
			// var seachLoading = $('#search-loading'),
			var seachLoading = $('#search-loading');
			seachLoading.show();
			ytService.search(term, page, videoListView.onSearchResults);
		});
	}

});
