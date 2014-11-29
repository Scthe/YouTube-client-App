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
			view = new VideoListView(),
			list = view.collection;
		list.apiSearchFunction = 'getChannelVideos';
		view.viewIcon = 'facetime-video';

		router.on('route:channel', function(id) {
			console.log('routed to channel \'' + id + '\'');

			var m = channelsStorage.find({
				id: id
			});
			if (m) {
				app.setViewTitle('Channel: {0}'.fmt(m.name), view.viewIcon);
			} else {
				// TODO should get channel name by separate api call
				app.setViewTitle('Getting channel data..', view.viewIcon);
			}

			app.setContent(view);
			list.fetch_(id, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			view.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
