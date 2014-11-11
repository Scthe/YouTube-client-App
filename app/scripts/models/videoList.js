define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/video',
	'services/YouTubeService'
], function($, _, Backbone, Store, Video, ytService) {

	'use strict';

	var seachLoading = $('#search-loading'),
		searchInputIcon = $('#search-input-icon');

	var VideoList = Backbone.Collection.extend({

		model: Video,

		localStorage: new Store('backbone-videos'),

		initialize: function() {
			_.bindAll(this, 'fetch_', 'onSearchResults');

		},

		fetch_: function(term, page, callback) {
			this.fetchCallback = callback;
			seachLoading.show();

			ytService.search(term, page, this.onSearchResults);
		},

		onSearchResults: function(items) {
			/*jshint camelcase: false */
			console.log('Search returned with ' + items.length + ' elements');
			var self = this;

			$.each(items, function(i, e) {
				self.create({
					name: e.snippet.title,
					user: e.snippet.channelTitle,
					time: '2:41', // TODO hardcoded
					view_count: '502', // TODO hardcoded
					thumbnail: e.snippet.thumbnails['default'].url,
					created_on: e.snippet.publishedAt,
					youTube_id: e.id.videoId // TODO when the search result is a channel this will be undefined
				});
			});
			//self.localStorage.save();

			searchInputIcon.show();
			seachLoading.hide();

			if (this.fetchCallback) {
				this.fetchCallback();
			}
		}

	});

	return VideoList;
});
