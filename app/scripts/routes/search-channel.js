define([
	'views/channelListView',
	'views/searchChannelListView'
], function(ChannelListView, SearchChannelListView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {
		var searchChannelListView = new SearchChannelListView(),
			searchChannelList = searchChannelListView.collection;

		router.on('route:search-channel', function(term) {
			console.log('search-channel: \'{0}\''.fmt(term));

			app.setViewTitle('Searching for channel: ' + term);

			searchChannelListView.render();
			searchChannelList.fetch_(term, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			searchChannelListView.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
