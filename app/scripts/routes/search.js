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

		var view = new VideoListView(),
			list = view.collection;
			list.apiSearchFunction = 'search';

		router.on('route:search', function(term) {
			console.log('search: \'{0}\''.fmt(term));

			app.setViewTitle('Searching: ' + term, view.viewIcon);

			app.setContent(view);
			list.fetch_(term, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			Backbone.trigger('searchFinishedEvent', term);
			view.updatePaginationButtons(hasPrevious, hasNext);
		}
	}

});
