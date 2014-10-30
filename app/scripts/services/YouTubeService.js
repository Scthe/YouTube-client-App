define([
	'jquery',
	'underscore',
	'backbone',
	'models/video',
	'models/videoList',
	'views/videoView'
], function($, _, Backbone, Video, videoList, VideoView) {

	'use strict';
	/*global youTubeApiLoaded, youTubeApiCalls, executeGoogleApiCalls*/
	/*jshint camelcase: false */

	var seachLoading = $('#search-loading'),
		searchInputIcon = $('#search-input-icon');


	return {
		search: search,
		videoDetails: videoDetails
	};

	function scheduleGoogleApiCall(f) {
		youTubeApiCalls.push(f);
	}

	/*
	 * https://developers.google.com/youtube/v3/docs/videos
	 */
	function videoDetails(id) {
		var idList = id;

		scheduleGoogleApiCall(function(yt) {
			var request = yt.videos.list({
				id: idList,
				part: 'snippet,statistics,player,contentDetails',
				maxResults: 1
			});

			request.execute(function(response) {
				var json = response.result;
				if (json.items.length === 1) {
					var e = json.items[0];
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
			});
		});
		if (youTubeApiLoaded) {
			executeGoogleApiCalls();
		}
	}


	/*
	 * https://developers.google.com/youtube/v3/docs/search
	 * https://developers.google.com/youtube/v3/docs/search/list
	 */
	function search(searchTerm, page) {
		// TODO add pages
		seachLoading.show();
		videoList.reset();

		scheduleGoogleApiCall(function(yt) {
			var request = yt.search.list({
				q: searchTerm,
				part: 'snippet',
				type: 'video',
				maxResults: 3
			});

			request.execute(function(response) {
				var json = response.result;
				$.each(json.items, function(i, e) {
					videoList.create({
						name: e.snippet.title,
						user: e.snippet.channelTitle,
						time: '2:41', // TODO hardcoded
						view_count: '502', // TODO hardcoded
						thumbnail: e.snippet.thumbnails['default'].url,
						created_on: e.snippet.publishedAt,
						youTube_id: e.id.videoId // TODO when the search result is a channel this will be undefined
					});
				});
				videoList.localStorage.save();
				searchInputIcon.show();
				seachLoading.hide();
			});
		});
		if (youTubeApiLoaded) {
			executeGoogleApiCalls();
		}
	}

});