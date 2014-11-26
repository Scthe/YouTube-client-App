define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/channel'
], function($, _, Backbone, Store, Channel) {

	'use strict';

	// TODO sort A-Z ?
	// TODO ensure only 1 is active at a time ?

	var ChannelList = Backbone.Collection.extend({
		model: Channel,

		localStorage: new Store('backbone-channels'),

		initialize: function() {
			var self = this;
			_.bindAll(this, 'deselectAll');

			// create stub data TODO remove stub data
			var xs = _.range(7)
				.map(function(i) {
					var ii = Math.floor(Math.random() * (10 - 1)) + 1;
					return {
						name: 'Channel ' + ii,
						videoCount: i
					};
				});
			for (var i = 0; i < xs.length; i++) {
				self.create(xs[i]);
			}
		},

		deselectAll: function() {
			this.each(function(e) {
				e.set('active', false);
			});
		}
	});

	return ChannelList;
});
