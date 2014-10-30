define([
	'jquery',
	'underscore',
	'backbone',
	'models/video',
	'models/videoList',
	'views/videoView'
], function($, _, Backbone, Video, videoList, videoView) {

	'use strict';
	/*global API_KEY, gapi*/
	/*jshint camelcase: false */

	var __scheduledCalls = [];

	var GOOGLE_YOU_TUBE_API_LOADED = false;

	return {
		search: search,
		videoDetails: videoDetails
	};

	function scheduleGoogleApiCall(f) {
		__scheduledCalls.push(f);
	}

	function executeGoogleApiCalls() {
		gapi.client.setApiKey(API_KEY);
		gapi.client.load('youtube', 'v3', function() {
			$.each(__scheduledCalls, function(i, e) {
				e(gapi.client.youtube);
			});
			__scheduledCalls = [];
			GOOGLE_YOU_TUBE_API_LOADED = true;
		});
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
					videoView.setVideo(new Video({
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
					}));
					videoView.render();
				}
			});
		});
		if (GOOGLE_YOU_TUBE_API_LOADED) {
			executeGoogleApiCalls();
		}
	}


	/*
	 * https://developers.google.com/youtube/v3/docs/search
	 * https://developers.google.com/youtube/v3/docs/search/list
	 */
	function search(searchTerm, page) {
		// TODO add pages
		$('#search-loading').show();
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
				$('#search-input-icon').show();
				$('#search-loading').hide();
			});
		});
		if (GOOGLE_YOU_TUBE_API_LOADED) {
			executeGoogleApiCalls();
		}
	}

});