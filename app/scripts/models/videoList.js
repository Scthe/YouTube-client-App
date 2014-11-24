define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/video',
	'services/YouTubeService'
], function($, _, Backbone, Store, Video, ytService) {

	'use strict';

	var MAXRESULTS = 12;

	var VideoList = Backbone.Collection.extend({

		model: Video,

		localStorage: new Store('backbone-videos'),

		initialize: function() {
			var self = this;
			_.bindAll(this, 'fetch_', 'onSearchResults', 'fetchNextPage', 'fetchPrevPage');
			this.term = '';

			this.changePage = function(token, callback) {
				if (token) {
					self.fetchCallback = callback;
					self.reset();
					ytService.search(self.term, token, MAXRESULTS, self.onSearchResults);
				} else {
					self.fetch_();
				}
			};
		},

		fetch_: function(term, callback) {
			term |= this.term;

			if (this.term !== term) {
				this.fetchCallback = callback;

				this.reset();
				this.term = term;

				ytService.search(term, undefined, MAXRESULTS, this.onSearchResults);
			} else if (callback) {
				callback(this.term,
					this.prevPageToken !== undefined,
					this.nextPageToken !== undefined);
			}
		},

		fetchNextPage: function(callback) {
			this.changePage(this.nextPageToken, callback);
		},

		fetchPrevPage: function(callback) {
			this.changePage(this.prevPageToken, callback);
		},

		onSearchResults: function(term, result) {
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

			if (this.fetchCallback) {
				// TODO use FRP for this
				this.fetchCallback(
					term,
					this.prevPageToken !== undefined,
					this.nextPageToken !== undefined);
				this.fetchCallback = undefined;
			}
		}

	});

	return VideoList;
});
