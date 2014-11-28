define([
	'underscore',
	'models/videoList',
	'services/YouTubeService',
	'models/video',
	'views/videoView'
], function(_, videoList, ytService, Video, VideoView) {

	'use strict';
	/*global app, Store*/

	return {
		initialize: initialize
	};


	function initialize(router) {

		var videosStorage = new Store('backbone-videos'),
			view = new VideoView();

		router.on('route:video', function(id) {
			console.log('routed to video \'{0}\''.fmt(id));

			var m = videosStorage.find({
				id: id
			});
			if (m) {
				app.setViewTitle(m.name, view.viewIcon);
			} else {
				app.setViewTitle('Fetching video data..', view.viewIcon);
				m = {
					id: id,
					get: function() {}
				};
			}
			view.model = new Video(m);

			view.render();
			view.model.fetch_(onVideoGetSuccess, onVideoGetFail);

			function onVideoGetSuccess() {
				app.setViewTitle(view.model.get('title'));
				view.render();
				// store
				videosStorage.saveItem(m);
			}

			function onVideoGetFail() {
				app.setViewTitle('Error');
				var text = 'For some reason this video could not be displayed';
				var a = '<div class="alert alert-danger" role="alert">{0}</div>'.fmt(text);
				view.$el.html(a);
			}
		});

	}

});
