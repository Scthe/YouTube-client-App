define([
	'jquery',
	'underscore',
	'views/videoListView'
], function($, _, VideoListView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {

		var videoListView = new VideoListView(),
			videoList = videoListView.videoList;

		router.on('route:search', function(term) {
			console.log('search: \'{0}\''.fmt(term));

			app.setViewTitle('Searching: ' + term);

			videoListView.render();
			videoList.fetch_(term, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			app.searchView.onSearchEnd(term);
			videoListView.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
