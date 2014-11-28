define([
	'underscore',
	'models/videoList',
	'services/YouTubeService',
	'models/video',
	'views/videoView'
], function(_, videoList, ytService, Video, VideoView) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {

		var videosStorage = new Store('backbone-videos'),
			videoView = new VideoView();

		router.on('route:video', function(id) {
			console.log('routed to video \'{0}\''.fmt(id));

			var m = videosStorage.find({
				id: id
			});
			if (m) {
				app.setViewTitle(m.name); // TODO set icon
			} else {
				app.setViewTitle('Getting video data..');
				m = {
					id: id,
					get: function() {}
				};
			}
			videoView.model = new Video(m);

			videoView.render();
			videoView.model.fetch_(onVideoGetSuccess, onVideoGetFail);

			function onVideoGetSuccess() {
				app.setViewTitle(videoView.model.get('title'));
				videoView.render();
				// store
				videosStorage.saveItem(m);
			}

			function onVideoGetFail() {
				app.setViewTitle('Error');
				var text = 'For some reason this video could not be displayed';
				var a = '<div class="alert alert-danger" role="alert">{0}</div>'.fmt(text);
				videoView.$el.html(a);
			}
		});

	}

});
