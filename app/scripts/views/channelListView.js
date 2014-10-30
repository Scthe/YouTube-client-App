define([
	'jquery',
	'underscore',
	'backbone',
	'../models/channelList',
	'views/channelListItemView'
], function($, _, Backbone, channelList, ChannelView) {

	'use strict';

	var ChannelListView = Backbone.View.extend({
		el: '#channels-panel',

		initialize: function() {
			channelList.on('add', this.onAdd, this);
			channelList.fetch();
			//this.render();
		},

		render: function() {
			this.$el.html('');
			var that = this;
			channelList.each(function(e) {
				that.onAdd(e);
			});
		},

		onAdd: function(channel) {
			// TODO sort A-Z ?
			// TODO ensure only 1 is active at a time ?
			var view = new ChannelView({
				model: channel,
				parent: this
			});
			this.$el.append(view.render().el);
		}
	});
	// app.channelListView = new app.ChannelListView();
	// return new ChannelListView();
	return ChannelListView;

});