define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/channel'
], function($, _, Backbone, Store, Channel) {

	'use strict';

	var ChannelList = Backbone.Collection.extend({
		model: Channel,

		localStorage: new Store('backbone-channels'),

		deselectAll: function() {
			this.each(function(e) {
				e.set('active', false);
			});
		}
	});

	return new ChannelList(); // TODO instantiate in app.js
});
