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
		localStorage: new Store('backbone-channels')
	});
	// app.channelList = new app.ChannelList();
	// return ChannelList;
	return new ChannelList();
});