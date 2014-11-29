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

		router.on('route:home', function() {
			console.log('routed to home');

			var view = new VideoListView(),
				list = view.collection;

			list.forceAllApiCalls = true;
			list.apiSearchFunction = 'popularVideos';
			view.viewIcon = 'home';

			app.setViewTitle('Home', view.viewIcon);

			app.setContent(view);
			list.fetch_();
		});


	}
});
