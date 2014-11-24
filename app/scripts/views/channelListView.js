define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListItemView'
], function($, _, Backbone, ChannelView) {

	'use strict';

	var ChannelListView = Backbone.View.extend({
		el: '#channels-panel',

		initialize: function() {
			this.collection.on('add', this.onAdd, this);
			this.collection.fetch();
			//this.render();
		},

		render: function() {
			this.$el.html('');
			var that = this;
			this.collection.each(function(e) {
				that.onAdd(e);
			});
		},

		onAdd: function(channel) {
			var view = new ChannelView({
				model: channel,
				parent: this
			});
			this.$el.append(view.render().el);
		}
	});

	return ChannelListView;
});
