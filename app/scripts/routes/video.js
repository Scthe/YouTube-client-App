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

		var videoView;

		router.on('route:video', function(id) {
			console.log('routed to video \'{0}\''.fmt(id));
			// TODO reuse data from video list f.e. title, channel etc.
			// No need to wait for it to download again

			app.setViewTitle(''); // TODO title and favicon

			var video = new Video(id, onVideoGetSuccess, onVideoGetFail);
			videoView = new VideoView({ // TODO remove this - read from local storage !
				model: video
			});

		});

		function onVideoGetSuccess() {
			app.setViewTitle(videoView.model.get('title'));
			videoView.render();
		}

		function onVideoGetFail() {
			app.setViewTitle('Error');
			var text = 'For some reason this video could not be displayed';
			var a = '<div class="alert alert-danger" role="alert">{0}</div>'.fmt(text);
			videoView.$el.html(a);
		}

	}

});
