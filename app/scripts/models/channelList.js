define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/channel',
	'services/YouTubeService'
], function($, _, Backbone, Store, Channel, ytService) {

	'use strict';

	var MAXRESULTS = 12;
	// TODO duplicate of videoList

	var ChannelList = Backbone.Collection.extend({
		model: Channel,

		localStorage: new Store('backbone-channels'),

		initialize: function() {
			_.bindAll(this, 'fetch_', 'onSearchResults', 'fetchNextPage', 'fetchPrevPage', '_invokeSearch', 'deselectAll');
		},

		deselectAll: function() {
			this.each(function(e) {
				e.set('active', false);
			});
		},

		fetch_: function(term, callback) {
			this._invokeSearch(term, callback);
		},

		fetchNextPage: function(callback) {
			this._invokeSearch(undefined, this.nextPageToken, function(_, p, n) {
				callback(p, n);
			});
		},

		fetchPrevPage: function(callback) {
			this._invokeSearch(undefined, this.prevPageToken, function(_, p, n) {
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
			$.each(items, function(i, e) { // TODO move from here to the model
				console.log(e)
				self.create({
					youTubeId: e.id.channelId,
					name: e.snippet.title,
					avatar: e.snippet.thumbnails['default'].url
				});
			});
			//self.localStorage.save();
		},

		_invokeSearch: function(term, pageToken, callback) {
			console.log('channel invoke search')
			var self = this;
			if (arguments.length === 2) {
				// term and callback only
				term = arguments[0];
				callback = arguments[1];
				pageToken = undefined;
			} else if (arguments.length === 1) {
				// callback only
				term = this.term;
				callback = arguments[0];
				pageToken = undefined;
			}
			if (!term) {
				term = this.term;
			}

			var sameTermAsBefore = this.term === term;
			if (!sameTermAsBefore || (sameTermAsBefore && pageToken)) {
				// 1st part of the condition: new search
				// 2nd part of the condition: prev / next page
				this.term = term;
				this.reset();
				ytService.searchChannel(this.term, pageToken, MAXRESULTS, function(term, result) {
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
		}

	});

	return ChannelList;
});
