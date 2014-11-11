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

		var videoListView = new VideoListView();

		router.on('route:search', function(term, page) {
			console.log('routed to search for: \'' + term + '\', page: ' + page);

			// left subscription panel
			channelList.deselectAll();
			channelListView.render(); // TODO not 'ChannelListView' ?

			app.setViewTitle('Searching: ' + term);

			videoListView.setActive(term, parseInt(page));
		});
	}

});
