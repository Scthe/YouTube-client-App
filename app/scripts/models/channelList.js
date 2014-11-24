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

		deselectAll: function() {
			this.each(function(e) {
				e.set('active', false);
			});
		}
	});

	return ChannelList;
});
