define([
	'underscore',
	'backbone',
	'views/videoListView'
], function(_, Backbone, VideoListView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {

		var videoListView = new VideoListView(),
			videoList = videoListView.collection;

		router.on('route:search', function(term) {
			console.log('search: \'{0}\''.fmt(term));

			app.setViewTitle('Searching: ' + term);

			videoListView.render();
			videoList.fetch_(term, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			Backbone.trigger('searchFinishedEvent', term);
			videoListView.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
