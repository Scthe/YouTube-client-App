define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/channel',
	'models/apiSearchable'
], function($, _, Backbone, Store, Channel, ApiSearchable) {

	'use strict';

	var ChannelList = Backbone.Collection.extend({

		model: Channel,

		localStorage: new Store('backbone-channels'),

		apiSearchFunction: 'searchChannel',

		MAXRESULTS: 12,

		initialize: function() {
			_.bindAll(this, 'apiConverter', 'deselectAll', 'initialize_');
			this.initialize_();
		},

		deselectAll: function() {
			this.each(function(e) {
				e.set('active', false);
			});
		},

		apiConverter: function(e) {
			return {
				youTubeId: e.id.channelId,
				name: e.snippet.title,
				avatar: e.snippet.thumbnails['default'].url
			};
		}

	});

	ChannelList.prototype = _.extend(ChannelList.prototype, ApiSearchable);

	return ChannelList;
});
