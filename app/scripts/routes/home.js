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

		list.forceAllApiCalls = true;
		list.apiSearchFunction = 'popularVideos';
		view.viewIcon = 'home';

		router.on('route:home', function() {
			console.log('routed to home');

			app.setViewTitle('Home', view.viewIcon);

			view.render();
			list.fetch_(undefined, onSearchEnd);
		});

		function onSearchEnd(term, hasPrevious, hasNext) {
			Backbone.trigger('searchFinishedEvent', term);
			view.updatePaginationButtons(hasPrevious, hasNext);
		}
	}
});
