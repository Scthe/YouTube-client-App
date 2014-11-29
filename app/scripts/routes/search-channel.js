define([
	'views/channelListView'
], function(SearchChannelListView) {

	'use strict';

	return {
		initialize: initialize
	};


	function initialize(router) {

		router.on('route:search-channel', function(term) {
			/*global app*/
			console.log('search-channel: \'{0}\''.fmt(term));

			var view = new SearchChannelListView(),
				list = view.collection;

			app.setViewTitle('Searching for channel: {0}'.fmt(term), view.viewIcon);

			app.setContent(view);
			list.fetch_(term);
		});


	}

});
