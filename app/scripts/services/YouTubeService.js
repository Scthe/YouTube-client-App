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

		if (youTubeApiLoaded) {
			executeGoogleApiCalls();
		}
	}

	/*
	 * https://developers.google.com/youtube/v3/docs/videos
	 */
	function videoDetails(id, callback) {
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
					callback.success(json.items[0]);
				} else {
					callback.failure(id);
				}
			});
		});
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
	}

});