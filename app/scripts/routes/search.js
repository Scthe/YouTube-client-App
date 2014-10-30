define([
	'underscore',
	'views/channelListView',
	'models/channelList',
	'services/YouTubeService'
], function(_, ChannelListView, channelList, ytService) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router, channelListView) {
		router.on('route:search', function(term, page) {
			console.log('routed to search for: \'' + term + '\', page: ' + page);

			// set active channels
			channelList.each(function(e) {
				e.set('active', false);
			});

			// render left subscription panel
			channelListView.render();

			app.setViewTitle('Search');

			// download data
			ytService.search(term, page);
		});
	}

});