define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListItemView',
	'text!templates/channelListView.tmpl.html'
], function($, _, Backbone, ChannelView, tmpl) {

	'use strict';

	// TODO add remove channel button

	var ChannelListView = Backbone.View.extend({
		el: '#channels-panel',

		template: _.template(tmpl),

		initialize: function() {
			_.bindAll(this, 'render', 'renderChannel');

			this.collection.on('add', this.renderChannel, this);
			this.render();
		},

		render: function() {
			var self = this;

			this.$el.html(this.template());
			this.listEl = this.$el.find('#channel-list');

			this.collection.each(self.renderChannel);
		},

		renderChannel: function(channel) {
			var view = new ChannelView({
				model: channel,
				parent: this
			});
			this.listEl.append(view.render().el);
		}
	});

	return ChannelListView;
});
