define([
	'underscore',
	'models/videoList',
	'services/YouTubeService',
	'models/video',
	'views/videoDetailsView'
], function(_, videoList, ytService, Video, VideoView) {

	'use strict';

	return {
		initialize: initialize
	};


	function initialize(router) {

		var videosStorage = new Store('backbone-videos');

		router.on('route:video', function(id) {
			console.log('routed to video \'{0}\''.fmt(id));

			var view = new VideoView({
				model: tryReadLocalObject(id, view)
			});

			app.setViewTitle(view.model.name, view.viewIcon);
			app.setContent(view);

			view.model.fetch_(onVideoGetSuccess, onVideoGetFail);

			function onVideoGetSuccess() {
				app.setViewTitle(view.model.get('title'));
				view.render();
				// store
				videosStorage.saveItem(view.model);
			}

			function onVideoGetFail() {
				app.setViewTitle('Error');
				var text = 'For some reason this video could not be displayed';
				var a = '<div class="alert alert-danger" role="alert">{0}</div>'.fmt(text);
				view.$el.html(a);
			}
		});

		function tryReadLocalObject(id) {
			var m = videosStorage.find({
				id: id
			});

			if (!m) {
				console.log('video not found in cache');
				m = {
					id: id,
					name: 'Fetching video data..'
				};
			}

			return new Video(m);
		}

	}

});
