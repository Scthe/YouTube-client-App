define([
	'models/channelList',
	'views/videoListView'
], function(channelList, VideoListView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {

		var channelsStorage = new window.Store('backbone-channels'),
			videoListView = new VideoListView(),
			videoList = videoListView.collection;
		videoList.apiSearchFunction = 'getChannelVideos';

		router.on('route:channel', function(id) {
			console.log('routed to channel \'' + id + '\'');

			var m = channelsStorage.find({
				id: id
			});
			if (m) {
				app.setViewTitle('Channel: {0}'.fmt(m.name));
			} else {
				app.setViewTitle('Getting channel data..'); // TODO should get channel name by separate api call
			}

			videoListView.render();
			videoList.fetch_(id, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			videoListView.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
