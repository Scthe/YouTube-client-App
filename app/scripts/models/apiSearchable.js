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
			this._invokeSearch(undefined, this.nextPageToken, callback);
		},

		fetchPrevPage: function(callback) {
			this._invokeSearch(undefined, this.prevPageToken, callback);
		},

		onSearchResults: function(callback, term, result) {
			if (term !== this.term) { // TODO can use FRP and filter here
				return;
			}

			var self = this;
			var items = result.items;
			// console.log(items);
			// console.log(ytService[this.apiSearchFunction]);
			console.log('Search returned with {0} elements'.fmt(items.length));

			// store tokens
			this.prevPageToken = result.prevPageToken;
			this.nextPageToken = result.nextPageToken;

			// create list items from results
			var ModelClass = this.model;
			_(items).each(function(e) {
				var m = new ModelClass(undefined, {
					apiData: e
				});
				self.localStorage.saveItem(m);
				self.add(m); // hack to not call .store on whole collection
			});

			// trigger event
			this.trigger('search end', term,
				self.prevPageToken !== undefined,
				self.nextPageToken !== undefined);

			// invoke callback
			if (callback) {
				callback(term,
					self.prevPageToken !== undefined,
					self.nextPageToken !== undefined);
			}
		},

		_invokeSearch: function(term, pageToken, callback) {
			var self = this;
			if (arguments.length === 2) { // term and callback only
				callback = arguments[1];
				pageToken = undefined;
			}
			if (!term) {
				term = this.term;
			}

			var sameTermAsBefore = this.term === term;
			if (this.forceAllApiCalls || !sameTermAsBefore || (sameTermAsBefore && pageToken)) {
				// 1st part of the condition: new search
				// 2nd part of the condition: prev / next page
				var apiFunction = ytService[this.apiSearchFunction],
					callback_ = this.onSearchResults.bind(this, callback);
				this.term = term;

				// clear current list
				this.reset();

				// call api
				apiFunction(this.term, pageToken, this.MAXRESULTS, callback_);

			} else if (callback) {
				// keep old results & invoke callback
				_.defer(callback, self.term,
					self.prevPageToken !== undefined,
					self.nextPageToken !== undefined);
			}
		}
	};

});
