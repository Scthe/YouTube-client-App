define([
	'views/channelListView'
], function(SearchChannelListView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {
		var view = new SearchChannelListView(),
			list = view.collection;

		router.on('route:search-channel', function(term) {
			console.log('search-channel: \'{0}\''.fmt(term));

			app.setViewTitle('Searching for channel: {0}'.fmt(term), view.viewIcon);

			app.setContent(view);
			list.fetch_(term, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			view.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
