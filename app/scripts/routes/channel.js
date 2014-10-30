define([
	'views/channelListView',
	'models/channelList',
], function(ChannelListView, channelList) {

	'use strict';
	/*global app*/

	return {
		initialize: function(router, channelListView, videoListView) {

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
				app.setViewTitle(newTtitle);

				// render content
				videoListView.render();
			});
		}
	};
});