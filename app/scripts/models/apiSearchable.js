define([
	'jquery',
	'underscore',
	'backbone',
	'services/YouTubeService'
], function($, _, Backbone, ytService) {

	'use strict';

	return {
		initialize_: function() {
			_.bindAll(this, 'fetch_', 'onSearchResults', 'fetchNextPage', 'fetchPrevPage', '_invokeSearch');
			this.term = '';
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
			// console.log(ytService[this.apiSearchFunction]);
			console.log('Search returned with {0} elements'.fmt(items.length));

			// store tokens
			this.prevPageToken = result.prevPageToken;
			this.nextPageToken = result.nextPageToken;

			var ModelClass = this.model;
			_(items).each(function(e) {
				var m = new ModelClass(undefined, {
					apiData: e
				});
				self.localStorage.saveItem(m);
				self.add(m); // hack to not call .store on whole collection
			});

		},

		_invokeSearch: function(term, pageToken, callback) {
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
			if (this.forceAllApiCalls || !sameTermAsBefore || (sameTermAsBefore && pageToken)) {
				// 1st part of the condition: new search
				// 2nd part of the condition: prev / next page
				this.term = term;
				this.reset();

				ytService[this.apiSearchFunction](this.term, pageToken, this.MAXRESULTS, function(term, result) {
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
	};

});
