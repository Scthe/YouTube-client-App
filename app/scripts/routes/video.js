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

		router.on('route:video', function(youTubeId) {
			console.log('routed to video \'{0}\''.fmt(youTubeId));
			// TODO reuse data from video list f.e. title, cannel etc.
			// No need to wait for it to download again

			app.setViewTitle(''); // TODO title and favicon
			var videoView = new VideoView(youTubeId);

		});
	}

});
