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

			this.invokeSearch = function(term, pageToken, callback) {
				if (arguments.length === 2) {
					// term and callback only
					term = arguments[0];
					callback = arguments[1];
					pageToken = undefined;
				} else if (arguments.length === 1) {
					// callback only
					term = self.term;
					callback = arguments[0];
					pageToken = undefined;
				}
				if (!term) {
					term = self.term;
				}

				var sameTermAsBefore = self.term === term;
				if (!sameTermAsBefore || (sameTermAsBefore && pageToken)) {
					// 1st part of the condition: new search
					// 2nd part of the condition: prev / next page
					self.term = term;
					self.reset();
					ytService.search(self.term, pageToken, MAXRESULTS, function(term, result) {
						if (term !== self.term) { // TODO can use FRP and filter here
							return;
						}

						// do post search operations
						self.onSearchResults(term, result);

						// invoke callback
						if (callback) {
							callback(term,
								self.prevPageToken !== undefined,
								self.nextPageToken !== undefined);
						}
					});

				} else if (callback) {
					// keep old results & invoke callback
					_.defer(callback, self.term,
						self.prevPageToken !== undefined,
						self.nextPageToken !== undefined);
				}
			};
		},

		fetch_: function(term, callback) {
			this.invokeSearch(term, callback);
		},

		fetchNextPage: function(callback) {
			this.invokeSearch(undefined, this.nextPageToken, function(_, p, n) {
				callback(p, n);
			});
		},

		fetchPrevPage: function(callback) {
			this.invokeSearch(undefined, this.prevPageToken, function(_, p, n) {
				callback(p, n);
			});
		},

		onSearchResults: function(term, result) {
			var self = this;
			var items = result.items;
			// console.log(items);
			console.log('Search returned with ' + items.length + ' elements');

			// store tokens
			this.prevPageToken = result.prevPageToken;
			this.nextPageToken = result.nextPageToken;

			// create items TODO use set
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
		}

	});

	return VideoList;
});
