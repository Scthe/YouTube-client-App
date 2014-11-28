define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/video',
	'models/apiSearchable'
], function($, _, Backbone, Store, Video, ApiSearchable) {

	'use strict';

	var VideoList = Backbone.Collection.extend({

		model: Video,

		localStorage: new Store('backbone-videos'),

		apiSearchFunction: 'search',

		MAXRESULTS: 12,

		initialize: function() {
			_.bindAll(this, 'apiConverter', 'initialize_');
			this.initialize_();
		},

		apiConverter: function(e) {
			return {
				id: e.id.videoId,
				title: e.snippet.title,
				channelId: e.snippet.channelId,
				channelTitle: e.snippet.channelTitle,
				description: e.snippet.description,
				publishedAt: e.snippet.publishedAt,
				thumbnail: e.snippet.thumbnails['default'].url
			};
		}

	});

	VideoList.prototype = _.extend(VideoList.prototype, ApiSearchable);

	return VideoList;
});
