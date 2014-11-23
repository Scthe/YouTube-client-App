define([
	'jquery',
	'underscore',
	'views/channelListView',
	'models/channelList',
	'views/videoListView'
], function($, _, ChannelListView, channelList, VideoListView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router, channelListView) {

		var videoListView = new VideoListView(),
			videoList = videoListView.videoList;

		router.on('route:search', function(term) {
			console.log('search: \'{0}\''.fmt(term));

			// left subscription panel
			channelList.deselectAll();
			channelListView.render(); // TODO not 'ChannelListView' ?

			app.setViewTitle('Searching: ' + term);

			videoListView.render();
			videoList.fetch_(term, videoListView.updatePaginationButtons);
		});
	}

});
