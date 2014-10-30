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
		router.on('route:video', function(id) {
			console.log('routed to video \'' + id + '\'');

			// find the selected model
			// ( due to 'app.videoList.reset()' resetting the _byId look up we have to do it by hand)
			var video = _.find(videoList.models, function(e) {
				return e && e.hasOwnProperty('id') && e.id === id;
			});

			if (video) {
				app.setViewTitle(video.get('name'));

				// call for more details
				ytService.videoDetails(video.get('youTube_id'), {
					success: onVideoGetSuccess,
					failure: onVideoGetFail
				});
			} else {
				onVideoGetFail(id);
			}

		});
	}

	function onVideoGetSuccess(e) {
		/*jshint camelcase: false */

		var video = new Video({
			youTube_id: e.id,
			youTube_channel_id: e.snippet.channelId,
			youTube_embed_Html: e.player.embedHtml,
			thumbnail: e.snippet.thumbnails['default'].url,

			name: e.snippet.title,
			user: e.snippet.channelTitle,
			created_on: e.snippet.publishedAt,

			view_count: e.statistics.viewCount,
			time: e.contentDetails.duration,
			description: e.snippet.description
		});
		var videoView = new VideoView(); // TODO leak ?
		videoView.setVideo(video);
		videoView.render();
	}

	function onVideoGetFail(id) {
		// TODO on video look up error
		console.log('Could not get video: \'' + id + '\'');
	}

});