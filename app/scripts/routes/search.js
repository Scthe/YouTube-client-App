define([
	'jquery',
	'underscore',
	'views/channelListView',
	'models/channelList',
	'models/videoList',
	'services/YouTubeService'
], function($, _, ChannelListView, channelList, videoList, ytService) {

	'use strict';
	/*global app*/

	var seachLoading = $('#search-loading'),
		searchInputIcon = $('#search-input-icon');

	return {
		initialize: initialize
	};


	function initialize(router, channelListView) {
		router.on('route:search', function(term, page) {
			console.log('routed to search for: \'' + term + '\', page: ' + page);

			// set active channels
			channelList.each(function(e) {
				e.set('active', false);
			});

			// render left subscription panel
			channelListView.render();
			app.setViewTitle('Search');

			seachLoading.show();
			videoList.reset();

			// download data
			ytService.search(term, page, onSearchResults);
		});
	}

	function onSearchResults(items) {
		/*jshint camelcase: false */

		$.each(items, function(i, e) {
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
	}

});