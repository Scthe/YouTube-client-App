define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/video',
	'services/YouTubeService'
], function($, _, Backbone, Store, Video, ytService) {

	'use strict';

	var MAXRESULTS = 12,
		seachLoading = $('#search-loading'),
		searchInputIcon = $('#search-input-icon');

	var VideoList = Backbone.Collection.extend({

		model: Video,

		localStorage: new Store('backbone-videos'),

		initialize: function() {
			_.bindAll(this, 'fetch_', 'onSearchResults', 'fetchNextPage', 'fetchPrevPage');

		},

		fetch_: function(term, callback) {
			this.fetchCallback = callback;
			seachLoading.show();

			this.reset();
			this.term = term;

			ytService.search(term, undefined, MAXRESULTS, this.onSearchResults);
		},

		fetchNextPage: function(callback) {
			if (this.nextPageToken) {
				this.fetchCallback = callback;
				this.reset();
				ytService.search(this.term, this.nextPageToken, MAXRESULTS, this.onSearchResults);
			} else {
				this.fetch_();
			}
		},

		fetchPrevPage: function(callback) {
			if (this.prevPageToken) {
				this.fetchCallback = callback;
				this.reset();
				ytService.search(this.term, this.prevPageToken, MAXRESULTS, this.onSearchResults);
			} else {
				this.fetch_();
			}
		},

		onSearchResults: function(result) {
			/*jshint camelcase: false */
			var self = this;
			var items = result.items;
			// console.log(items);
			console.log('Search returned with ' + items.length + ' elements');

			// store tokens
			this.prevPageToken = result.prevPageToken;
			this.nextPageToken = result.nextPageToken;

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
				this.fetchCallback(this.nextPageToken !== undefined);
				this.fetchCallback = undefined;
			}
		}

	});

	return VideoList;
});
