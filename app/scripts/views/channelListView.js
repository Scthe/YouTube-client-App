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
			this.render();
		},

		render: function() {
			var self = this;
			this.$el.html('');
			this.collection.each(function(e) {
				self.onAdd(e);
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
