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
			var self = this;
			var items = result.items;
			// console.log(items);
			console.log('Search returned with ' + items.length + ' elements');

			// store tokens
			this.prevPageToken = result.prevPageToken;
			this.nextPageToken = result.nextPageToken;

			$.each(items, function(i, e) {
				self.create({
					youTubeId: e.id.videoId, // TODO when the search result is a channel this will be undefined
					title: e.snippet.title,
					channelId: e.snippet.channelId,
					channelTitle: e.snippet.channelTitle,
					description: e.snippet.description,
					publishedAt: e.snippet.publishedAt,
					thumbnail: e.snippet.thumbnails['default'].url
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
